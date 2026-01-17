// WebGLShader.js
// A class to manage WebGL shaders using WebGLRenderer
// Usage: const shader = new WebGLShader(gl, vertexSrc, fragmentSrc);

/**
 * Default vertex shader source code.
 * It defines a simple passthrough shader that sets gl_Position based on the input attribute `a_position`.
 * @type {string}
 */
const vertexSrcDefault = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}`;

export class WebGLShader {
    constructor({ canvas, fragmentSource, vertexSource = vertexSrcDefault, parameters = {} }) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");
        if (!this.gl) {
            throw new Error("WebGL not supported");
        }
        this.program = this.createProgram(vertexSource, fragmentSource);
        this.use();
        this.initQuad();
        this.setParameters(parameters);
    }

    initQuad() {
        // Set up geometry (full screen quad)
        const gl = this.gl;
        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        const posLoc = this.getAttribLocation("a_position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    }

    setParameters(params) {
        const gl = this.gl;
        gl.clearColor(0, 0, 0, 1);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        for (const [key, value] of Object.entries(params)) {
            const loc = this.getUniformLocation(key);
            if (loc === null) continue;
            if (typeof value === "number") {
                gl.uniform1f(loc, value);
            } else if (Array.isArray(value)) {
                if (value.length === 2) gl.uniform2f(loc, value[0], value[1]);
                else if (value.length === 3) gl.uniform3f(loc, value[0], value[1], value[2]);
                else if (value.length === 4)
                    gl.uniform4f(loc, value[0], value[1], value[2], value[3]);
            }
        }
    }

    animate() {
        const gl = this.gl;
        const shader = this;
        function render(time) {
            gl.viewport(0, 0, shader.canvas.width, shader.canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(shader.program);
            const uTime = shader.getUniformLocation("u_time");
            if (uTime) gl.uniform1f(uTime, time * 0.001);
            const uResolution = shader.getUniformLocation("u_resolution");
            if (uResolution) gl.uniform2f(uResolution, shader.canvas.width, shader.canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const info = this.gl.getShaderInfoLog(shader);
            this.gl.deleteShader(shader);
            throw new Error("Could not compile shader:\n" + info);
        }
        return shader;
    }

    createProgram(vertexSource, fragmentSource) {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const info = this.gl.getProgramInfoLog(program);
            this.gl.deleteProgram(program);
            throw new Error("Could not link program:\n" + info);
        }
        return program;
    }

    use() {
        this.gl.useProgram(this.program);
    }

    getAttribLocation(name) {
        return this.gl.getAttribLocation(this.program, name);
    }

    getUniformLocation(name) {
        return this.gl.getUniformLocation(this.program, name);
    }
}
