
/* draws all entities in the scene */

class Renderer {

  constructor() {
    this.fov = 60.0;
    this.zNear = 0.001;
    this.zFar = 1000.0;
    this.position = [0, 0, 5]
    this.direction = [0, 0, 0];
    this.up = [0, 1, 0];
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  prepareFrame() {
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  renderEntities(entities, model, shader) {
    gl.bindVertexArray(model[0]);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model[1]);
    gl.enableVertexAttribArray(0);

    entities.forEach(e => {
      shader.setMatrix('model', e.getModel());
      gl.drawElements(gl.TRIANGLES, model[2], gl.UNSIGNED_SHORT, 0);
    });

    gl.disableVertexAttribArray(0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  getProjView() {
    const proj = glMatrix.mat4.create();
    const view = glMatrix.mat4.create();
    const prod = glMatrix.mat4.create();
    glMatrix.mat4.perspective(proj, this.fov * Math.PI / 180, innerWidth / innerHeight, this.zNear, this.zFar);
    glMatrix.mat4.lookAt(view, this.position, this.direction, this.up);
    glMatrix.mat4.mul(prod, proj, view);
    return prod;
  }
}