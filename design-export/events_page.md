# Events Page - Current Design State

## Visual Hierarchy & Layout
- **Hero Section**: Large "THE BATTLEGROUNDS" title, rotated tape strips.
- **Grid Layout**: A responsive CSS grid (`grid-cols-2` on tablet, `grid-cols-3` or `4` on desktop) displaying event category cards (e.g., Dance, Music, Dramatics).
- **Card Design**: 
  - `TiltCard` components that rotate slightly based on mouse movement (3D tilt effect).
  - Solid borders with a sharp, hard shadow offset (e.g. `10px 10px 0px rgba(0,0,0,0.5)`).
  - Heavy use of CSS gradients for the inner card artwork.
  - Hover effects that increase the shadow offset and trigger a glowing border.

## Typography & Colors
- Identical to the landing page (Charcoal background, `Anton` headers, `Inter` body).
- Card titles use the primary gradient colors (Gold to Crimson).

## Textures & Interactive Elements
- The background features a subtle radial gradient acting as a "stage light" spotlighting the grid.
- `FloatingStickers` are scattered randomly across the negative space.
- A custom "cursor text" effect (e.g., hovering over a card changes the cursor to say "ENTER").
