
/* an object in space with specific attributes */

class Entity {

  constructor(position, rotation, scale, velocity, spin, grow, acceleration) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.velocity = velocity;
    this.spin = spin;
    this.grow = grow;
    this.acceleration = acceleration;
    this.model = glMatrix.mat4.create();
  }

  tick() {
    glMatrix.vec3.add(this.velocity, this.velocity, this.acceleration);
    glMatrix.vec3.add(this.position, this.position, this.velocity);
    glMatrix.vec3.add(this.rotation, this.rotation, this.spin);
    glMatrix.vec3.add(this.scale, this.scale, this.grow);
  }

  getModel() {
    glMatrix.mat4.identity(this.model);
    glMatrix.mat4.translate(this.model, this.model, this.position);
    glMatrix.mat4.rotate(this.model, this.model, this.rotation[0], [1, 0, 0]);
    glMatrix.mat4.rotate(this.model, this.model, this.rotation[1], [0, 1, 0]);
    glMatrix.mat4.rotate(this.model, this.model, this.rotation[2], [0, 0, 1]);
    glMatrix.mat4.scale(this.model, this.model, this.scale);
    return this.model;
  }
}