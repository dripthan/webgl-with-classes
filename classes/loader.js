
/* loads models (VAOs) and their attributes */

class Loader {

  constructor() {}

  loadVAO(positions, indices) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    this.loadVBO(0, 2, positions, false);
    const modelMatrixBuffer = this.loadMatrixAttrib(1);
    gl.bindVertexArray(null);
    const ebo = this.loadEBO(indices);
    return new Model(vao, ebo, indices.length, modelMatrixBuffer);
  }

  loadVBO(location, size, data, normalized) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(location, size, gl.FLOAT, normalized, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
  }

  loadMatrixAttrib(location) {
    const matrixVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, matrixVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(), gl.DYNAMIC_DRAW);
    for (let i = 0; i < 4; i++) {
      gl.vertexAttribPointer(location + i, 4, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 16, Float32Array.BYTES_PER_ELEMENT * 4 * i);
      gl.vertexAttribDivisor(location + i, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return matrixVBO;
  }

  loadVectorAttrib(location) {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(location, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  }

  loadEBO(data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return buffer;
  }
}