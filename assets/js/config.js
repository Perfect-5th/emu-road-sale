/**
 * Configuration file for Emu Road Property Landing Page
 * Centralizes all configurable values and settings
 */

export const CONFIG = {
  // Open Home Configuration
  openHome: {
    timezone: "Australia/Brisbane",
    address: "77–79 Emu Road, Elimbah QLD 4516",
    events: [
      // Example events with confirmed times
      {
        start: "2025-08-23T12:00:00+10:00",
        end: "2025-08-23T12:30:00+10:00",
      },
      // Example date-only event (time TBC)
      {
        date: "2025-08-30",
      },
      // Add future opens here, newest last; the script will auto-select the next upcoming
      // For timed events: { start: "2025-02-01T10:00:00+10:00", end: "2025-02-01T10:30:00+10:00" }
      // For date-only events: { date: "2025-02-08" } (will show "Time: TBC")
    ],
  },

  // Gallery Configuration
  gallery: {
    basePath: "/images/gallery/",
    images: [
      {
        filename: "041.jpg",
        description: "Contemporary front facade with double garage, wide driveway, and manicured lawn.",
        location: "Front Exterior",
      },
      {
        filename: "042.jpg",
        description: "Front elevation showcasing clean architectural lines, welcoming entryway, and landscaped garden beds.",
        location: "Front Exterior",
      },
      {
        filename: "043.jpg",
        description: "Inviting driveway approach with sculptural feature mailbox, established gardens, and lush lawn.",
        location: "Front Exterior",
      },
      {
        filename: "015.jpg",
        description: "Spacious open-plan living area with large leather sectional, feature rug, and seamless flow to dining and kitchen.",
        location: "Living / Dining Room",
      },
      {
        filename: "016.jpg",
        description: "Living space with oversized TV, entertainment unit, and comfortable layout ideal for family gatherings.",
        location: "Living / Dining Room",
      },
      {
        filename: "017.jpg",
        description: "Light-filled living zone with stylish console table, decorative mirror, and easy connection to the outdoor patio.",
        location: "Living / Dining Room",
      },
      {
        filename: "020.jpg",
        description: "Wide-angle view of the open-plan layout combining living, dining, and kitchen, designed for effortless entertaining.",
        location: "Living / Dining Room",
      },
      {
        filename: "021.jpg",
        description: "Dining room with elegant timber table, crisp white tablecloth, and feature artwork, opening to the patio.",
        location: "Dining Room",
      },
      {
        filename: "024.jpg",
        description: "Dining area flowing into the modern kitchen, with sliding doors leading to outdoor living.",
        location: "Dining Room / Kitchen",
      },
      {
        filename: "025.jpg",
        description: "Stylish dining space with fresh flowers, warm timber finishes, and a welcoming atmosphere.",
        location: "Dining Room / Kitchen",
      },
      {
        filename: "026.jpg",
        description: "Contemporary kitchen with stone benchtops, breakfast bar seating, and stainless steel appliances.",
        location: "Kitchen",
      },
      {
        filename: "027.jpg",
        description: "Kitchen with double-door pantry, ample cabinetry, and sleek stainless steel fridge.",
        location: "Kitchen",
      },
      {
        filename: "028.jpg",
        description: "Functional kitchen design with quality appliances, gas cooktop, and generous storage space.",
        location: "Kitchen",
      },
      {
        filename: "029.jpg",
        description: "Bright and spacious kitchen featuring clean lines and a practical layout for everyday living.",
        location: "Kitchen",
      },
      {
        filename: "010.jpg",
        description: "Guest bedroom with soft neutral tones, ceiling fan, and charming framed artwork.",
        location: "Bedroom",
      },
      {
        filename: "014.jpg",
        description: "Serene bedroom with floral bedding, timber and wrought iron bed frame, and garden outlook.",
        location: "Bedroom",
      },
      {
        filename: "013.jpg",
        description: "Flexible guest room or home office with daybed, desk, dual monitors, and plenty of natural light.",
        location: "Home Office / Guest Room",
      },
      {
        filename: "01.jpg",
        description: "Expansive master suite with plush carpeting, abundant natural light, and direct access to ensuite.",
        location: "Master Bedroom",
      },
      {
        filename: "02.jpg",
        description: "Master bedroom retreat featuring split-system air conditioning, ceiling fan, and ample space.",
        location: "Master Bedroom",
      },
      {
        filename: "04.jpg",
        description: "Walk-in wardrobe with custom shelving, drawers, and hanging space for organised storage.",
        location: "Walk-in Wardrobe",
      },
      {
        filename: "05.jpg",
        description: "Ensuite with dual vanities, wide mirror, and sleek cabinetry, offering a touch of luxury.",
        location: "Ensuite Bathroom",
      },
      {
        filename: "06.jpg",
        description: "Double walk-in shower with floor-to-ceiling tiles and twin showerheads.",
        location: "Ensuite Bathroom",
      },
      {
        filename: "011.jpg",
        description: "Main bathroom with separate bathtub and shower, complemented by contemporary finishes.",
        location: "Bathroom",
      },
      {
        filename: "012.jpg",
        description: "Vanity area in main bathroom with wide mirror, stone-look benchtop, and twin towel rails.",
        location: "Bathroom",
      },
      {
        filename: "09.jpg",
        description: "Practical laundry with built-in cabinetry, sink, and pet door to the backyard.",
        location: "Laundry",
      },
      {
        filename: "07.jpg",
        description: "Comfortable media room with leather recliners, large TV, and display cabinets.",
        location: "Media Room",
      },
      {
        filename: "08.jpg",
        description: "Media room alternative view with antique dresser and relaxed seating arrangement.",
        location: "Media Room",
      },
      {
        filename: "030.jpg",
        description: "Covered deck with wicker lounge setting, outdoor rugs, and leafy garden outlook.",
        location: "Outdoor Entertaining Area",
      },
      {
        filename: "031.jpg",
        description: "Patio entertaining area with seating and tranquil views of the backyard.",
        location: "Outdoor Entertaining Area",
      },
      {
        filename: "032.jpg",
        description: "Outdoor lounge area with comfortable seating and easy access from the dining room.",
        location: "Outdoor Entertaining Area",
      },
      {
        filename: "033.jpg",
        description: "Outdoor space with BBQ, potted plants, and inviting seating area.",
        location: "Outdoor Entertaining Area",
      },
      {
        filename: "034.jpg",
        description: "Relaxed alfresco dining setting with round glass table and garden views.",
        location: "Outdoor Entertaining Area",
      },
      {
        filename: "035.jpg",
        description: "Patio conversation area with stylish wicker chairs and natural outlook.",
        location: "Outdoor Entertaining Area",
      },
      {
        filename: "036.jpg",
        description: "Backyard view of covered entertaining area and seating spaces.",
        location: "Backyard",
      },
      {
        filename: "037.jpg",
        description: "Fire pit feature surrounded by lush lawn and bamboo screening.",
        location: "Backyard",
      },
      {
        filename: "038.jpg",
        description: "Greenhouse with shade cloth roof, perfect for nurturing plants year-round.",
        location: "Greenhouse / Garden",
      },
      {
        filename: "039.jpg",
        description: "Inside greenhouse showcasing potted plants, hanging baskets, and well-planned layout.",
        location: "Greenhouse / Garden",
      },
      {
        filename: "040.jpg",
        description: "Alternate view inside greenhouse with organised plant displays and workbench area.",
        location: "Greenhouse / Garden",
      },
      {
        filename: "044.jpg",
        description: "Large powered shed with double roller doors and attached carport.",
        location: "Backyard / Shed",
      },
      {
        filename: "045.jpg",
        description: "Backyard fruit trees including bananas and citrus, with small rustic garden shed.",
        location: "Backyard / Garden",
      },
      {
        filename: "046.jpg",
        description: "Hedged garden beds and open lawn space with shed in the background.",
        location: "Backyard",
      },
      {
        filename: "047.jpg",
        description: "Expansive lawn leading to shed and greenhouse, ideal for outdoor activities.",
        location: "Backyard",
      },
      {
        filename: "048.jpg",
        description: "Rear elevation of the home with solar panels and sprawling lawn.",
        location: "Backyard / Rear Exterior",
      },
      {
        filename: "03.jpg",
        description: "Garden with raised vegetable beds, mature citrus tree in fruit, and shaded structure.",
        location: "Backyard / Garden",
      },
    ],
  },

  // Video Configuration
  video: {
    modalId: "videoModal",
    frameId: "videoModalFrame",
    closeBtnId: "videoModalClose",
    triggerClass: "js-watch",
  },

  // Gallery Modal Configuration
  galleryModal: {
    modalId: "galleryModal",
    closeBtnId: "galleryModalClose",
    swiperId: "gallerySwiper",
    thumbClass: "js-gallery-thumb",
  },

  // Scroll Configuration
  scroll: {
    margin: 96,
    duration: 900,
    threshold: 0.1,
  },

  // Animation Configuration
  animation: {
    galleryScroll: {
      duration: 45,
      lifestyleDuration: 36,
    },
    polaroid: {
      maxTilt: 2,
    },
  },

  // UI Configuration
  ui: {
    stickyNav: {
      threshold: 0.1,
    },
    backToTop: {
      threshold: 1.5, // screens
    },
  },

  // Constants
  constants: {
    AEST_LABEL: "AEST",
    REFRESH_THRESHOLD: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
  },
};
