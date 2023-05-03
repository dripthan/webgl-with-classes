
/* loads models (VAOs) and their attributes */

class Loader {

  constructor(program) {
    this.program = program;
  }

  loadVAO(positions, colors) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    this.loadBuffer(positions, 3, 'vPosition');
    this.loadBuffer(colors, 3, 'vColor');
    gl.bindVertexArray(null);
    return vao;
  }

  loadBuffer(data, size, location) {
    const attribLoc = gl.getAttribLocation(this.program, location);
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.enableVertexAttribArray(attribLoc);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(attribLoc, size, gl.FLOAT, false, 0, 0);
    gl.disableVertexAttribArray(attribLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
}