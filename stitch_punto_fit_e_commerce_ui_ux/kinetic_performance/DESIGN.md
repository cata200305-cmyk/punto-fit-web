---
name: Kinetic Performance
colors:
  surface: '#f7fafe'
  surface-dim: '#d7dadf'
  surface-bright: '#f7fafe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f8'
  surface-container: '#ebeef3'
  surface-container-high: '#e5e8ed'
  surface-container-highest: '#e0e3e7'
  on-surface: '#181c1f'
  on-surface-variant: '#444933'
  inverse-surface: '#2d3134'
  inverse-on-surface: '#eef1f5'
  outline: '#747a60'
  outline-variant: '#c4c9ac'
  surface-tint: '#506600'
  primary: '#506600'
  on-primary: '#ffffff'
  primary-container: '#ccff00'
  on-primary-container: '#5b7300'
  inverse-primary: '#abd600'
  secondary: '#5d5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e5'
  on-secondary-container: '#636467'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#ededed'
  on-tertiary-container: '#6a6b6b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e2e2e5'
  secondary-fixed-dim: '#c6c6c9'
  on-secondary-fixed: '#1a1c1e'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f7fafe'
  on-background: '#181c1f'
  surface-variant: '#e0e3e7'
typography:
  headline-xl:
    fontFamily: Anybody
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system is engineered to evoke a sense of high-performance energy and professional reliability. It targets active individuals who value both style and functional excellence in their fitness gear. 

The visual style is **High-Contrast / Bold** with a focus on precision and movement. It utilizes a clean, systematic foundation of dark anthracite and crisp white, punctuated by a hyper-vibrant green to signal action and motivation. The interface should feel fast, responsive, and clear, removing all friction between the user and their fitness goals.

## Colors
The palette is built on extreme contrast to drive focus toward key conversion points.

- **Primary (Electric Lime):** Used exclusively for high-priority calls to action, active states, and critical highlights. It represents energy and peak performance.
- **Secondary (Anthracite):** The foundation for typography and structural elements. It provides a grounded, professional weight that balances the vibrant primary.
- **Tertiary (Cool Gray):** Used for subtle backgrounds and container fills to separate content without adding visual noise.
- **Neutral:** A range of grays used for secondary text and borders to maintain a clean, organized hierarchy.

## Typography
The typography strategy pairs expressive, variable-width headlines with hyper-readable, athletic body text. 

**Headlines** use a bold, wide sans-serif to communicate power and momentum. Large sizes should utilize tighter letter-spacing and line heights to create a compact, "impactful" look. 

**Body Text** relies on a font designed for maximum legibility and an "active" feel. It maintains a generous x-height to ensure clarity during quick interactions on mobile devices. Labels and utility text are often set in uppercase with increased letter spacing to provide a professional, technical aesthetic.

## Layout & Spacing
The layout follows a **Fluid Grid** model to ensure seamless transition across all device types. 

- **Desktop:** 12-column grid with 24px gutters and 64px side margins.
- **Tablet:** 8-column grid with 24px gutters and 32px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Spacing follows an 8px base unit. Larger "XL" gaps are used to separate major content sections, emphasizing a clean, "uncluttered" professional look that allows product photography to breathe.

## Elevation & Depth
This design system uses **Ambient Shadows** and **Tonal Layers** to create a modern, sophisticated depth.

- **Level 0 (Base):** Crisp white (#FFFFFF) for the primary background.
- **Level 1 (Surface):** Light gray (#F4F4F4) for cards and containers.
- **Level 2 (Elevated):** Subtle, highly diffused shadows (Offset: 0, 8px; Blur: 24px; Opacity: 4%; Color: Anthracite). Used for product cards and navigation bars.
- **Level 3 (Interactive):** Slightly sharper shadows (Blur: 16px; Opacity: 8%) applied on hover to suggest "lift" and tactility.

Avoid heavy borders; use subtle shifts in background color and soft shadows to define boundaries.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a professional, geometric precision that aligns with technical sports equipment while remaining approachable. 

Buttons and input fields use the base 0.25rem (4px) radius. Larger containers, such as product cards or promotional banners, use `rounded-lg` (8px) to soften the overall composition without appearing "bubbly." Functional elements like checkboxes remain sharp to emphasize a technical, engineered feel.

## Components

### Buttons
- **Primary:** Background in Electric Lime, text in Anthracite. Bold weight. High contrast is mandatory.
- **Secondary:** Outlined in Anthracite with 2px stroke. Transparent background.
- **Ghost:** No background, Anthracite text. Used for secondary navigation.

### Cards
- White background with a Level 2 shadow. 
- Image aspect ratio should be a consistent 4:5 for apparel or 1:1 for equipment.
- Product titles use `headline-md`, prices use `body-lg` with a bold weight.

### Input Fields
- 2px border in Cool Gray, transitioning to Anthracite on focus.
- Labels use `label-sm` positioned above the field.
- Error states use a high-contrast red, never the Primary Green.

### Chips & Tags
- Used for "New Arrival," "Sale," or "Eco-friendly" badges.
- Small padding (4px 12px) with `label-sm` text. 
- Sale tags should use a high-contrast black background with white text.

### Lists & Navigation
- Top navigation should be sticky with a slight blur effect behind the Anthracite or White background.
- List items in mobile menus use generous vertical padding (20px+) for easy thumb interaction.