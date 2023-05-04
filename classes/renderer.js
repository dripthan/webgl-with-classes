
/* draws all entities in the scene */

class Renderer {

  constructor() {

    // render settings
    this.fov = 60.0;
    this.zNear = 0.001;
    this.zFar = 1000.0;

    // camera settings
    this.position = [0, 0, 1]
    this.direction = [0, 0, 0];
    this.up = [0, 1, 0];

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  prepareFrame() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  renderEntities(entities, model, shader) {
    gl.bindVertexArray(model[0]);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model[1]);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);

    entities.forEach(e => {
      shader.setMatrix('model', e.getModel());
      gl.drawElements(gl.TRIANGLES, model[2], gl.UNSIGNED_SHORT, 0);
    });
    
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  getProj() {
    const m = glMatrix.mat4.create();
    // glMatrix.mat4.ortho(m, -1.0, 1.0, -1.0, 1.0, this.zNear, this.zFar);
    glMatrix.mat4.perspective(m, this.fov * Math.PI / 180, innerWidth / innerHeight, this.zNear, this.zFar);
    return m;
  }

  getView() {
    const m = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(m, this.position, this.direction, this.up);
    return m;
  }
}