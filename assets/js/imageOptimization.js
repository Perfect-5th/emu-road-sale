/**
 * Image Optimization Module
 * Handles Netlify Image CDN optimization and responsive image loading
 */

(function() {
  'use strict';

  // Netlify Image CDN helpers (no deprecated nf_resize; uses /.netlify/images)
  window.NIMG = (function () {
    const CDN_PATH = "/.netlify/images";
    
    /**
     * Convert source URL to CDN URL with parameters
     * @param {string} src - Original image source
     * @param {Object} params - CDN parameters (w, h, fit, q)
     * @returns {string} CDN URL
     */
    function toCdnUrl(src, params = {}) {
      if (!src) return src;
      
      // Ensure relative paths start with a slash
      const isAbs = /^https?:\/\//i.test(src);
      const clean = isAbs ? src : src.startsWith("/") ? src : "/" + src;
      const u = new URL(CDN_PATH, location.origin);
      u.searchParams.set("url", clean);
      
      if (params.w) u.searchParams.set("w", params.w);
      if (params.h) u.searchParams.set("h", params.h);
      if (params.fit) u.searchParams.set("fit", params.fit);
      if (params.q) u.searchParams.set("q", params.q);
      
      // Do not set fm — allow CDN content negotiation per docs (webp/avif/original)
      return u.pathname + "?" + u.searchParams.toString();
    }

    /**
     * Build responsive srcset string
     * @param {string} src - Original image source
     * @param {Array} widths - Array of widths for responsive images
     * @param {Object} params - Additional CDN parameters
     * @returns {string} Srcset string
     */
    function buildSrcSet(src, widths, params = {}) {
      return widths
        .map((w) => `${toCdnUrl(src, { ...params, w })} ${w}w`)
        .join(", ");
    }

    /**
     * Optimize a single image element
     * @param {HTMLElement} img - Image element to optimize
     * @param {Object} opts - Optimization options
     */
    function optimise(img, opts = {}) {
      if (!img || img.dataset.nimgOptimised) return;
      
      const raw = img.getAttribute("data-rawsrc") || img.getAttribute("src");
      if (!raw) return;
      
      const kind = opts.kind || img.dataset.kind || "generic";
      
      // Reasonable defaults by kind
      let widths = [480, 768, 1024, 1280, 1600];
      let sizes = img.getAttribute("sizes") || img.dataset.sizes || "(min-width:768px) 50vw, 100vw";
      let params = { q: 60 };
      
      if (kind === "avatar") {
        widths = [128, 192, 256, 320];
        sizes = img.getAttribute("sizes") || img.dataset.sizes || "160px";
        params.fit = "cover";
      } else if (kind === "hero") {
        widths = [640, 960, 1200, 1600, 2000];
        sizes = img.getAttribute("sizes") || img.dataset.sizes || "(min-width:768px) 50vw, 100vw";
      } else if (kind === "feature") {
        widths = [640, 960, 1200, 1440];
        sizes = img.getAttribute("sizes") || img.dataset.sizes || "(min-width:768px) 50vw, 100vw";
      }
      
      // Apply responsive sources
      img.setAttribute("srcset", buildSrcSet(raw, widths, params));
      img.setAttribute("sizes", sizes);
      
      // Pick a sensible default src (middle of the pack)
      const fallbackW = widths[Math.min(2, widths.length - 1)];
      img.setAttribute("src", toCdnUrl(raw, { ...params, w: fallbackW }));
      img.setAttribute("loading", img.getAttribute("loading") || "lazy");
      img.setAttribute("decoding", img.getAttribute("decoding") || "async");
      img.dataset.nimgOptimised = "true";
    }

    /**
     * Optimize all images in a container
     * @param {HTMLElement} root - Root element to search within
     */
    function optimiseAll(root = document) {
      root
        .querySelectorAll(
          "img[data-rawsrc], img[src^='images/'], img[src^='/images/']"
        )
        .forEach((img) => optimise(img));
    }

    // Optimise existing images on DOM ready
    if (document.readyState !== "loading") {
      optimiseAll();
    } else {
      document.addEventListener("DOMContentLoaded", () => optimiseAll());
    }

    // Watch for dynamically inserted images (e.g., galleries)
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) {
            if (n.tagName === "IMG") optimise(n);
            else optimiseAll(n);
          }
        });
      });
    });
    
    mo.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return { toCdnUrl, buildSrcSet, optimise, optimiseAll };
  })();
})();
