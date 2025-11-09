# Glyph Renderers

This directory contains specialized glyph calculator implementations for 8-segment display font systems.

## Architecture

### Base Class: `GlyphRenderer`
Location: `../GlyphRenderer.js`

The `GlyphRenderer` class handles all common functionality:
- UI setup (input field, control panel, SVG output)
- Control panel configuration with 11 parameters
- SVG rendering and layout
- Text-to-glyph conversion
- Background/foreground layer management

### Glyph Calculators

Each glyph calculator implements the specific geometry for a display style:

#### `EightfulGlyph.js` - Diagonal Segment Layout
Uses 8 diagonal segments arranged in pairs:
```
0 / \ 1  # Top diagonals
2 \ / 3  # Upper-middle diagonals
4 / \ 5  # Lower-middle diagonals
6 \ / 7  # Bottom diagonals
```

**Exports:**
- `glyphMap` - Character-to-segment mappings (A-Z)
- `defaults` - Default control values
- `calculateGlyph()` - Geometry calculator function

**Default values:**
- Inner Radius: 3
- Line Length: 6
- Light Stroke Width: 10
- Horizontal/Vertical Kerning: 31/55

#### `OctopusGlyph.js` - Radial Segment Layout
Uses 8 radial segments like octopus tentacles:
```
    0
 7     1
6       2
 5     3
    4
```

**Exports:**
- `glyphMap` - Character-to-segment mappings (A-Z)
- `defaults` - Default control values
- `calculateGlyph()` - Geometry calculator function

**Default values:**
- Inner Radius: 6
- Line Length: 14
- Light Stroke Width: 0 (background disabled by default)
- Horizontal/Vertical Kerning: 50/50

## Usage

```javascript
import { GlyphRenderer } from "../module/GlyphRenderer.js";
import { glyphMap, defaults, calculateGlyph } from "../module/glyphs/EightfulGlyph.js";

const renderer = new GlyphRenderer({
    title: "Eightful",
    glyphMap,
    defaults,
    glyphCalculator: calculateGlyph,
});

renderer.render();
```

## Creating New Glyph Systems

To create a new 8-segment display style:

1. Create a new file in `module/glyphs/YourStyle.js`
2. Define your `glyphMap` (character-to-segment mappings)
3. Define your `defaults` object with control values
4. Implement `calculateGlyph()` function that returns `[background, foreground]` SVG groups
5. Import and use with `GlyphRenderer`

### Template

```javascript
import { G, Line } from "../Svg.js";

export const glyphMap = {
    A: "01234567", // Which segments are active
    // ... more characters
};

export const defaults = {
    IR: 5,          // Inner Radius
    LL: 10,         // Line Length
    // ... more defaults
};

export function calculateGlyph({ glyphMap, args, x, y, v }) {
    const { IR, LL, LSW, DSW, HK, VK } = args;
    const glyph = glyphMap[v.toUpperCase()];
    
    // Your custom geometry calculation here
    
    return [
        backgroundGroup,  // All 8 segments
        foregroundGroup,  // Only active segments
    ];
}
```

## Benefits of This Architecture

✅ **~200 lines** of duplicate code eliminated  
✅ Bug fixes apply to all variants automatically  
✅ Easy to create new glyph systems  
✅ Consistent UI/UX across all variants  
✅ Each HTML file reduced from 235 lines to ~30 lines  
✅ Testable modules in isolation  

## Files Refactored

- `svg/eightful.html` - Now uses `EightfulGlyph`
- `svg/octopus.html` - Now uses `OctopusGlyph`
