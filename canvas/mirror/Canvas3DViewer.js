const { PI } = Math;

class TileData {
    constructor(tilePos, rotation, flip) {
        this.tilePos = tilePos;
        this.rotation = rotation;
        this.flip = flip;
    }
}

// 3D Canvas Viewer using WebGL
class Canvas3DViewer {
    constructor(canvasId, sourceCanvasIds) {
        this.canvas = document.getElementById(canvasId);
        this.sourceCanvasIds = sourceCanvasIds;
        this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");

        if (!this.gl) {
            console.error("WebGL not supported");
            return;
        }

        this.rotation = { x: 0.3, y: 0.3 };
        this.isDragging = false;
        this.lastMouse = { x: 0, y: 0 };
        this.zoom = 5.0; // Camera distance

        this.init();
    }

    init() {
        this.setupShaders();
        this.setupGeometry();
        this.setupTextures();
        this.setupEventListeners();
        this.animate();
    }

    setupShaders() {
        const gl = this.gl;

        // Vertex shader
        const vsSource = `
            attribute vec3 aPosition;
            attribute vec2 aTexCoord;
            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;
            varying vec2 vTexCoord;
            
            void main() {
                gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
                vTexCoord = aTexCoord;
            }
        `;

        // Fragment shader
        const fsSource = `
            precision mediump float;
            varying vec2 vTexCoord;
            uniform sampler2D uSampler;
            
            void main() {
                vec4 texColor = texture2D(uSampler, vTexCoord);
                gl_FragColor = texColor;
            }
        `;

        const vertexShader = this.compileShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, fsSource);

        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(this.program));
        }

        gl.useProgram(this.program);

        // Get attribute and uniform locations
        this.programInfo = {
            attribLocations: {
                position: gl.getAttribLocation(this.program, "aPosition"),
                texCoord: gl.getAttribLocation(this.program, "aTexCoord"),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(this.program, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(this.program, "uModelViewMatrix"),
                sampler: gl.getUniformLocation(this.program, "uSampler"),
            },
        };
    }

    compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    setupGeometry() {
        const gl = this.gl;

        // Create 12 planes total: 4 tiles for each of the 3 orientations
        this.planes = [];

        const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

        const tiles = [
            new TileData([-0.5, -0.5], PI, true), // Top-left
            new TileData([0.5, -0.5], PI, false), // Top-right
            new TileData([-0.5, 0.5], 0, false), // Bottom-left
            new TileData([0.5, 0.5], 0, true), // Bottom-right
        ];

        // Create XZ plane tiles (for canvas1) - horizontal plane
        for (const tileData of tiles) {
            const vertices2 = [
                ...[-0.5, 0.0, -0.5, tileData.flip ? 1 : 0, 1], // Bottom-left
                ...[+0.5, 0.0, -0.5, tileData.flip ? 0 : 1, 1], // Bottom-right
                ...[+0.5, 0.0, +0.5, tileData.flip ? 0 : 1, 0], // Top-right
                ...[-0.5, 0.0, +0.5, tileData.flip ? 1 : 0, 0], // Top-left
            ];

            const vertices = new Float32Array(vertices2);

            const vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            const indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

            this.planes.push({
                vertexBuffer,
                indexBuffer,
                indexCount: indices.length,
                textureIndex: 0, // canvas1
                tilePosition: tileData.tilePos,
                rotation: tileData.rotation,
                planeType: "xz",
            });
        }

        // Create XY plane tiles (for canvas2) - vertical plane facing front
        for (const tileData of tiles) {
            const vertices2 = [
                ...[-0.5, -0.5, 0.0, tileData.flip ? 1 : 0, 1], // Bottom-left
                ...[+0.5, -0.5, 0.0, tileData.flip ? 0 : 1, 1], // Bottom-right
                ...[+0.5, +0.5, 0.0, tileData.flip ? 0 : 1, 0], // Top-right
                ...[-0.5, +0.5, 0.0, tileData.flip ? 1 : 0, 0], // Top-left
            ];

            const vertices = new Float32Array(vertices2);

            const vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            const indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

            this.planes.push({
                vertexBuffer,
                indexBuffer,
                indexCount: indices.length,
                textureIndex: 1, // canvas2
                tilePosition: tileData.tilePos,
                rotation: tileData.rotation,
                planeType: "xy",
            });
        }

        // Create YZ plane tiles (for canvas3) - vertical plane facing side
        for (const tileData of tiles) {
            const vertices2 = [
                ...[0.0, -0.5, -0.5, tileData.flip ? 1 : 0, 1], // Bottom-left
                ...[0.0, -0.5, +0.5, tileData.flip ? 0 : 1, 1], // Bottom-right
                ...[0.0, +0.5, +0.5, tileData.flip ? 0 : 1, 0], // Top-right
                ...[0.0, +0.5, -0.5, tileData.flip ? 1 : 0, 0], // Top-left
            ];

            const vertices = new Float32Array(vertices2);

            const vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            const indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

            this.planes.push({
                vertexBuffer,
                indexBuffer,
                indexCount: indices.length,
                textureIndex: 2, // canvas3
                tilePosition: tileData.tilePos,
                rotation: tileData.rotation,
                planeType: "yz",
            });
        }
    }

    setupTextures() {
        const gl = this.gl;

        // Create textures for all three canvases
        this.textures = [];

        this.sourceCanvasIds.forEach((canvasId) => {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);

            // Set texture parameters
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            this.textures.push({ texture, canvasId });
        });
    }

    setupEventListeners() {
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this.canvas.addEventListener("mouseup", () => this.onMouseUp());
        this.canvas.addEventListener("mouseleave", () => this.onMouseUp());
        this.canvas.addEventListener("wheel", (e) => this.onWheel(e));
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.lastMouse = { x: e.clientX, y: e.clientY };
    }

    onMouseMove(e) {
        if (!this.isDragging) return;

        const dx = e.clientX - this.lastMouse.x;
        const dy = e.clientY - this.lastMouse.y;

        this.rotation.y += dx * 0.01;
        this.rotation.x += dy * 0.01;

        this.lastMouse = { x: e.clientX, y: e.clientY };
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onWheel(e) {
        e.preventDefault();
        const delta = e.deltaY * 0.01;
        this.zoom += delta;
        // Clamp zoom between 2 and 20
        this.zoom = Math.max(2, Math.min(20, this.zoom));
    }

    updateTextures() {
        const gl = this.gl;

        this.textures.forEach(({ texture, canvasId }) => {
            const sourceCanvas = document.getElementById(canvasId);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
        });
    }

    createMatrix4() {
        return new Float32Array(16);
    }

    perspective(out, fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = (far + near) / (near - far);
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = (2 * far * near) / (near - far);
        out[15] = 0;
        return out;
    }

    identity(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    }

    translate(out, a, v) {
        const x = v[0],
            y = v[1],
            z = v[2];
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        for (let i = 0; i < 12; i++) out[i] = a[i];
        return out;
    }

    rotateX(out, a, rad) {
        const s = Math.sin(rad),
            c = Math.cos(rad);
        const a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];
        const a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];

        for (let i = 0; i < 4; i++) out[i] = a[i];
        for (let i = 12; i < 16; i++) out[i] = a[i];

        out[4] = a10 * c + a20 * s;
        out[5] = a11 * c + a21 * s;
        out[6] = a12 * c + a22 * s;
        out[7] = a13 * c + a23 * s;
        out[8] = a20 * c - a10 * s;
        out[9] = a21 * c - a11 * s;
        out[10] = a22 * c - a12 * s;
        out[11] = a23 * c - a13 * s;
        return out;
    }

    rotateY(out, a, rad) {
        const s = Math.sin(rad),
            c = Math.cos(rad);
        const a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        const a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];

        for (let i = 4; i < 8; i++) out[i] = a[i];
        for (let i = 12; i < 16; i++) out[i] = a[i];

        out[0] = a00 * c - a20 * s;
        out[1] = a01 * c - a21 * s;
        out[2] = a02 * c - a22 * s;
        out[3] = a03 * c - a23 * s;
        out[8] = a00 * s + a20 * c;
        out[9] = a01 * s + a21 * c;
        out[10] = a02 * s + a22 * c;
        out[11] = a03 * s + a23 * c;
        return out;
    }

    rotateZ(out, a, rad) {
        const s = Math.sin(rad),
            c = Math.cos(rad);
        const a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        const a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];

        for (let i = 8; i < 16; i++) out[i] = a[i];

        out[0] = a00 * c + a10 * s;
        out[1] = a01 * c + a11 * s;
        out[2] = a02 * c + a12 * s;
        out[3] = a03 * c + a13 * s;
        out[4] = a10 * c - a00 * s;
        out[5] = a11 * c - a01 * s;
        out[6] = a12 * c - a02 * s;
        out[7] = a13 * c - a03 * s;
        return out;
    }

    multiply(out, a, b) {
        const a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        const a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];
        const a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
        const a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];

        let b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    }

    render() {
        const gl = this.gl;

        const color = 0.9;

        gl.clearColor(color, color, color, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.depthMask(false); // Disable depth writes for proper transparency

        // Enable blending for transparency
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Update textures from source canvases
        this.updateTextures();

        // Set up projection matrix
        const projectionMatrix = this.createMatrix4();
        const aspect = this.canvas.width / this.canvas.height;
        this.perspective(projectionMatrix, Math.PI / 4, aspect, 0.1, 100.0);

        gl.uniformMatrix4fv(
            this.programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix,
        );

        // Render each plane with its corresponding texture
        this.planes.forEach((plane) => {
            // Bind the texture for this plane
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.textures[plane.textureIndex].texture);
            gl.uniform1i(this.programInfo.uniformLocations.sampler, 0);

            const modelViewMatrix = this.createMatrix4();
            this.identity(modelViewMatrix);

            // Move camera back to see the planes
            this.translate(modelViewMatrix, modelViewMatrix, [0, 0, -this.zoom]);

            // Apply global rotation
            this.rotateX(modelViewMatrix, modelViewMatrix, this.rotation.x);
            this.rotateY(modelViewMatrix, modelViewMatrix, this.rotation.y);

            // Position each tile based on plane type
            if (plane.planeType === "xz") {
                // XZ plane: translate in X and Z
                this.translate(modelViewMatrix, modelViewMatrix, [
                    plane.tilePosition[0],
                    0,
                    plane.tilePosition[1],
                ]);
            } else if (plane.planeType === "xy") {
                // XY plane: translate in X and Y
                this.translate(modelViewMatrix, modelViewMatrix, [
                    plane.tilePosition[0],
                    plane.tilePosition[1],
                    0,
                ]);
            } else if (plane.planeType === "yz") {
                // YZ plane: translate in Y and Z
                this.translate(modelViewMatrix, modelViewMatrix, [
                    0,
                    plane.tilePosition[1],
                    plane.tilePosition[0],
                ]);
            }

            // Apply individual plane rotation around Y axis
            this.rotateY(modelViewMatrix, modelViewMatrix, plane.rotation);

            gl.uniformMatrix4fv(
                this.programInfo.uniformLocations.modelViewMatrix,
                false,
                modelViewMatrix,
            );

            // Bind vertex buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, plane.vertexBuffer);

            const stride = 5 * 4; // 5 floats per vertex, 4 bytes per float
            gl.vertexAttribPointer(
                this.programInfo.attribLocations.position,
                3,
                gl.FLOAT,
                false,
                stride,
                0,
            );
            gl.enableVertexAttribArray(this.programInfo.attribLocations.position);

            gl.vertexAttribPointer(
                this.programInfo.attribLocations.texCoord,
                2,
                gl.FLOAT,
                false,
                stride,
                3 * 4,
            );
            gl.enableVertexAttribArray(this.programInfo.attribLocations.texCoord);

            // Draw
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, plane.indexBuffer);
            gl.drawElements(gl.TRIANGLES, plane.indexCount, gl.UNSIGNED_SHORT, 0);
        });
    }

    animate() {
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}

export default Canvas3DViewer;
