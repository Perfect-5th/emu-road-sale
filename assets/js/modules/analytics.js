/**
 * Analytics Module
 * Handles Google Analytics event tracking for user interactions
 */

import { ANALYTICS_CONFIG } from '../analytics-config.js';

export class AnalyticsManager {
  constructor() {
    this.isGA4Available = typeof gtag !== 'undefined';
    this.trackedEvents = new Set();
    this.scrollDepthTracked = false;
    this.scrollDepthThresholds = ANALYTICS_CONFIG.scrollDepth.thresholds;
    this.scrollDepthTrackedLevels = new Set();
    this.config = ANALYTICS_CONFIG;
  }

  /**
   * Initialize analytics tracking
   */
  init() {
    try {
      if (!this.isGA4Available) {
        console.warn("Google Analytics not available - analytics tracking disabled");
        return false;
      }

      this.setupEventTracking();
      
      if (this.config.features.scrollDepthTracking) {
        this.setupScrollDepthTracking();
      }
      
      if (this.config.features.externalLinkTracking) {
        this.setupExternalLinkTracking();
      }
      
      if (this.config.features.phoneTracking) {
        this.setupPhoneTracking();
      }
      
      if (this.config.features.engagementTimeTracking) {
        this.trackEngagementTime();
      }
      
      console.log("✅ Analytics tracking initialized");
      return true;
    } catch (error) {
      console.error("Failed to initialize analytics:", error);
      return false;
    }
  }

  /**
   * Set up event tracking for various user interactions
   */
  setupEventTracking() {
    try {
      if (this.config.features.ctaTracking) {
        this.trackCTAButtons();
      }
      
      if (this.config.features.galleryTracking) {
        this.trackGalleryInteractions();
      }
      
      if (this.config.features.videoTracking) {
        this.trackVideoInteractions();
      }
      
      if (this.config.features.navigationTracking) {
        this.trackNavigationClicks();
      }
      
      if (this.config.features.proximityLinkTracking) {
        this.trackProximityLinks();
      }
      
      if (this.config.features.mapTracking) {
        this.trackMapInteractions();
      }
      
    } catch (error) {
      console.error("Failed to setup event tracking:", error);
    }
  }

  /**
   * Track CTA button interactions
   */
  trackCTAButtons() {
    try {
      // View Listing buttons
      document.querySelectorAll('a[href*="realestate.com.au"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.trackEvent('cta_click', {
            event_category: 'engagement',
            event_label: 'view_listing',
            link_url: btn.href,
            link_text: btn.textContent.trim()
          });
        });
      });

      // Watch Video buttons
      document.querySelectorAll('.js-watch').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.trackEvent('cta_click', {
            event_category: 'engagement',
            event_label: 'watch_video',
            video_src: btn.getAttribute('data-video-src') || 'unknown'
          });
        });
      });

      // Call Melissa buttons
      document.querySelectorAll('a[href^="tel:"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.trackEvent('cta_click', {
            event_category: 'engagement',
            event_label: 'call_agent',
            phone_number: btn.href.replace('tel:', ''),
            link_text: btn.textContent.trim()
          });
        });
      });

      // Get Directions buttons
      document.querySelectorAll('a[href*="google.com/maps"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.trackEvent('cta_click', {
            event_category: 'engagement',
            event_label: 'get_directions',
            link_url: btn.href
          });
        });
      });

      // Add to Calendar buttons
      document.querySelectorAll('a[href*="calendar"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.trackEvent('cta_click', {
            event_category: 'engagement',
            event_label: 'add_to_calendar',
            calendar_type: btn.textContent.toLowerCase().includes('google') ? 'google' : 'ical'
          });
        });
      });

    } catch (error) {
      console.error("Failed to track CTA buttons:", error);
    }
  }

  /**
   * Track gallery interactions
   */
  trackGalleryInteractions() {
    try {
      // Gallery thumbnail clicks
      document.addEventListener('click', (e) => {
        const thumb = e.target.closest('.js-gallery-thumb');
        if (thumb) {
          const index = thumb.getAttribute('data-index');
          this.trackEvent('gallery_interaction', {
            event_category: 'engagement',
            event_label: 'gallery_thumbnail_click',
            image_index: index
          });
        }
      });

      // Gallery modal open/close
      const galleryModal = document.getElementById('galleryModal');
      if (galleryModal) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              if (galleryModal.classList.contains('open')) {
                this.trackEvent('gallery_interaction', {
                  event_category: 'engagement',
                  event_label: 'gallery_modal_open'
                });
              } else {
                this.trackEvent('gallery_interaction', {
                  event_category: 'engagement',
                  event_label: 'gallery_modal_close'
                });
              }
            }
          });
        });
        
        observer.observe(galleryModal, { attributes: true });
      }

    } catch (error) {
      console.error("Failed to track gallery interactions:", error);
    }
  }

  /**
   * Track video modal interactions
   */
  trackVideoInteractions() {
    try {
      const videoModal = document.getElementById('videoModal');
      if (videoModal) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              if (videoModal.classList.contains('open')) {
                this.trackEvent('video_interaction', {
                  event_category: 'engagement',
                  event_label: 'video_modal_open',
                  video_src: 'youtube_tour'
                });
              } else {
                this.trackEvent('video_interaction', {
                  event_category: 'engagement',
                  event_label: 'video_modal_close',
                  video_src: 'youtube_tour'
                });
              }
            }
          });
        });
        
        observer.observe(videoModal, { attributes: true });
      }

    } catch (error) {
      console.error("Failed to track video interactions:", error);
    }
  }

  /**
   * Track navigation clicks
   */
  trackNavigationClicks() {
    try {
      // Sticky navigation links
      document.querySelectorAll('.sticky-nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          const section = link.getAttribute('href').substring(1);
          this.trackEvent('navigation_click', {
            event_category: 'engagement',
            event_label: 'sticky_nav_click',
            section: section,
            link_text: link.textContent.trim()
          });
        });
      });

      // Main navigation links
      document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          const section = link.getAttribute('href').substring(1);
          this.trackEvent('navigation_click', {
            event_category: 'engagement',
            event_label: 'main_nav_click',
            section: section,
            link_text: link.textContent.trim()
          });
        });
      });

    } catch (error) {
      console.error("Failed to track navigation clicks:", error);
    }
  }

  /**
   * Track proximity/location link clicks
   */
  trackProximityLinks() {
    try {
      document.querySelectorAll('#proximity a[target="_blank"]').forEach(link => {
        link.addEventListener('click', (e) => {
          const linkText = link.textContent.trim();
          const linkUrl = link.href;
          
          this.trackEvent('proximity_link_click', {
            event_category: 'engagement',
            event_label: 'proximity_link',
            link_text: linkText,
            link_url: linkUrl,
            link_type: this.categorizeProximityLink(linkText, linkUrl)
          });
        });
      });

    } catch (error) {
      console.error("Failed to track proximity links:", error);
    }
  }

  /**
   * Categorize proximity links
   */
  categorizeProximityLink(text, url) {
    const lowerText = text.toLowerCase();
    const lowerUrl = url.toLowerCase();
    
    if (lowerText.includes('school') || lowerUrl.includes('school')) return 'education';
    if (lowerText.includes('shopping') || lowerText.includes('coles') || lowerText.includes('drakes')) return 'shopping';
    if (lowerText.includes('train') || lowerText.includes('station')) return 'transport';
    if (lowerText.includes('golf')) return 'recreation';
    if (lowerText.includes('hotel') || lowerText.includes('resort')) return 'entertainment';
    if (lowerText.includes('beach') || lowerText.includes('coast')) return 'lifestyle';
    if (lowerText.includes('mountain') || lowerText.includes('hinterland')) return 'nature';
    if (lowerText.includes('airport')) return 'transport';
    if (lowerText.includes('brisbane') || lowerText.includes('cbd')) return 'city';
    
    return 'other';
  }

  /**
   * Track map interactions
   */
  trackMapInteractions() {
    try {
      const mapIframe = document.querySelector('iframe[src*="google.com/maps"]');
      if (mapIframe) {
        // Track when map comes into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.trackEvent('map_interaction', {
                event_category: 'engagement',
                event_label: 'map_viewed'
              });
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        
        observer.observe(mapIframe);
      }

    } catch (error) {
      console.error("Failed to track map interactions:", error);
    }
  }

  /**
   * Set up scroll depth tracking
   */
  setupScrollDepthTracking() {
    try {
      let scrollDepthTracked = false;
      
      window.addEventListener('scroll', () => {
        if (scrollDepthTracked) return;
        
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        this.scrollDepthThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !this.scrollDepthTrackedLevels.has(threshold)) {
            this.trackEvent('scroll_depth', {
              event_category: 'engagement',
              event_label: `${threshold}%_scroll_depth`,
              scroll_percentage: threshold
            });
            this.scrollDepthTrackedLevels.add(threshold);
          }
        });
        
        // Track 100% scroll depth
        if (scrollPercent >= 100 && !this.scrollDepthTrackedLevels.has(100)) {
          this.trackEvent('scroll_depth', {
            event_category: 'engagement',
            event_label: '100%_scroll_depth',
            scroll_percentage: 100
          });
          this.scrollDepthTrackedLevels.add(100);
        }
      }, { passive: true });

    } catch (error) {
      console.error("Failed to setup scroll depth tracking:", error);
    }
  }

  /**
   * Set up external link tracking
   */
  setupExternalLinkTracking() {
    try {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="http"]');
        if (!link) return;
        
        const href = link.href;
        const isExternal = !href.includes(window.location.hostname);
        
        if (isExternal) {
          this.trackEvent('external_link_click', {
            event_category: 'engagement',
            event_label: 'external_link',
            link_url: href,
            link_text: link.textContent.trim(),
            link_domain: new URL(href).hostname
          });
        }
      });

    } catch (error) {
      console.error("Failed to setup external link tracking:", error);
    }
  }

  /**
   * Set up phone number tracking
   */
  setupPhoneTracking() {
    try {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="tel:"]');
        if (link) {
          this.trackEvent('phone_click', {
            event_category: 'engagement',
            event_label: 'phone_call',
            phone_number: link.href.replace('tel:', ''),
            link_text: link.textContent.trim()
          });
        }
      });

    } catch (error) {
      console.error("Failed to setup phone tracking:", error);
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(eventName, parameters = {}) {
    try {
      if (!this.isGA4Available) return;
      
      // Add timestamp and page info
      const eventData = {
        ...parameters,
        timestamp: Date.now(),
        page_url: window.location.href,
        page_title: document.title
      };
      
      // Send to GA4
      gtag('event', eventName, eventData);
      
      // Log for debugging if enabled
      if (this.config.debug.enabled && this.config.debug.logEvents) {
        console.log('📊 Analytics Event:', eventName, eventData);
      }
      
    } catch (error) {
      console.error("Failed to track event:", eventName, error);
    }
  }

  /**
   * Track page view (custom implementation if needed)
   */
  trackPageView(pageTitle = null, pageLocation = null) {
    try {
      if (!this.isGA4Available) return;
      
      gtag('event', 'page_view', {
        page_title: pageTitle || document.title,
        page_location: pageLocation || window.location.href
      });
      
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  }

  /**
   * Track user engagement time
   */
  trackEngagementTime() {
    try {
      let startTime = Date.now();
      let isActive = true;
      
      // Track when user becomes inactive
      const handleInactive = () => {
        if (isActive) {
          isActive = false;
          const engagementTime = Date.now() - startTime;
          
          this.trackEvent('user_engagement', {
            event_category: 'engagement',
            event_label: 'session_engagement_time',
            engagement_time_ms: engagementTime,
            engagement_time_seconds: Math.round(engagementTime / 1000)
          });
        }
      };
      
      // Track when user becomes active again
      const handleActive = () => {
        if (!isActive) {
          isActive = true;
          startTime = Date.now();
        }
      };
      
      // Set up activity tracking
      let inactivityTimer;
      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        handleActive();
        inactivityTimer = setTimeout(handleInactive, 30000); // 30 seconds
      };
      
      // Listen for user activity
      ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetInactivityTimer, { passive: true });
      });
      
      // Start the timer
      resetInactivityTimer();
      
    } catch (error) {
      console.error("Failed to track engagement time:", error);
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    try {
      // Clean up any timers or observers if needed
      this.trackedEvents.clear();
      this.scrollDepthTrackedLevels.clear();
      
      console.log("🧹 Analytics tracking cleaned up");
    } catch (error) {
      console.error("Failed to destroy analytics:", error);
    }
  }
}
