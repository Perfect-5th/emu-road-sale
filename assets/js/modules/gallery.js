/**
 * Gallery Module
 * Handles gallery ticker, modal, and Swiper integration
 */

import { CONFIG } from '../config.js';

export class GalleryManager {
  constructor() {
    this.modal = null;
    this.closeBtn = null;
    this.swiperRoot = null;
    this.wrapper = null;
    this.gallerySwiper = null;
    this.track = null;
  }

  /**
   * Initialize the gallery functionality
   */
  init() {
    try {
      this.setupGalleryTicker();
      this.setupGalleryModal();
      return true;
    } catch (error) {
      console.error("Failed to initialize Gallery:", error);
      return false;
    }
  }

  /**
   * Set up the gallery ticker (horizontal scrolling thumbnails)
   */
  setupGalleryTicker() {
    try {
      this.track = document.getElementById("galleryTrack");
      if (!this.track) {
        console.warn("Gallery track element not found");
        return;
      }

      this.buildTickerThumbnails();
    } catch (error) {
      console.error("Failed to setup gallery ticker:", error);
    }
  }

  /**
   * Build the ticker thumbnails
   */
  buildTickerThumbnails() {
    try {
      // Clear existing content
      this.track.innerHTML = '';

      // Create thumbnails for each image
      CONFIG.gallery.images.forEach((item, i) => {
        const thumb = this.createThumbnail(i, item);
        this.track.appendChild(thumb);
      });

      // Duplicate for seamless scrolling
      CONFIG.gallery.images.forEach((item, i) => {
        const thumb = this.createThumbnail(i, item);
        this.track.appendChild(thumb);
      });
    } catch (error) {
      console.error("Failed to build ticker thumbnails:", error);
    }
  }

  /**
   * Create a single thumbnail element
   */
  createThumbnail(index, item) {
    try {
      const btn = document.createElement("button");
      btn.className = "gallery-thumb js-gallery-thumb";
      btn.type = "button";
      btn.setAttribute("data-index", index);

      const img = document.createElement("img");
      img.src = CONFIG.gallery.basePath + item.filename;
      img.alt = item.description || "Gallery image";
      img.loading = "lazy";
      img.decoding = "async";

      btn.appendChild(img);
      return btn;
    } catch (error) {
      console.error("Failed to create thumbnail:", error);
      return document.createElement("div"); // Fallback
    }
  }

  /**
   * Set up the gallery modal
   */
  setupGalleryModal() {
    try {
      this.modal = document.getElementById(CONFIG.galleryModal.modalId);
      this.closeBtn = document.getElementById(CONFIG.galleryModal.closeBtnId);
      this.swiperRoot = document.getElementById(CONFIG.galleryModal.swiperId);
      
      if (!this.modal || !this.closeBtn || !this.swiperRoot) {
        console.warn("Gallery modal elements not found");
        return;
      }

      this.wrapper = this.swiperRoot.querySelector(".swiper-wrapper");
      if (!this.wrapper) {
        console.warn("Gallery swiper wrapper not found");
        return;
      }

      this.populateModalSlides();
      this.setupModalEventListeners();
    } catch (error) {
      console.error("Failed to setup gallery modal:", error);
    }
  }

  /**
   * Populate the modal with slides
   */
  populateModalSlides() {
    try {
      // Clear existing slides
      this.wrapper.innerHTML = '';

      // Create slides for each image
      CONFIG.gallery.images.forEach((item) => {
        const slide = this.createSlide(item);
        this.wrapper.appendChild(slide);
      });
    } catch (error) {
      console.error("Failed to populate modal slides:", error);
    }
  }

  /**
   * Create a single slide element
   */
  createSlide(item) {
    try {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      
      const img = document.createElement("img");
      img.src = CONFIG.gallery.basePath + item.filename;
      img.alt = item.description || "Photo";
      img.loading = "lazy";
      img.decoding = "async";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.background = "#000";
      
      slide.appendChild(img);
      return slide;
    } catch (error) {
      console.error("Failed to create slide:", error);
      return document.createElement("div"); // Fallback
    }
  }

  /**
   * Set up modal event listeners
   */
  setupModalEventListeners() {
    try {
      // Close button
      this.closeBtn.addEventListener("click", () => this.closeModal());

      // Modal backdrop click
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.closeModal();
      });

      // Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.modal.classList.contains("open")) {
          this.closeModal();
        }
      });

      // Thumbnail clicks
      document.addEventListener("click", (e) => {
        const btn = e.target.closest("." + CONFIG.galleryModal.thumbClass);
        if (btn) {
          e.preventDefault();
          const idx = parseInt(btn.getAttribute("data-index") || "0", 10);
          this.openModal(isNaN(idx) ? 0 : idx);
        }
      });
    } catch (error) {
      console.error("Failed to setup modal event listeners:", error);
    }
  }

  /**
   * Initialize Swiper for the gallery
   */
  initSwiper() {
    try {
      if (this.gallerySwiper) {
        return; // Already initialized
      }

      // Ensure navigation and pagination elements exist
      this.ensureSwiperElements();

      // Initialize Swiper
      this.gallerySwiper = new Swiper("#" + CONFIG.galleryModal.swiperId, {
        loop: true,
        centeredSlides: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: { 
          el: ".swiper-pagination", 
          clickable: true 
        },
        slidesPerView: 1,
        spaceBetween: 10,
        keyboard: { enabled: true },
      });
    } catch (error) {
      console.error("Failed to initialize Swiper:", error);
    }
  }

  /**
   * Ensure Swiper navigation and pagination elements exist
   */
  ensureSwiperElements() {
    try {
      this.ensureElement(".swiper-button-prev", () => {
        const el = document.createElement("div");
        el.className = "swiper-button-prev";
        return el;
      });

      this.ensureElement(".swiper-button-next", () => {
        const el = document.createElement("div");
        el.className = "swiper-button-next";
        return el;
      });

      this.ensureElement(".swiper-pagination", () => {
        const el = document.createElement("div");
        el.className = "swiper-pagination";
        return el;
      });
    } catch (error) {
      console.error("Failed to ensure Swiper elements:", error);
    }
  }

  /**
   * Ensure an element exists, create if it doesn't
   */
  ensureElement(selector, createFn) {
    try {
      let el = this.swiperRoot.querySelector(selector);
      if (!el) {
        el = createFn();
        this.swiperRoot.appendChild(el);
      }
      return el;
    } catch (error) {
      console.error("Failed to ensure element:", selector, error);
      return null;
    }
  }

  /**
   * Open the gallery modal at a specific index
   */
  openModal(startIndex = 0) {
    try {
      if (!this.gallerySwiper) {
        this.initSwiper();
      }

      if (typeof startIndex === "number") {
        // Ensure we go to the matching slide index (loop-aware)
        this.gallerySwiper.slideToLoop(startIndex, 0);
      }

      this.modal.classList.add("open");
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Failed to open modal:", error);
    }
  }

  /**
   * Close the gallery modal
   */
  closeModal() {
    try {
      this.modal.classList.remove("open");
      document.body.style.overflow = "";
    } catch (error) {
      console.error("Failed to close modal:", error);
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    try {
      if (this.gallerySwiper) {
        this.gallerySwiper.destroy(true, true);
        this.gallerySwiper = null;
      }
    } catch (error) {
      console.error("Failed to destroy Gallery:", error);
    }
  }
}
