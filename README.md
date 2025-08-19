# Emu Road Property Landing Page

A modern, responsive landing page for a property in Elimbah, Queensland.

## Project Structure

```
emu-rd-sale/
├── index.html              # Main HTML file (cleaned up)
├── assets/
│   └── css/
│       └── main.css        # All custom styles (extracted from HTML)
├── images/                 # Property images and galleries
└── README.md              # This file
```

## Recent Improvements

### ✅ CSS Extraction (Completed)
- **Before**: 616 lines of inline CSS in HTML file
- **After**: Clean HTML with external CSS file
- **Benefits**:
  - Better maintainability
  - Improved caching
  - Cleaner HTML structure
  - Easier debugging

### 🔄 Next Steps (Planned)
1. **JavaScript Modularization** - Split into logical modules
2. **Configuration Management** - Centralize all config values
3. **Performance Optimization** - Implement lazy loading
4. **Testing & Quality** - Add unit tests and error handling

## CSS Organization

The `main.css` file is organized into logical sections:

- **Base Styles & Typography** - HTML elements, fonts, headings
- **Utility Components** - Chips, cards, buttons
- **Decorative Elements** - Blobs, gradients, visual effects
- **Icons & Interactive Elements** - Icon sizing, hover states
- **Proximity Section** - Location-specific styling
- **Swiper Components** - Gallery and carousel styles
- **Gallery Components** - Image galleries and tickers
- **Feature Galleries** - Polaroid effects and overlays
- **Lifestyle Section** - Layout and spacing
- **Modal Components** - Video and gallery modals
- **Navigation** - Sticky nav and scrollbars
- **Utility Components** - Placeholders, toasts, skeletons

## Development

### Local Development
1. Open `index.html` in a browser
2. Use Live Server extension for auto-refresh
3. Edit `assets/css/main.css` for styling changes

### CSS Guidelines
- Use logical grouping with clear section headers
- Maintain responsive design patterns
- Follow BEM-like naming conventions
- Keep media queries close to related styles

## Performance

- **CSS**: External file for better caching
- **Images**: Optimized with Netlify CDN
- **Fonts**: Preloaded for performance
- **Scripts**: Deferred where possible

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- Progressive enhancement approach
