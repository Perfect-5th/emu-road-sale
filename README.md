# Emu Road Property Landing Page

A modern, responsive landing page for a property in Elimbah, Queensland.

## Project Structure

```
emu-rd-sale/
├── index.html              # Main HTML file (cleaned up)
├── assets/
│   ├── css/
│   │   └── main.css        # All custom styles (extracted from HTML)
│   └── js/
│       ├── config.js       # Centralized configuration
│       ├── main.js         # Main application orchestrator
│       └── modules/
│           ├── openHome.js  # Open home functionality
│           ├── gallery.js   # Gallery and modal management
│           └── videoModal.js # Video modal functionality
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

### ✅ JavaScript Modularization (Completed)
- **Before**: 15+ IIFEs scattered throughout HTML (monolithic structure)
- **After**: Clean ES6 modules with proper separation of concerns
- **Benefits**:
  - **Maintainability**: Each feature is now in its own module
  - **Testability**: Individual modules can be unit tested
  - **Reusability**: Modules can be imported/exported as needed
  - **Debugging**: Clear separation makes issues easier to isolate
  - **Performance**: Better tree-shaking and code splitting potential

### 🔄 Next Steps (Planned)
1. **Configuration Management** - ✅ Completed (moved to config.js)
2. **Performance Optimization** - Implement lazy loading and image optimization
3. **Testing & Quality** - Add unit tests and error handling
4. **Accessibility Improvements** - Enhance keyboard navigation and screen reader support

## JavaScript Architecture

The JavaScript is now organized into clean, maintainable ES6 modules:

### **Core Files:**
- **`config.js`** - Centralized configuration for all modules
- **`main.js`** - Main application class that orchestrates all modules

### **Modules:**
- **`openHome.js`** - Handles open home banner, calendar integration, and event management
- **`gallery.js`** - Manages gallery ticker, modal, and Swiper integration
- **`videoModal.js`** - Handles video modal functionality and YouTube integration

### **Benefits:**
- **Separation of Concerns**: Each module has a single responsibility
- **Error Handling**: Comprehensive try-catch blocks throughout
- **Configuration**: All hardcoded values centralized in one place
- **Maintainability**: Easy to modify individual features without affecting others
- **Testing**: Each module can be unit tested independently

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
4. Edit `assets/js/modules/` for JavaScript functionality
5. Edit `assets/js/config.js` for configuration changes

### CSS Guidelines
- Use logical grouping with clear section headers
- Maintain responsive design patterns
- Follow BEM-like naming conventions
- Keep media queries close to related styles

### JavaScript Guidelines
- Use ES6 modules with clear imports/exports
- Implement comprehensive error handling with try-catch
- Follow single responsibility principle for modules
- Use descriptive class and method names
- Centralize configuration in `config.js`

## Performance

- **CSS**: External file for better caching
- **Images**: Optimized with Netlify CDN
- **Fonts**: Preloaded for performance
- **Scripts**: Deferred where possible

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- Progressive enhancement approach
