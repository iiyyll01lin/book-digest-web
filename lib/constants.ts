// ============================================
// Centralized blur placeholder data URLs
// ============================================
// Pre-computed SVG blur placeholders for different image aspect ratios
// These are base64-encoded SVGs with the brand navy color (#0F2E66 or #1a365d)

// Book cover aspect ratio (7:10) - for book grids and walls
export const BLUR_BOOK_COVER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzFhMzY1ZCIvPjwvc3ZnPg==';

// Book cover large (for detail pages)
export const BLUR_BOOK_COVER_LARGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI0IiBoZWlnaHQ9IjMzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjI0IiBoZWlnaHQ9IjMzNiIgZmlsbD0iIzFhMzY1ZCIvPjwvc3ZnPg==';

// Poster aspect ratio (3:4) - for event posters
export const BLUR_POSTER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzBGMkU2NiIvPjwvc3ZnPg==';

// Square aspect ratio (1:1) - for icons and avatars
export const BLUR_SQUARE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iIzBGMkU2NiIvPjwvc3ZnPg==';

// Carousel book (smaller)
export const BLUR_BOOK_CAROUSEL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE5MiIgZmlsbD0iIzFhMzY1ZCIvPjwvc3ZnPg==';

// ============================================
// Brand colors
// ============================================
export const BRAND_COLORS = {
  navy: '#0F2E66',
  blue: '#113A7A',
  pink: '#FFA6C3',
  yellow: '#FFDD57',
} as const;
