
/* handles everything shader related */

class Program {

  constructor(vsSource, fsSource) {
    this.id = gl.createProgram();
    this.addShader(gl.VERTEX_SHADER, vsSource);
    this.addShader(gl.FRAGMENT_SHADER, fsSource);
    this.link();
  }

  addShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.log(gl.getShaderInfoLog(shader));
    gl.attachShader(this.id, shader);
    gl.deleteShader(shader);
  }

  link() {
    gl.linkProgram(this.id);
    if (!gl.getProgramParameter(this.id, gl.LINK_STATUS)) console.log(gl.getProgramInfoLog(this.id));
  }

  bind() { gl.useProgram(this.id); }

  bindAttribs() {
    gl.enableVertexAttribArray(gl.getAttribLocation(this.id, 'vPosition'));
    gl.enableVertexAttribArray(gl.getAttribLocation(this.id, 'vColor'));
  }

  unbindAttribs() {
    gl.disableVertexAttribArray(gl.getAttribLocation(this.id, 'vPosition'));
    gl.disableVertexAttribArray(gl.getAttribLocation(this.id, 'vColor'));
  }

  unbind() { gl.useProgram(null); }

  getID() { return this.id; }
}