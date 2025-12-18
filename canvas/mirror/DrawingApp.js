// Drawing application module
class DrawingApp {
    constructor(canvasIds) {
        this.canvasIds = canvasIds;
        this.contexts = {};
        this.isDrawing = false;
        this.currentColor = "#000000";
        this.currentLineWidth = 20;

        this.init();
    }

    init() {
        this.setupCanvases();
        this.setupControls();
    }

    setupCanvases() {
        this.canvasIds.forEach((id) => {
            const canvas = document.getElementById(id);
            this.contexts[id] = canvas.getContext("2d");

            canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
            canvas.addEventListener("mousemove", (e) => this.draw(e));
            canvas.addEventListener("mouseup", () => this.stopDrawing());
            canvas.addEventListener("mouseout", () => this.stopDrawing());

            // Touch support
            canvas.addEventListener("touchstart", (e) => this.handleTouch(e));
            canvas.addEventListener("touchmove", (e) => this.handleTouch(e));
            canvas.addEventListener("touchend", () => this.stopDrawing());

            // Create grid overlay
            // this.createGridOverlay(canvas);
        });
    }

    createGridOverlay(canvas) {
        const overlay = document.createElement("canvas");
        overlay.width = canvas.width;
        overlay.height = canvas.height;
        overlay.className = "grid-overlay";

        const ctx = overlay.getContext("2d");
        const gridSize = 20;

        ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
        ctx.lineWidth = 1;

        // Draw vertical lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Insert overlay before the canvas so it appears below
        canvas.parentElement.style.position = "relative";
        canvas.parentElement.insertBefore(overlay, canvas);
    }

    setupControls() {
        // Color picker
        const colorPicker = document.getElementById("colorPicker");
        if (colorPicker) {
            colorPicker.addEventListener("change", (e) => {
                this.currentColor = e.target.value;
            });
        }

        // Line width
        const lineWidthInput = document.getElementById("lineWidth");
        const widthValue = document.getElementById("widthValue");
        if (lineWidthInput && widthValue) {
            lineWidthInput.addEventListener("input", (e) => {
                this.currentLineWidth = e.target.value;
                widthValue.textContent = this.currentLineWidth;
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

    startDrawing(e) {
        this.isDrawing = true;
        const canvas = e.target;
        const ctx = this.contexts[canvas.id];
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const canvas = e.target;
        const ctx = this.contexts[canvas.id];
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.strokeStyle = this.currentColor;
        ctx.lineWidth = this.currentLineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.lineTo(x, y);
        ctx.stroke();
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
        e.target.dispatchEvent(mouseEvent);
    }

    clearCanvas(canvasId) {
        const canvas = document.getElementById(canvasId);
        const ctx = this.contexts[canvasId];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    clearAll() {
        this.canvasIds.forEach((id) => this.clearCanvas(id));
    }
}

// Export for module usage
export default DrawingApp;
