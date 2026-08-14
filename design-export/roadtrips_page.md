# Roadtrips Page - Current Design State

## Visual Hierarchy & Layout
- **Hero Section**: A cinematic backdrop image featuring a crowd/concert scene, overlaid with a massive "ON THE ROAD" headline.
- **Nationals Feature**: The top roadtrip (Nationals) is featured in a large, asymmetrical split layout (`1fr 1.1fr`) with a massive poster card on one side and a detailed description/call-to-action on the other.
- **Tour Bill Grid**: The remaining 5 city battles are displayed in a `grid-cols-6` layout (bottom row perfectly centered).
- **Marquee**: A diagonal, infinite scrolling marquee separating sections (e.g., "15+ cities * 6 battles * one national crown").

## Typography & Colors
- Follows the core palette.
- Heavy use of background clip text (gradients clipped to the `Anton` font for titles).
- Tape banners (e.g., `tape-pink`, `tape-cyan`) used as eyebrow subheadings above main titles.

## Textures & Interactive Elements
- Posters use a collectible card aesthetic with a faux "Tour Stamp" positioned dynamically over the artwork.
- Scrolling reveals: Elements fade and slide up sequentially as the user scrolls down the page.
