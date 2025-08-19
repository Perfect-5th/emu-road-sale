/**
 * Main JavaScript Entry Point
 * Orchestrates all modules and handles page initialization
 */

import { CONFIG } from './config.js';
import { OpenHomeManager } from './modules/openHome.js';
import { GalleryManager } from './modules/gallery.js';
import { VideoModalManager } from './modules/videoModal.js';
import { AnalyticsManager } from './modules/analytics.js';

/**
 * Main Application Class
 * Manages all modules and page functionality
 */
class EmuRoadApp {
  constructor() {
    this.modules = {
      openHome: null,
      gallery: null,
      videoModal: null,
      analytics: null,
    };
    this.initialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log("🚀 Initializing Emu Road Property Landing Page...");

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
      }

      // Initialize all modules
      await this.initializeModules();

      // Set up remaining functionality
      this.setupSmoothScrolling();
      this.setupPolaroidTilts();
      this.setupLifestyleFaders();
      this.setupStickyNavigation();
      this.setupBackToTop();
      this.setupImageOptimization();

      this.initialized = true;
      console.log("✅ Emu Road Property Landing Page initialized successfully!");

      // Dispatch custom event for other scripts
      window.dispatchEvent(new CustomEvent('emuRoadAppReady'));
    } catch (error) {
      console.error("❌ Failed to initialize Emu Road Property Landing Page:", error);
    }
  }

  /**
   * Initialize all modules
   */
  async initializeModules() {
    try {
      // Initialize Open Home functionality
      this.modules.openHome = new OpenHomeManager();
      if (this.modules.openHome.init()) {
        console.log("✅ Open Home module initialized");
      }

      // Initialize Gallery functionality
      this.modules.gallery = new GalleryManager();
      if (this.modules.gallery.init()) {
        console.log("✅ Gallery module initialized");
      }

      // Initialize Video Modal functionality
      this.modules.videoModal = new VideoModalManager();
      if (this.modules.videoModal.init()) {
        console.log("✅ Video Modal module initialized");
      }

      // Initialize Analytics functionality
      this.modules.analytics = new AnalyticsManager();
      if (this.modules.analytics.init()) {
        console.log("✅ Analytics module initialized");
      }
    } catch (error) {
      console.error("Failed to initialize modules:", error);
    }
  }

  /**
   * Set up smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    try {
      const SCROLL_MARGIN = CONFIG.scroll.margin;
      const DURATION_MS = CONFIG.scroll.duration;

      // Easing function for smooth animation
      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      document.addEventListener("click", (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href || href === "#" || href === "#!") return;

        const target = document.querySelector(href);
        if (!target) {
          console.warn(`Smooth scroll target not found: ${href}`);
          return; // allow default for non-existing targets
        }

        e.preventDefault();
        this.smoothScrollTo(target, SCROLL_MARGIN, DURATION_MS, href, easeInOutCubic);
      });
    } catch (error) {
      console.error("Failed to setup smooth scrolling:", error);
    }
  }

  /**
   * Smooth scroll to a target element
   */
  smoothScrollTo(target, margin, duration, hash, easingFunction) {
    try {
      const startY = window.pageYOffset;
      const rectTop = target.getBoundingClientRect().top;
      const destY = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          startY + rectTop - margin
        )
      );

      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = easingFunction(t);
        
        const currentY = startY + (destY - startY) * eased;
        window.scrollTo(0, currentY);
        
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          // Update URL hash without jumping
          history.replaceState(null, "", hash);
          
          // Optional: move focus for accessibility, without auto-scrolling
          if (typeof target.focus === "function") {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
        }
      };

      requestAnimationFrame(step);
    } catch (error) {
      console.error("Failed to smooth scroll:", error);
    }
  }

  /**
   * Set up random polaroid tilts for organic layout
   */
  setupPolaroidTilts() {
    try {
      function randTilt() {
        return (Math.random() * CONFIG.animation.polaroid.maxTilt * 2 - CONFIG.animation.polaroid.maxTilt).toFixed(2) + "deg";
      }

      document.querySelectorAll(".feature-figure.polaroid").forEach((el) => {
        if (!el.style.getPropertyValue("--tilt")) {
          el.style.setProperty("--tilt", randTilt());
        }
      });
    } catch (error) {
      console.error("Failed to setup polaroid tilts:", error);
    }
  }

  /**
   * Set up lifestyle feature faders
   */
  setupLifestyleFaders() {
    try {
      document.querySelectorAll(".feature-fader").forEach((holder) => {
        this.setupFeatureFader(holder);
      });
    } catch (error) {
      console.error("Failed to setup lifestyle faders:", error);
    }
  }

  /**
   * Set up a single feature fader
   */
  setupFeatureFader(holder) {
    try {
      const tokens = this.normaliseTokens(holder);
      if (tokens.length === 0) return;

      const shell = document.createElement("div");
      shell.className = "swiper";
      const track = document.createElement("div");
      track.className = "swiper-wrapper";
      shell.appendChild(track);

      tokens.forEach((tok) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        const img = document.createElement("img");
        img.setAttribute("data-rawsrc", this.toSrc(tok));
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
        img.alt = "Lifestyle photo";
        img.style.objectFit = "cover";
        img.style.objectPosition = "center center";
        img.onerror = () => slide.remove();
        slide.appendChild(img);
        track.appendChild(slide);
        
        // Optimize immediately via Netlify Image CDN
        if (window.NIMG) window.NIMG.optimise(img, { kind: "feature" });
      });

      const pag = document.createElement("div");
      pag.className = "swiper-pagination";
      shell.appendChild(pag);
      holder.appendChild(shell);

      requestAnimationFrame(() => {
        const slides = track.querySelectorAll(".swiper-slide");
        if (slides.length > 0 && window.Swiper) {
          new Swiper(shell, {
            slidesPerView: 1,
            loop: slides.length > 1,
            effect: "fade",
            fadeEffect: { crossFade: true },
            autoplay: slides.length > 1
              ? { delay: 7500, disableOnInteraction: false }
              : false,
            speed: 600,
            pagination: { el: pag, clickable: true },
            allowTouchMove: true,
          });
        } else {
          holder.classList.add("img-placeholder");
        }
      });
    } catch (error) {
      console.error("Failed to setup feature fader:", error);
    }
  }

  /**
   * Normalize image tokens for feature faders
   */
  normaliseTokens(holder) {
    try {
      const listAttr = holder.getAttribute("data-images");
      if (listAttr && listAttr.trim().length) {
        return listAttr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      
      const start = parseInt(holder.getAttribute("data-start") || "1", 10);
      const end = parseInt(holder.getAttribute("data-end") || String(start), 10);
      const arr = [];
      for (let i = start; i <= end; i++) arr.push(String(i));
      return arr;
    } catch (error) {
      console.error("Failed to normalize tokens:", error);
      return [];
    }
  }

  /**
   * Convert token to source path
   */
  toSrc(token) {
    try {
      const t = token.trim();
      if (/\.(jpe?g|png|webp)$/i.test(t)) {
        // Already a filename; prefix default folder if no slash
        return t.includes("/") ? t : `images/home-life/${t}`;
      }
      if (/^\d+$/.test(t)) {
        return `images/home-life/${t}.jpg`;
      }
      // Fallback: treat as filename under default folder
      return `images/home-life/${t}`;
    } catch (error) {
      console.error("Failed to convert token to source:", error);
      return "";
    }
  }

  /**
   * Set up sticky navigation
   */
  setupStickyNavigation() {
    try {
      const heroEl = document.querySelector("header");
      const sticky = document.getElementById("stickyCta");
      
      if (!heroEl || !sticky) return;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              sticky.classList.remove("show");
            } else {
              sticky.classList.add("show");
            }
          });
        },
        { threshold: CONFIG.ui.stickyNav.threshold }
      );
      
      io.observe(heroEl);
    } catch (error) {
      console.error("Failed to setup sticky navigation:", error);
    }
  }

  /**
   * Set up back to top functionality
   */
  setupBackToTop() {
    try {
      const btn = document.getElementById("backToTop");
      if (!btn) return;

      const update = () => {
        const threshold = window.innerHeight * CONFIG.ui.backToTop.threshold;
        if (window.scrollY > threshold) {
          btn.classList.remove("opacity-0", "pointer-events-none");
        } else {
          btn.classList.add("opacity-0", "pointer-events-none");
        }
      };

      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();

      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } catch (error) {
      console.error("Failed to setup back to top:", error);
    }
  }

  /**
   * Set up image optimization
   */
  setupImageOptimization() {
    try {
      // Final pass once everything is initialized
      window.addEventListener("load", () => {
        if (window.NIMG) window.NIMG.optimiseAll();
      });
    } catch (error) {
      console.error("Failed to setup image optimization:", error);
    }
  }

  /**
   * Get module instance
   */
  getModule(name) {
    return this.modules[name] || null;
  }

  /**
   * Check if app is initialized
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Clean up all resources
   */
  destroy() {
    try {
      // Destroy all modules
      Object.values(this.modules).forEach(module => {
        if (module && typeof module.destroy === 'function') {
          module.destroy();
        }
      });

      this.modules = {};
      this.initialized = false;
      
      console.log("🧹 Emu Road Property Landing Page cleaned up");
    } catch (error) {
      console.error("Failed to destroy app:", error);
    }
  }
}

// Initialize the application when the script loads
const app = new EmuRoadApp();

// Make app available globally for debugging
window.emuRoadApp = app;

// Add test function for smooth scroll debugging
window.testSmoothScroll = function(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    app.smoothScrollTo(target, 96, 900, targetId, (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  } else {
    console.error(`Target not found: ${targetId}`);
  }
};

// Auto-initialize
app.init().catch(error => {
  console.error("Failed to auto-initialize app:", error);
});

// Export for module usage
export default app;
