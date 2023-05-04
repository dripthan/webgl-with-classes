
/* an object in space with specific attributes */

class Entity {

  constructor(position, rotation, scale, velocity, spin, grow) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.velocity = velocity;
    this.spin = spin;
    this.grow = grow;
  }

  getModel() {
    glMatrix.vec3.add(this.position, this.position, this.velocity);
    glMatrix.vec3.add(this.rotation, this.rotation, this.spin);
    glMatrix.vec3.add(this.scale, this.scale, this.grow);
    const m = glMatrix.mat4.create();
    glMatrix.mat4.translate(m, m, this.position);
    glMatrix.mat4.rotate(m, m, this.rotation[0], [1, 0, 0]);
    glMatrix.mat4.rotate(m, m, this.rotation[1], [0, 1, 0]);
    glMatrix.mat4.rotate(m, m, this.rotation[2], [0, 0, 1]);
    glMatrix.mat4.scale(m, m, this.scale);
    return m;
  }
}