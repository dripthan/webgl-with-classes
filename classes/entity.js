
/* an object in space with specific attributes */

class Entity {

  constructor(x, y, rot, scale) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.scale = scale;
  }

  getModel() {
    const m = glMatrix.mat4.create();
    glMatrix.mat4.translate(m, m, [this.x, this.y, 0]);
    glMatrix.mat4.rotate(m, m, 0, [1, 0, 0]);
    glMatrix.mat4.rotate(m, m, 0, [0, 1, 0]);
    glMatrix.mat4.rotate(m, m, this.rot, [0, 0, 1]);
    glMatrix.mat4.scale(m, m, [this.scale, this.scale, this.scale]);
    return m;
  }
}