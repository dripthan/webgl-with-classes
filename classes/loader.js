
/* loads models (VAOs) and their attributes */

class Loader {

  constructor() {}

  loadVAO(positions, indices) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    this.loadVBO(0, 2, positions, false);
    gl.bindVertexArray(null);
    const ebo = this.loadEBO(indices);
    return [vao, ebo, indices.length];
  }

  loadVBO(location, size, data, normalized) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(location, size, gl.FLOAT, normalized, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
  }

  loadEBO(data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return buffer;
  }
}