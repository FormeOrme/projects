const { random, floor, min, PI } = Math;

// CanvasManager - manages a single canvas
class CanvasManager {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.isDrawing = false;

        this.setupEventListeners();
        this.drawInitialArcs();
    }

    setupEventListeners() {
        this.canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
        this.canvas.addEventListener("mousemove", (e) => this.draw(e));
        this.canvas.addEventListener("mouseup", () => this.stopDrawing());
        this.canvas.addEventListener("mouseout", () => this.stopDrawing());

        // Touch support
        this.canvas.addEventListener("touchstart", (e) => this.handleTouch(e));
        this.canvas.addEventListener("touchmove", (e) => this.handleTouch(e));
        this.canvas.addEventListener("touchend", () => this.stopDrawing());
    }

    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type === "touchstart" ? "mousedown" : "mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        this.canvas.dispatchEvent(mouseEvent);
    }

    setDrawingStyle(color, lineWidth) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
    }

    drawInitialArcs() {
        const centerX = this.canvas.width;
        const centerY = this.canvas.height;

        // Draw 5-10 random arcs
        const numArcs = floor(random() * 2) + 3;

        for (let i = 0; i < numArcs; i++) {
            const radius = floor(random() * min(this.canvas.width, this.canvas.height) * 0.8);
            const startAngle = random() * PI * 2;
            const endAngle = startAngle + (random() * PI * 1.5 + PI * 0.5);
            const lineWidth = random() * 15 + 5;

            // Random color
            const hue = random() * 360;
            const saturation = 100;
            const lightness = 70;

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            this.ctx.lineWidth = lineWidth;
            this.ctx.lineCap = "round";
            this.ctx.stroke();
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    createGridOverlay() {
        const overlay = document.createElement("canvas");
        overlay.width = this.canvas.width;
        overlay.height = this.canvas.height;
        overlay.className = "grid-overlay";

        const ctx = overlay.getContext("2d");
        const gridSize = 20;

        ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
        ctx.lineWidth = 1;

        // Draw vertical lines
        for (let x = 0; x <= this.canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.canvas.height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= this.canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.canvas.width, y);
            ctx.stroke();
        }

        // Insert overlay before the canvas so it appears below
        this.canvas.parentElement.style.position = "relative";
        this.canvas.parentElement.insertBefore(overlay, this.canvas);
    }
}

// Drawing application module
class DrawingApp {
    constructor(canvasIds) {
        this.canvasManagers = [];
        this.currentColor = "#000000";
        this.currentLineWidth = 20;

        this.init(canvasIds);
    }

    init(canvasIds) {
        this.setupCanvases(canvasIds);
        this.setupControls();
    }

    setupCanvases(canvasIds) {
        canvasIds.forEach((id) => {
            const manager = new CanvasManager(id);
            manager.setDrawingStyle(this.currentColor, this.currentLineWidth);
            this.canvasManagers.push(manager);
        });
    }

    setupControls() {
        // Color picker
        const colorPicker = document.getElementById("colorPicker");
        if (colorPicker) {
            colorPicker.addEventListener("change", (e) => {
                this.currentColor = e.target.value;
                this.updateAllCanvasStyles();
            });
        }

        // Line width
        const lineWidthInput = document.getElementById("lineWidth");
        const widthValue = document.getElementById("widthValue");
        if (lineWidthInput && widthValue) {
            lineWidthInput.addEventListener("input", (e) => {
                this.currentLineWidth = e.target.value;
                widthValue.textContent = this.currentLineWidth;
                this.updateAllCanvasStyles();
            });
        }

        // Clear all button
        const clearAllBtn = document.getElementById("clearAll");
        if (clearAllBtn) {
            clearAllBtn.addEventListener("click", () => {
                this.clearAll();
            });
        }
    }

    updateAllCanvasStyles() {
        this.canvasManagers.forEach((manager) => {
            manager.setDrawingStyle(this.currentColor, this.currentLineWidth);
        });
    }

    clearAll() {
        this.canvasManagers.forEach((manager) => manager.clear());
    }
}

// Export for module usage
export default DrawingApp;
