/**
 * Analytics Configuration
 * Centralized configuration for Google Analytics event tracking
 */

export const ANALYTICS_CONFIG = {
  // Enable/disable specific tracking features
  features: {
    ctaTracking: true,
    galleryTracking: true,
    videoTracking: true,
    navigationTracking: true,
    proximityLinkTracking: true,
    mapTracking: true,
    scrollDepthTracking: true,
    externalLinkTracking: true,
    phoneTracking: true,
    engagementTimeTracking: false, // Set to true if you want to track user engagement time
  },

  // Scroll depth tracking thresholds (percentages)
  scrollDepth: {
    thresholds: [25, 50, 75, 90, 100],
    trackOnce: true, // Only track each threshold once per session
  },

  // Event categories for organization
  categories: {
    engagement: 'engagement',
    navigation: 'navigation',
    media: 'media',
    contact: 'contact',
    location: 'location',
  },

  // Custom event labels
  labels: {
    cta: {
      viewListing: 'view_listing',
      watchVideo: 'watch_video',
      callAgent: 'call_agent',
      getDirections: 'get_directions',
      addToCalendar: 'add_to_calendar',
    },
    gallery: {
      thumbnailClick: 'gallery_thumbnail_click',
      modalOpen: 'gallery_modal_open',
      modalClose: 'gallery_modal_close',
    },
    video: {
      modalOpen: 'video_modal_open',
      modalClose: 'video_modal_close',
    },
    navigation: {
      stickyNav: 'sticky_nav_click',
      mainNav: 'main_nav_click',
    },
    scroll: {
      depth: 'scroll_depth',
    },
    links: {
      external: 'external_link',
      proximity: 'proximity_link',
      phone: 'phone_call',
    },
    map: {
      viewed: 'map_viewed',
    },
  },

  // Proximity link categories
  proximityCategories: {
    education: ['school', 'college', 'university'],
    shopping: ['shopping', 'coles', 'drakes', 'woolworths'],
    transport: ['train', 'station', 'airport', 'bus'],
    recreation: ['golf', 'park', 'playground'],
    entertainment: ['hotel', 'resort', 'restaurant', 'pub'],
    lifestyle: ['beach', 'coast', 'pool'],
    nature: ['mountain', 'hinterland', 'park', 'reserve'],
    city: ['brisbane', 'cbd', 'city'],
  },

  // Debug settings
  debug: {
    enabled: false, // Set to true to see analytics events in console
    logEvents: true, // Log events to console when debug is enabled
  },

  // User engagement tracking
  engagement: {
    inactivityTimeout: 30000, // 30 seconds
    trackSessionTime: true,
  },
};
