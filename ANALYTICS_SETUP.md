# Google Analytics Event Tracking Setup

This document explains how to use the comprehensive event tracking system that has been added to your property website.

## What's Being Tracked

The analytics system tracks the following user interactions:

### 🎯 CTA (Call-to-Action) Buttons
- **View Listing** - Clicks on realestate.com.au links
- **Watch Video** - Clicks on video tour buttons
- **Call Agent** - Clicks on phone numbers
- **Get Directions** - Clicks on Google Maps links
- **Add to Calendar** - Clicks on calendar links

### 🖼️ Gallery Interactions
- **Thumbnail Clicks** - When users click gallery thumbnails
- **Modal Open/Close** - When gallery modal is opened or closed

### 🎥 Video Interactions
- **Video Modal Open/Close** - When video tour modal is opened or closed

### 🧭 Navigation
- **Sticky Navigation** - Clicks on sticky navigation links
- **Main Navigation** - Clicks on main navigation links

### 📍 Location & Proximity
- **Proximity Links** - Clicks on nearby amenities (schools, shops, etc.)
- **Map Interactions** - When the Google Maps iframe comes into view

### 📊 User Engagement
- **Scroll Depth** - When users scroll to 25%, 50%, 75%, 90%, and 100% of the page
- **External Links** - Clicks on any external website links
- **Phone Calls** - Clicks on phone numbers (duplicate of CTA tracking)

## Configuration

All tracking settings can be customized in `assets/js/analytics-config.js`:

```javascript
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
    engagementTimeTracking: false, // Optional: track user engagement time
  },

  // Scroll depth thresholds (percentages)
  scrollDepth: {
    thresholds: [25, 50, 75, 90, 100],
    trackOnce: true, // Only track each threshold once per session
  },

  // Debug settings
  debug: {
    enabled: false, // Set to true to see analytics events in console
    logEvents: true,
  },
};
```

## Viewing Analytics Data

### In Google Analytics 4:

1. **Go to Reports** → **Engagement** → **Events**
2. Look for these event names:
   - `cta_click`
   - `gallery_interaction`
   - `video_interaction`
   - `navigation_click`
   - `proximity_link_click`
   - `scroll_depth`
   - `external_link_click`
   - `phone_click`
   - `map_interaction`

### Event Parameters

Each event includes useful parameters:

- `event_category` - Groups events (engagement, navigation, etc.)
- `event_label` - Specific action (view_listing, gallery_modal_open, etc.)
- `link_url` - URL that was clicked
- `link_text` - Text of the clicked link
- `section` - Page section (for navigation clicks)
- `scroll_percentage` - Scroll depth percentage
- `image_index` - Gallery image index
- `video_src` - Video source
- `link_type` - Category of proximity link (education, shopping, etc.)

## Debugging

To see analytics events in the browser console:

1. Open `assets/js/analytics-config.js`
2. Set `debug.enabled: true`
3. Refresh the page
4. Open browser console (F12)
5. Interact with the page to see events logged

## Custom Events

To add custom event tracking, you can call the tracking function directly:

```javascript
// Get the analytics module
const analytics = window.emuRoadApp.getModule('analytics');

// Track a custom event
analytics.trackEvent('custom_event', {
  event_category: 'engagement',
  event_label: 'custom_action',
  custom_parameter: 'value'
});
```

## Privacy Considerations

- All tracking respects user privacy settings
- No personally identifiable information is collected
- Events are sent to Google Analytics only
- Users can opt out via browser settings or ad blockers

## Troubleshooting

### Events not appearing in GA4:
1. Check that Google Analytics is properly loaded
2. Verify the GA4 property ID is correct in `index.html`
3. Check browser console for errors
4. Ensure ad blockers aren't blocking analytics

### Too many events:
1. Disable specific features in `analytics-config.js`
2. Adjust scroll depth thresholds
3. Set `debug.enabled: false` in production

### Performance issues:
1. Disable engagement time tracking if not needed
2. Reduce scroll depth tracking frequency
3. Consider disabling less important tracking features

## Support

The analytics system is designed to be:
- **Non-intrusive** - Doesn't affect page performance
- **Configurable** - Easy to enable/disable features
- **Debuggable** - Clear logging and error handling
- **Maintainable** - Well-documented and modular code

For questions or customizations, refer to the code comments in `assets/js/modules/analytics.js`.
