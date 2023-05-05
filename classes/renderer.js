
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

  renderEntities(entities, model) {
    gl.bindVertexArray(model[0]);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model[1]);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.enableVertexAttribArray(2);
    gl.enableVertexAttribArray(3);
    gl.enableVertexAttribArray(4);

    const matrixData = new Float32Array(16 * entities.length);
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < 16; j++) {
        matrixData[16 * i + j] = entities[i].getModel()[j];
      }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, model[3]);
    gl.bufferData(gl.ARRAY_BUFFER, matrixData, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, entities.length);

    gl.disableVertexAttribArray(4);
    gl.disableVertexAttribArray(3);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(1);
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