import { Pre, Section, H1, Span } from "/module/Dom.js";
import { Svg, G } from "/module/Svg.js";
import ControlPanel from "/module/ControlPanel.js";

/**
 * Base class for 8-segment glyph rendering systems
 * Handles common UI, control panel, and rendering logic
 */
export class GlyphRenderer {
    // MARK: - Constructor
    constructor({ title, glyphMap, defaults, glyphCalculator }) {
        this.title = title;
        this.glyphMap = glyphMap;
        this.defaults = defaults;
        this.glyphCalculator = glyphCalculator; // Function that implements segment geometry
        this.namespace = "http://www.w3.org/2000/svg";

        this.controlPanel = null;
        this.input = null;
        this.output = null;
    }

    // MARK: - UI Creation

    /**
     * Initialize the control panel with default values
     */
    createControlPanel() {
        const d = this.defaults;
        this.controlPanel = new ControlPanel({
            id: "params",
            callback: () => this.updateOutput(),
        });

        // Only add controls for parameters that exist in defaults
        if (d.innerRadius !== undefined) {
            this.controlPanel.addRange({
                value: d.innerRadius,
                id: "innerRadius",
                label: "Inner Radius",
                min: 1,
                max: 25,
            });
        }

        if (d.lineLength !== undefined) {
            this.controlPanel.addRange({
                value: d.lineLength,
                id: "lineLength",
                label: "Line Length",
                min: 0,
                max: 50,
            });
        }

        if (d.maxGlyphsInRow !== undefined) {
            this.controlPanel.addRange({
                value: d.maxGlyphsInRow,
                id: "maxGlyphsInRow",
                label: "Max Glyphs in Row",
                min: 1,
                max: 30,
            });
        }

        if (d.zoom !== undefined) {
            this.controlPanel.addRange({
                value: d.zoom,
                id: "zoom",
                label: "Zoom",
                min: 0,
                max: 5,
                step: 0.5,
            });
        }

        if (d.lightStrokeWidth !== undefined) {
            this.controlPanel.addRange({
                value: d.lightStrokeWidth,
                id: "lightStrokeWidth",
                label: "Light Stroke Width",
                min: 0,
                max: 10,
                step: d.lightStrokeWidthStep || 1,
            });
        }

        if (d.darkStrokeWidth !== undefined) {
            this.controlPanel.addRange({
                value: d.darkStrokeWidth,
                id: "darkStrokeWidth",
                label: "Dark Stroke Width",
                min: 0,
                max: 10,
            });
        }

        if (d.horizontalKerning !== undefined) {
            this.controlPanel.addRange({
                value: d.horizontalKerning,
                id: "horizontalKerning",
                label: "Horizontal kerning",
                max: 100,
            });
        }

        if (d.verticalKerning !== undefined) {
            this.controlPanel.addRange({
                value: d.verticalKerning,
                id: "verticalKerning",
                label: "Vertical kerning",
                max: 200,
            });
        }

        if (d.lightColor !== undefined) {
            this.controlPanel.addColorPicker({
                value: d.lightColor,
                id: "lightColor",
                label: "Light Color",
            });
        }

        if (d.darkColor !== undefined) {
            this.controlPanel.addColorPicker({
                value: d.darkColor,
                id: "darkColor",
                label: "Dark Color",
            });
        }

        if (d.padding !== undefined) {
            this.controlPanel.addRange({
                value: d.padding,
                id: "padding",
                label: "Padding",
                min: 0,
                max: 20,
            });
        }

        return this.controlPanel;
    }

    /**
     * Create the text input element
     */
    createInput() {
        this.input = Pre.with({
            id: "input",
            class: "form-control font-monospace mt-2",
            editable: true,
            style: {
                "field-sizing": "content",
                //filter: "blur(2.9px)",
            },
            placeholder: "Text 1",
            event: { input: () => this.updateOutput() },
            text: this.defaults.text || "SPHINX OF   BLACK QUARTZJUDGE MY VOW",
        });

        return this.input;
    }

    /**
     * Create the SVG output element
     */
    createOutput() {
        this.output = Svg.with({
            namespace: this.namespace,
            attribute: {
                xmlns: this.namespace,
                version: "1.1",
                width: 600,
                height: 300,
            },
            id: "output",
        });

        return this.output;
    }

    /**
     * Build the complete UI structure
     */
    createUI() {
        const controlPanel = this.createControlPanel();
        const input = this.createInput();
        const output = this.createOutput();

        return Section.with({
            class: "container",
            children: [
                H1.with({ text: this.title }),
                Span.with({
                    class: "card card-body mt-2",
                    children: controlPanel.get(),
                }),
                input,
                Span.with({
                    class: "card overflow-hidden mt-2",
                    children: output,
                }),
            ],
        }).create();
    }

    // MARK: - Rendering

    /**
     * Update the SVG output when text or parameters change
     */
    updateOutput() {
        const args = this.controlPanel.values;
        const { maxGlyphsInRow, padding, horizontalKerning, verticalKerning, zoom } = args;
        const value = this.input.node.innerText.trim();

        this.output.node.innerHTML = "";
        this.output.node.style.zoom = zoom;

        const numberOfRows = Math.ceil(value.length / maxGlyphsInRow);
        this.output.node.setAttribute("width", horizontalKerning * maxGlyphsInRow + padding * 2);
        this.output.node.setAttribute("height", verticalKerning * numberOfRows + padding * 2);
        this.output.node.append(this.groupFrom(value, args).create({ namespace: this.namespace }));
    }

    /**
     * Create SVG groups for background and foreground layers
     */
    groupFrom(s, args) {
        const {
            darkStrokeWidth,
            lightStrokeWidth,
            horizontalKerning,
            verticalKerning,
            maxGlyphsInRow,
            padding,
            darkColor,
            lightColor,
        } = args;

        const background = G.with({
            attribute: { stroke: lightColor, "stroke-width": lightStrokeWidth },
        });
        const foreground = G.with({
            attribute: { stroke: darkColor, "stroke-width": darkStrokeWidth },
        });

        s.split("")
            .map((v, i) =>
                this.glyph({
                    args,
                    x: horizontalKerning * (i % maxGlyphsInRow) + padding,
                    y: verticalKerning * Math.floor(i / maxGlyphsInRow) + padding,
                    v: v,
                }),
            )
            .forEach(([bg, fg]) => {
                background.addChild(bg);
                foreground.addChild(fg);
            });

        return G.with({
            attribute: {
                "stroke-linecap": "round",
                "data-args": JSON.stringify(args),
            },
            children: [background, foreground],
        });
    }

    /**
     * Generate a single glyph using the provided calculator
     * Delegates to the specific glyph calculator implementation
     */
    glyph({ args, x, y, v }) {
        return this.glyphCalculator({
            glyphMap: this.glyphMap,
            args,
            x,
            y,
            v,
        });
    }

    // MARK: - Public Methods

    /**
     * Initialize and render the complete application
     */
    render() {
        document.body.append(this.createUI());
        this.updateOutput();
    }
}
