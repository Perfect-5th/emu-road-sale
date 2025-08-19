/**
 * Video Modal Module
 * Handles video modal functionality and YouTube integration
 */

import { CONFIG } from '../config.js';

export class VideoModalManager {
  constructor() {
    this.modal = null;
    this.closeBtn = null;
    this.frame = null;
    this.openers = null;
  }

  /**
   * Initialize the video modal functionality
   */
  init() {
    try {
      this.modal = document.getElementById(CONFIG.video.modalId);
      this.closeBtn = document.getElementById(CONFIG.video.closeBtnId);
      this.frame = document.getElementById(CONFIG.video.frameId);
      this.openers = document.querySelectorAll("." + CONFIG.video.triggerClass);

      if (!this.modal || !this.closeBtn || !this.frame) {
        console.warn("Video modal elements not found");
        return false;
      }

      this.setupEventListeners();
      return true;
    } catch (error) {
      console.error("Failed to initialize VideoModal:", error);
      return false;
    }
  }

  /**
   * Set up event listeners for the video modal
   */
  setupEventListeners() {
    try {
      // Open modal on trigger clicks
      this.openers.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const src = btn.getAttribute("data-video-src") || "";
          this.openModal(src);
        });
      });

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
    } catch (error) {
      console.error("Failed to setup video modal event listeners:", error);
    }
  }

  /**
   * Open the video modal with a specific source
   */
  openModal(src) {
    try {
      if (!src) {
        console.warn("No video source provided");
        return;
      }

      const autoplayUrl = this.buildYouTubeAutoplayUrl(src);
      this.frame.src = autoplayUrl;
      this.modal.classList.add("open");
      document.documentElement.style.overflow = "hidden";
    } catch (error) {
      console.error("Failed to open video modal:", error);
    }
  }

  /**
   * Close the video modal
   */
  closeModal() {
    try {
      this.modal.classList.remove("open");
      this.frame.src = "";
      document.documentElement.style.overflow = "";
    } catch (error) {
      console.error("Failed to close video modal:", error);
    }
  }

  /**
   * Build YouTube autoplay URL with proper parameters
   */
  buildYouTubeAutoplayUrl(src) {
    try {
      // Expecting an embed URL like https://www.youtube.com/embed/VIDEOID
      const url = new URL(src, location.href);
      const isEmbed = /\/embed\//.test(url.pathname);
      let id = "";

      if (isEmbed) {
        id = url.pathname.split("/").pop();
      } else if (url.searchParams.get("v")) {
        id = url.searchParams.get("v");
      }

      if (!id) {
        console.warn("Could not extract YouTube video ID from:", src);
        return src;
      }

      const base = `https://www.youtube.com/embed/${id}`;
      
      // Autoplay with sound (mute=0), no loop, enablejsapi for future control
      return `${base}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    } catch (error) {
      console.error("Failed to build YouTube autoplay URL:", error);
      return src; // Fallback to original source
    }
  }

  /**
   * Check if a URL is a valid YouTube video
   */
  isYouTubeUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be');
    } catch {
      return false;
    }
  }

  /**
   * Get video ID from various YouTube URL formats
   */
  getYouTubeVideoId(url) {
    try {
      const urlObj = new URL(url);
      
      // Handle youtu.be format
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      }
      
      // Handle youtube.com format
      if (urlObj.hostname.includes('youtube.com')) {
        // Check for embed format
        if (urlObj.pathname.includes('/embed/')) {
          return urlObj.pathname.split('/').pop();
        }
        
        // Check for watch format
        if (urlObj.pathname === '/watch') {
          return urlObj.searchParams.get('v');
        }
      }
      
      return null;
    } catch (error) {
      console.error("Failed to get YouTube video ID:", error);
      return null;
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    try {
      // Remove event listeners if needed
      this.openers.forEach((btn) => {
        btn.removeEventListener("click", this.openModal);
      });
    } catch (error) {
      console.error("Failed to destroy VideoModal:", error);
    }
  }
}
