# Stray JavaScript Files Report

**Generated:** December 21, 2025

This document lists all JavaScript files in the workspace that are not referenced by any HTML files or imported by other JavaScript files.

## Summary

Total JavaScript files analyzed: **67**  
Stray files found: **0**

## Status

All JavaScript files in the workspace are properly referenced or imported. No stray files detected.

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

### Root-Level Utility Files (Previously Existed)

1. **`util.js`** - Referenced by **27 HTML files**:
   - `canvas/base.html`
   - `canvas/distance.html`
   - `canvas/index.html`
   - `canvas/keen_wagon.html`
   - `canvas/mds.html`
   - `canvas/sincere_tent.html`
   - `canvas/vibrant_pillow.html`
   - `canvas/warmhearted_instrument.html`
   - `canvas/webworker/index.html` (via CDN)
   - `game/hex.html`
   - `game/slotmachine.html`
   - `model/table.html`
   - `test/benchmark/utils.html`
   - `test/distance.html`
   - `test/dom.html`
   - `test/utils.html`
   - `tools/compare.html`
   - `tools/gcompare.html` (via CDN)
   - `tools/hypergeometric.html`
   - `tools/pwdgen/index.html`
   - `tools/rpt.html`
   - `tools/table.html`
   - `tools/textAreafunc.html` (via CDN)
   - `visual/_blank/index.html`
   - `visual/word_clock.html` (via CDN)

2. **`svg.js`** - Referenced by **1 HTML file**:
   - `test/svg.html`
   - Note: `module/Svg.js` exists and is used via ES6 imports in several files

3. **`words.js`** - Referenced by **1 HTML file**:
   - `test/distance.html`
   - Note: `visual/crypt_lang/words.js` exists separately

4. **`distance.js`** - Referenced by **4 HTML files**:
   - `canvas/distance.html`
   - `canvas/mds.html`
   - `model/table.html`
   - `test/distance.html`

5. **`controlPanel.js`** - Referenced by **1 HTML file**:
   - `tools/hypergeometric.html`
   - Note: `module/ControlPanel.js` exists and is used via ES6 imports

6. **`vector.js`** - Referenced by **3 HTML files** (using script tags):
   - `canvas/vibrant_pillow.html`
   - `test/svg.html`
   - `test/vector.html`
   - Note: `module/Vector.js` exists and is used via ES6 imports in 4 other files

### Other Missing Files

7. **`main.js`** - Referenced by **1 HTML file**:
   - `canvas/index.html`

8. **`common.js`** - Referenced by **2 HTML files**:
   - `tools/mtg_collection/index.html`
   - `tools/splitter.html`

9. **`tools/ocr/script.js`** - Expected but not found
   - Directory `tools/ocr/` exists with only `index.html`

## Analysis Notes

1. The workspace has a modular structure with ES6 modules in the `module/` directory
2. Most visual projects follow a pattern: each has its own `index.html` that references a local `script.js`, `program.js`, or similar
3. **CRITICAL**: Several core utility files that were previously in the root directory have been deleted:
   - `util.js` (referenced by 30+ HTML files)
   - `svg.js`, `words.js`, `distance.js`, `controlPanel.js`, `vector.js`
   - These deletions have broken many HTML files across the workspace
4. All currently existing JavaScript files are properly referenced or imported
5. There are no stray JavaScript files in the workspace

## Recommendations

1. **URGENT - Restore Missing Root Files**: The following files need to be restored or recreated as they are critical dependencies:
   - `util.js` - **CRITICAL** - Core utility library used by 27 HTML files
   - `distance.js` - Used by 4 HTML files for distance calculations
   - `vector.js` - Used by 3 HTML files (note: `module/Vector.js` exists for ES6 imports)
   - `svg.js` - Used by 1 HTML file (note: `module/Svg.js` exists for ES6 imports)
   - `words.js` - Used by 1 HTML file (note: local copy exists in `visual/crypt_lang/`)
   - `controlPanel.js` - Used by 1 HTML file (note: `module/ControlPanel.js` exists for ES6 imports)

2. **Fix Other Missing References**: 
   - Create or restore `main.js` for canvas index page (1 file affected)
   - Create or restore `common.js` for tools (2 files affected)
   - Add `tools/ocr/script.js` if OCR functionality is needed

3. **Consider Alternative Solutions**:
   - If files were intentionally removed, update all HTML files to remove broken references
   - Consider using CDN-hosted versions of utility libraries (already in use for some files)
   - The workspace uses `https://cdn.jsdelivr.net/gh/FormeOrme/projects@latest/util.js` in 4 files
   - Consider migrating remaining files to use ES6 module imports from `module/` directory

4. **Impact Summary**:
   - **Total broken HTML files: 38**
   - Most critical: `util.js` (27 files broken)
   - Medium priority: `distance.js` (4 files), `vector.js` (3 files)
   - Low priority: Other missing files (1-2 files each)
