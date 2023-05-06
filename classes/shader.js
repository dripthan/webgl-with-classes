
/* handles everything shader related */

class Shader {

  constructor(vsSource, fsSource) {
    this.program = gl.createProgram();
    this.addShader(gl.VERTEX_SHADER, vsSource);
    this.addShader(gl.FRAGMENT_SHADER, fsSource);
    this.link();
  }

  addShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.log(gl.getShaderInfoLog(shader));
    gl.attachShader(this.program, shader);
    gl.deleteShader(shader);
  }

  link() {
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) console.log(gl.getProgramInfoLog(this.program));
  }

  bind() { gl.useProgram(this.program); }

  unbind() { gl.useProgram(null); }

  setMatrix(name, value) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniformMatrix4fv(location, false, value);
  }
}