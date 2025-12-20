# Stray JavaScript Files Report

**Generated:** December 20, 2025

This document lists all JavaScript files in the workspace that are not referenced by any HTML files or imported by other JavaScript files.

## Summary

Total JavaScript files analyzed: **74**  
Stray files found: **3**

## Stray Files

### Root Directory

1. **`table.js`**
   - Location: `d:\GitHub\projects\table.js`
   - Status: Not referenced by any HTML file or imported by any JS file
   - Note: While there is a `table.html` in the tools directory, it does not reference this file

## Files That ARE Used

The following files are actively used in the workspace:

### Module Files (Used via ES6 imports)
- `module/ControlPanel.js` - Imported by GlyphRenderer.js
- `module/Dom.js` - Imported by ControlPanel.js, GlyphRenderer.js, TableBuilder.js, Svg.js, and index.html
- `module/Easing.js` - Used in test files
- `module/Filter.js` - Module export
- `module/GlyphRenderer.js` - Used in various HTML files
- `module/IdUtils.js` - Module export
- `module/LoStMan.js` - Module export
- `module/MUtils.js` - Module export
- `module/OctoMan.js` - Module export
- `module/QueStMan.js` - Module export
- `module/Reduce.js` - Module export
- `module/Relation.js` - Imports from Utils.js
- `module/Sort.js` - Imported by index.html
- `module/SUtils.js` - Imported by Dom.js, Utils.js
- `module/Svg.js` - Imported by GlyphRenderer.js, glyphs, and index.html
- `module/TableBuilder.js` - Imports from Dom.js and Utils.js
- `module/Utils.js` - Imported by Dom.js, TableBuilder.js
- `module/Vector.js` - Imported by Svg.js

### Glyph Files
- `module/glyphs/EightfulGlyph.js` - Imports from Svg.js and glyphUtils.js
- `module/glyphs/glyphUtils.js` - Imported by multiple glyph files
- `module/glyphs/GridGlyph.js` - Imports from Svg.js and glyphUtils.js
- `module/glyphs/LynxGlyph.js` - Imports from glyphUtils.js
- `module/glyphs/OctopusGlyph.js` - Imports from glyphUtils.js

### Root Level Files
- `util.js` - Referenced by 30+ HTML files across the workspace
- `svg.js` - Referenced by test/svg.html and multiple files in svg/ directory
- `words.js` - Referenced by test/distance.html and visual/crypt_lang/index.html
- `distance.js` - Referenced by test/distance.html, canvas/distance.html, canvas/mds.html, model/table.html
- `controlPanel.js` - Referenced by tools/hypergeometric.html

### Model Files
- `model/DeckModel.js` - Referenced by model/table.html and canvas/distance.html

### Canvas Files
- `canvas/mirror/Canvas3DViewer.js` - Imports WebGLUtils.js
- `canvas/mirror/DrawingApp.js` - Used in canvas/mirror/index.html
- `canvas/mirror/WebGLUtils.js` - Imported by Canvas3DViewer.js
- `canvas/webworker/worker.js` - Web worker used by canvas/webworker/index.html

### SVG Files
- `svg/quadtree.js` - Referenced by svg/quadtree.html

### Visual Projects (each has dedicated HTML file)
- `visual/_blank/script.js`
- `visual/AssemblyLine/script.js`
- `visual/balancers/script.js`
- `visual/bubble_p5/bubble.js`
- `visual/bubble_sketch/bubble.js`
- `visual/clock/script.js`
- `visual/clockz60/script.js`
- `visual/consuntivi/calendar.js`
- `visual/consuntivi/script.js`
- `visual/consuntivi_no_jquery/calendar.js`
- `visual/consuntivi_no_jquery/client.js`
- `visual/consuntivi_no_jquery/script.js`
- `visual/crypt_lang/script.js`
- `visual/crypt_lang/words.js`
- `visual/DBViewer/script.js`
- `visual/devicemotion/script.js`
- `visual/digit/code.js`
- `visual/digit-css/script.js`
- `visual/glow/script.js`
- `visual/halftone/halftone.js`
- `visual/hamming_distance/script.js`
- `visual/maze_and_circuit/script.js`
- `visual/Menu/script.js`
- `visual/noise/script.js`
- `visual/Pictionary/script.js`
- `visual/puzzle/script.js`
- `visual/reaction_diffusion/r_d.js`
- `visual/ruben/script.js`
- `visual/scribble/program.js`
- `visual/shape/program.js`
- `visual/skin/script.js`
- `visual/sp_calendar/script.js`
- `visual/sticky/script.js`
- `visual/string_to_color/script.js`
- `visual/triangle/program.js`
- `visual/vormap/program.js`
- `visual/web/program.js`

### Tools Files
- `tools/ocr/script.js` - Referenced by tools/ocr/index.html
- `tools/pwdgen/script.js` - Referenced by tools/pwdgen/index.html

## Missing Files Referenced

The following files are referenced in HTML files but do not exist in the workspace:

1. **`main.js`** - Referenced by:
   - `svg/index.html`
   - `canvas/index.html`

2. **`common.js`** - Referenced by:
   - `tools/splitter.html`
   - `tools/mtg_collection/index.html`

3. **`vector.js`** - Referenced by:
   - `test/vector.html`
   - `test/svg.html`
   - `svg/upbeat_whistle.html`
   - `svg/zen_paper.html`
   - `svg/quadtree.html`
   - `svg/helpful_car.html`
   - `svg/arc.html`
   - `canvas/vibrant_pillow.html`

## Analysis Notes

1. The workspace has a modular structure with ES6 modules in the `module/` directory
2. Most visual projects follow a pattern: each has its own `index.html` that references a local `script.js`, `program.js`, or similar
3. Utility files like `util.js`, `svg.js`, `distance.js`, and `words.js` are shared across multiple projects
4. There are several missing files that are referenced but don't exist (main.js, common.js, vector.js in root)
5. The only confirmed stray file is `table.js` which has no references anywhere in the codebase

## Recommendations

1. **Review `table.js`**: Determine if this file should be deleted or if references to it need to be added
2. **Fix missing references**: Create or restore missing files (main.js, common.js, vector.js) or update HTML files to remove broken references
3. **Consider consolidation**: Some files like `visual/crypt_lang/words.js` might be duplicates that could reference the root `words.js` instead
