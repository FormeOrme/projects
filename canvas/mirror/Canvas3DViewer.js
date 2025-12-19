import { WebGLUtils, Mat4 } from "./WebGLUtils.js";

const { PI, max, min } = Math;

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
        this.autoRotateSpeed = { x: 0.001, y: 0 };
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

        this.program = WebGLUtils.createProgram(gl, vsSource, fsSource);
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

    setupGeometry() {
        const gl = this.gl;

        // Create 12 planes total: 4 tiles for each of the 3 orientations
        this.planes = [];

        const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

        const tilesXZ = [
            new TileData([-0.5, -0.5], PI, true), // Top-left
            new TileData([0.5, -0.5], PI, false), // Top-right
            new TileData([-0.5, 0.5], 0, false), // Bottom-left
            new TileData([0.5, 0.5], 0, true), // Bottom-right
        ];

        // Create XZ plane tiles (for canvas1) - horizontal plane
        for (const tileData of tilesXZ) {
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

        const tilesXY = [
            new TileData([-0.5, -0.5], 0, true), // Bottom-left
            new TileData([-0.5, 0.5], 0, false), // Top-left
            new TileData([0.5, 0.5], PI, false), // Top-right
            new TileData([0.5, -0.5], PI, true), // Bottom-right
        ];

        // Create XY plane tiles (for canvas2) - vertical plane facing front
        for (const tileData of tilesXY) {
            const vertices2 = [
                ...[-0.5, -0.5, 0.0, 0, tileData.flip ? 0 : 1], // Bottom-left
                ...[+0.5, -0.5, 0.0, 1, tileData.flip ? 0 : 1], // Bottom-right
                ...[+0.5, +0.5, 0.0, 1, tileData.flip ? 1 : 0], // Top-right
                ...[-0.5, +0.5, 0.0, 0, tileData.flip ? 1 : 0], // Top-left
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

        const tilesYZ = [
            new TileData([-0.5, -0.5], 0, true), // Bottom-left
            new TileData([-0.5, 0.5], 0, false), // Top-left
            new TileData([0.5, 0.5], PI, false), // Top-right
            new TileData([0.5, -0.5], PI, true), // Bottom-right
        ];

        // Create YZ plane tiles (for canvas3) - vertical plane facing side
        for (const tileData of tilesYZ) {
            const vertices2 = [
                ...[0.0, -0.5, -0.5, 0, tileData.flip ? 0 : 1], // Bottom-left
                ...[0.0, -0.5, +0.5, 1, tileData.flip ? 0 : 1], // Bottom-right
                ...[0.0, +0.5, +0.5, 1, tileData.flip ? 1 : 0], // Top-right
                ...[0.0, +0.5, -0.5, 0, tileData.flip ? 1 : 0], // Top-left
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
        this.textures = this.sourceCanvasIds.map((canvasId) =>
            WebGLUtils.createTexture(this.gl, canvasId),
        );
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
        this.zoom = max(2, min(20, this.zoom));
    }

    updateTextures() {
        this.textures.forEach(({ texture, canvasId }) => {
            WebGLUtils.updateTexture(this.gl, texture, canvasId);
        });
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
        const projectionMatrix = Mat4.create();
        const aspect = this.canvas.width / this.canvas.height;
        Mat4.perspective(projectionMatrix, PI / 4, aspect, 0.1, 100.0);

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

            const modelViewMatrix = Mat4.create();
            Mat4.identity(modelViewMatrix);

            // Move camera back to see the planes
            Mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -this.zoom]);

            // Apply global rotation
            Mat4.rotateX(modelViewMatrix, modelViewMatrix, this.rotation.x);
            Mat4.rotateY(modelViewMatrix, modelViewMatrix, this.rotation.y);

            // Position each tile based on plane type
            if (plane.planeType === "xz") {
                // XZ plane: translate in X and Z
                Mat4.translate(modelViewMatrix, modelViewMatrix, [
                    plane.tilePosition[0],
                    0,
                    plane.tilePosition[1],
                ]);
            } else if (plane.planeType === "xy") {
                // XY plane: translate in X and Y
                Mat4.translate(modelViewMatrix, modelViewMatrix, [
                    plane.tilePosition[0],
                    plane.tilePosition[1],
                    0,
                ]);
            } else if (plane.planeType === "yz") {
                // YZ plane: translate in Y and Z
                Mat4.translate(modelViewMatrix, modelViewMatrix, [
                    0,
                    plane.tilePosition[1],
                    plane.tilePosition[0],
                ]);
            }

            // Apply individual plane rotation around Y axis
            Mat4.rotateY(modelViewMatrix, modelViewMatrix, plane.rotation);

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
        if (!this.isDragging) {
            this.rotation.x += this.autoRotateSpeed.x;
            this.rotation.y += this.autoRotateSpeed.y;
        }
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}

export default Canvas3DViewer;
