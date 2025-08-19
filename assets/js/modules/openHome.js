/**
 * OpenHome Module
 * Handles open home banner display, calendar integration, and event management
 */

import { CONFIG } from '../config.js';

export class OpenHomeManager {
  constructor() {
    this.band = null;
    this.whenEl = null;
    this.addCalEl = null;
    this.gcalEl = null;
    this.dirEl = null;
    this.currentEvent = null;
    this.timeoutId = null;
  }

  /**
   * Initialize the open home functionality
   */
  init() {
    try {
      this.band = document.getElementById("openHomeBand");
      if (!this.band) {
        console.warn("Open home band element not found");
        return false;
      }

      if (!CONFIG.openHome || !Array.isArray(CONFIG.openHome.events)) {
        console.warn("Open home configuration not found or invalid");
        return false;
      }

      this.whenEl = document.getElementById("openHomeWhen");
      this.addCalEl = document.getElementById("ohAddCal");
      this.gcalEl = document.getElementById("ohGCal");
      this.dirEl = document.getElementById("ohDirections");

      if (!this.whenEl || !this.addCalEl || !this.gcalEl) {
        console.warn("Required open home elements not found");
        return false;
      }

      this.setupOpenHome();
      return true;
    } catch (error) {
      console.error("Failed to initialize OpenHome:", error);
      return false;
    }
  }

  /**
   * Set up the open home banner
   */
  setupOpenHome() {
    try {
      this.currentEvent = this.getNextEvent();
      
      if (!this.currentEvent) {
        this.hideBanner();
        return;
      }

      this.displayEvent();
      this.setupCalendarLinks();
      this.setupDirections();
      this.showBanner();
      this.scheduleRefresh();
    } catch (error) {
      console.error("Failed to setup open home:", error);
      this.hideBanner();
    }
  }

  /**
   * Get the next upcoming open home event
   */
  getNextEvent() {
    try {
      const now = new Date();
      
      // Process events - handle both timed and date-only events
      const events = CONFIG.openHome.events
        .map((e) => this.processEvent(e))
        .filter((e) => e && !isNaN(e.start) && !isNaN(e.end))
        .sort((a, b) => a.start - b.start);

      // Find first with end in the future
      for (const e of events) {
        if (e.end.getTime() > now.getTime()) {
          return e;
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to get next event:", error);
      return null;
    }
  }

  /**
   * Process a single event configuration
   */
  processEvent(eventConfig) {
    try {
      if (eventConfig.date) {
        // Date-only event - create a full day event in Brisbane timezone
        // Use Brisbane timezone to avoid date shifting
        const brisbaneDate = this.createBrisbaneDate(eventConfig.date);
        return { 
          start: brisbaneDate.start, 
          end: brisbaneDate.end, 
          isDateOnly: true,
          originalDate: eventConfig.date 
        };
      } else if (eventConfig.start) {
        // Timed event
        const start = this.parseISOWithOffset(eventConfig.start);
        const end = eventConfig.end ? this.parseISOWithOffset(eventConfig.end) : this.addMinutes(start, 30);
        return { start, end, isDateOnly: false };
      }
      return null;
    } catch (error) {
      console.error("Failed to process event:", eventConfig, error);
      return null;
    }
  }

  /**
   * Display the current event in the UI
   */
  displayEvent() {
    try {
      const startStrDate = this.formatDate(this.currentEvent.start);
      
      if (this.currentEvent.isDateOnly) {
        // Date-only event: "Sat 1 Feb, Time: TBC"
        this.whenEl.textContent = `${startStrDate}, Time: TBC`;
      } else {
        // Timed event: "Sat 25 Jan, 10:00–10:30 AEST"
        const startStrTime = this.formatTime(this.currentEvent.start);
        const endStrTime = this.formatTime(this.currentEvent.end);
        this.whenEl.textContent = `${startStrDate}, ${startStrTime}–${endStrTime} ${CONFIG.constants.AEST_LABEL}`;
      }
    } catch (error) {
      console.error("Failed to display event:", error);
    }
  }

  /**
   * Set up calendar integration links
   */
  setupCalendarLinks() {
    try {
      const title = "Open Home — 77–79 Emu Rd, Elimbah";
      const details = "Open Home for 77–79 Emu Rd, Elimbah. View details: https://www.realestate.com.au/property-house-qld-elimbah-148472268";
      const location = CONFIG.openHome.address;

      // Debug timezone information
      this.logTimezoneInfo();

      if (this.currentEvent.isDateOnly) {
        this.setupDateOnlyCalendar(title, details, location);
      } else {
        this.setupTimedCalendar(title, details, location);
      }
    } catch (error) {
      console.error("Failed to setup calendar links:", error);
    }
  }

  /**
   * Set up calendar links for date-only events
   */
  setupDateOnlyCalendar(title, details, location) {
    try {
      const dateOnly = this.currentEvent.originalDate;
      
      // ICS for all-day event
      const icsHref = this.buildICS({
        start: new Date(dateOnly + 'T00:00:00'),
        end: new Date(dateOnly + 'T23:59:59'),
        title: title + ' (Time: TBC)',
        description: details + ' - Time to be confirmed',
        location,
        isAllDay: true,
      });
      this.addCalEl.setAttribute("href", icsHref);
      this.addCalEl.setAttribute("download", "open-home.ics");
      
      // Google Calendar for all-day event
      // Use Brisbane timezone to ensure correct date
      const brisbaneDate = this.getBrisbaneDateString(new Date(dateOnly + 'T00:00:00'));
      const brisbaneDateEnd = this.addDaysYYYYMMDD(brisbaneDate, 1); // exclusive end
      const gq = new URL("https://calendar.google.com/calendar/render");
      gq.searchParams.set("action", "TEMPLATE");
      gq.searchParams.set("text", title + ' (Time: TBC)');
      gq.searchParams.set("dates", `${brisbaneDate}/${brisbaneDateEnd}`);
      gq.searchParams.set(
        "details",
        details + ' - Time to be confirmed (Time zone: ' + CONFIG.constants.AEST_LABEL + ')'
      );
      gq.searchParams.set("location", location);
      gq.searchParams.set("ctz", CONFIG.openHome.timezone);
      this.gcalEl.setAttribute("href", gq.toString());
    } catch (error) {
      console.error("Failed to setup date-only calendar:", error);
    }
  }

  /**
   * Set up calendar links for timed events
   */
  setupTimedCalendar(title, details, location) {
    try {
      // ICS for timed event
      const icsHref = this.buildICS({
        start: this.currentEvent.start,
        end: this.currentEvent.end,
        title,
        description: details,
        location,
      });
      this.addCalEl.setAttribute("href", icsHref);
      this.addCalEl.setAttribute("download", "open-home.ics");

      // Google Calendar
      const gStart = this.toGoogleDateUTC(this.currentEvent.start);
      const gEnd = this.toGoogleDateUTC(this.currentEvent.end);
      const gq = new URL("https://calendar.google.com/calendar/render");
      gq.searchParams.set("action", "TEMPLATE");
      gq.searchParams.set("text", title);
      gq.searchParams.set("dates", `${gStart}/${gEnd}`);
      gq.searchParams.set(
        "details",
        details + " (Time zone: " + CONFIG.constants.AEST_LABEL + ")"
      );
      gq.searchParams.set("location", location);
      gq.searchParams.set("ctz", CONFIG.openHome.timezone);
      this.gcalEl.setAttribute("href", gq.toString());
    } catch (error) {
      console.error("Failed to setup timed calendar:", error);
    }
  }

  /**
   * Set up directions link
   */
  setupDirections() {
    try {
      if (this.dirEl && !this.dirEl.getAttribute("href")) {
        this.dirEl.setAttribute(
          "href",
          "https://www.google.com/maps/dir/?api=1&destination=" +
            encodeURIComponent(CONFIG.openHome.address)
        );
      }
    } catch (error) {
      console.error("Failed to setup directions:", error);
    }
  }

  /**
   * Schedule automatic refresh of the banner
   */
  scheduleRefresh() {
    try {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      const millisUntilEnd = this.currentEvent.end.getTime() - Date.now();
      if (millisUntilEnd > 0 && millisUntilEnd < CONFIG.constants.REFRESH_THRESHOLD) {
        this.timeoutId = setTimeout(() => {
          this.refreshBanner();
        }, millisUntilEnd + 1000);
      }
    } catch (error) {
      console.error("Failed to schedule refresh:", error);
    }
  }

  /**
   * Refresh the banner state
   */
  refreshBanner() {
    try {
      const followUp = this.getNextEvent();
      if (!followUp || followUp.end.getTime() < Date.now()) {
        this.hideBanner();
      } else {
        // Update with new event
        this.currentEvent = followUp;
        this.setupOpenHome();
      }
    } catch (error) {
      console.error("Failed to refresh banner:", error);
      this.hideBanner();
    }
  }

  /**
   * Show the open home banner
   */
  showBanner() {
    try {
      this.band.classList.remove("hidden");
    } catch (error) {
      console.error("Failed to show banner:", error);
    }
  }

  /**
   * Hide the open home banner
   */
  hideBanner() {
    try {
      this.band.classList.add("hidden");
    } catch (error) {
      console.error("Failed to hide banner:", error);
    }
  }

  /**
   * Utility: Create Brisbane timezone date for date-only events
   */
  createBrisbaneDate(dateString) {
    try {
      // Create date in Brisbane timezone to avoid date shifting
      // Use Intl.DateTimeFormat to get the date in Brisbane time
      const date = new Date(dateString + 'T00:00:00');
      
      // Format the date in Brisbane timezone to get the correct local date
      const brisbaneDate = new Intl.DateTimeFormat('en-CA', {
        timeZone: CONFIG.openHome.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
      
      // Create start and end dates in Brisbane timezone
      const start = new Date(brisbaneDate + 'T00:00:00');
      const end = new Date(brisbaneDate + 'T23:59:59');
      
      return { start, end };
    } catch (error) {
      console.error("Failed to create Brisbane date:", error);
      // Fallback to original method
      const start = new Date(dateString + 'T00:00:00+10:00');
      const end = new Date(dateString + 'T23:59:59+10:00');
      return { start, end };
    }
  }

  /**
   * Utility: Get Brisbane date string for ICS format (YYYYMMDD)
   */
  getBrisbaneDateString(date) {
    try {
      // Format the date in Brisbane timezone to get the correct local date
      const brisbaneDate = new Intl.DateTimeFormat('en-CA', {
        timeZone: CONFIG.openHome.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
      
      // Convert to YYYYMMDD format for ICS
      return brisbaneDate.replace(/-/g, '');
    } catch (error) {
      console.error("Failed to get Brisbane date string:", error);
      // Fallback to original method
      return date.toISOString().split('T')[0].replace(/-/g, '');
    }
  }

  /**
   * Utility: Add days to a YYYYMMDD date string and return YYYYMMDD
   */
  addDaysYYYYMMDD(yyyymmdd, days) {
    try {
      const year = parseInt(yyyymmdd.slice(0, 4), 10);
      const month = parseInt(yyyymmdd.slice(4, 6), 10);
      const day = parseInt(yyyymmdd.slice(6, 8), 10);
      const d = new Date(Date.UTC(year, month - 1, day));
      d.setUTCDate(d.getUTCDate() + days);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, '0');
      const da = String(d.getUTCDate()).padStart(2, '0');
      return `${y}${m}${da}`;
    } catch (error) {
      console.error("Failed to add days to YYYYMMDD:", error);
      return yyyymmdd;
    }
  }

  /**
   * Debug: Log timezone information for troubleshooting
   */
  logTimezoneInfo() {
    try {
      if (!this.currentEvent) return;
      
      console.log("🔍 Timezone Debug Information:");
      console.log("Event:", this.currentEvent);
      console.log("Original date:", this.currentEvent.originalDate);
      console.log("Start date:", this.currentEvent.start);
      console.log("End date:", this.currentEvent.end);
      console.log("Brisbane timezone:", CONFIG.openHome.timezone);
      
      if (this.currentEvent.isDateOnly) {
        const brisbaneDate = this.getBrisbaneDateString(new Date(this.currentEvent.originalDate + 'T00:00:00'));
        console.log("Brisbane date string for ICS:", brisbaneDate);
        
        // Test date formatting
        const testDate = new Date(this.currentEvent.originalDate + 'T00:00:00');
        const brisbaneFormatted = new Intl.DateTimeFormat('en-CA', {
          timeZone: CONFIG.openHome.timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(testDate);
        console.log("Brisbane formatted date:", brisbaneFormatted);
      }
    } catch (error) {
      console.error("Failed to log timezone info:", error);
    }
  }

  /**
   * Utility: Parse ISO string with offset
   */
  parseISOWithOffset(iso) {
    return new Date(iso);
  }

  /**
   * Utility: Add minutes to a date
   */
  addMinutes(date, mins) {
    return new Date(date.getTime() + mins * 60000);
  }

  /**
   * Utility: Format date for display
   */
  formatDate(date) {
    return new Intl.DateTimeFormat("en-AU", {
      timeZone: CONFIG.openHome.timezone,
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);
  }

  /**
   * Utility: Format time for display
   */
  formatTime(date) {
    return new Intl.DateTimeFormat("en-AU", {
      timeZone: CONFIG.openHome.timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  }

  /**
   * Utility: Convert date to Google Calendar UTC format
   */
  toGoogleDateUTC(date) {
    try {
      const z = new Date(date.getTime());
      const iso = z
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
      return iso;
    } catch (error) {
      console.error("Failed to convert date to Google format:", error);
      return date.toISOString();
    }
  }

  /**
   * Build ICS calendar file content
   */
  buildICS({ start, end, title, description, location, isAllDay = false }) {
    try {
      const uid = `openhome-${start.toISOString()}@emu-rd`;
      
      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Emu Rd Open Home//AU",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
      ];
      
      if (isAllDay) {
        // All-day event (date-only) - use Brisbane timezone date
        // ICS expects exclusive DTEND (next day)
        const brisbaneDate = this.getBrisbaneDateString(start);
        const brisbaneDateEnd = this.addDaysYYYYMMDD(brisbaneDate, 1);
        ics.push(
          `DTSTART;VALUE=DATE:${brisbaneDate}`,
          `DTEND;VALUE=DATE:${brisbaneDateEnd}`
        );
      } else {
        // Timed event
        const dtfmt = (dt) =>
          dt
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}Z$/, "Z");
        ics.push(
          `DTSTART:${dtfmt(start)}`,
          `DTEND:${dtfmt(end)}`
        );
      }
      
      ics.push(
        `SUMMARY:${title}`,
        `LOCATION:${location}`,
        `DESCRIPTION:${description} (Time zone: ${CONFIG.constants.AEST_LABEL})`,
        "END:VEVENT",
        "END:VCALENDAR"
      );
      
      return "data:text/calendar;charset=utf-8," + encodeURIComponent(ics.join("\r\n"));
    } catch (error) {
      console.error("Failed to build ICS:", error);
      return "";
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    try {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    } catch (error) {
      console.error("Failed to destroy OpenHome:", error);
    }
  }
}
