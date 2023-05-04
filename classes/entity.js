
/* an object in space with specific attributes */

class Entity {

  constructor(x, y, rot, scale, color, dir, mag, vrot, vscale, dcolor, ddir, dmag) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.scale = scale;
    this.color = color;
    this.dir = dir;
    this.mag = mag;
    this.vrot = vrot;
    this.vscale = vscale;
    this.dcolor = dcolor;
    this.ddir = ddir;
    this.dmag = dmag;
  }

  getModel() {
    this.x += this.mag * Math.cos(this.dir);
    this.y += this.mag * Math.sin(this.dir);
    this.rot += this.vrot;
    this.scale += this.vscale;
    this.color += this.dcolor;
    this.dir += this.ddir;
    this.mag += this.dmag;
    const m = glMatrix.mat4.create();
    glMatrix.mat4.translate(m, m, [this.x, this.y, 0]);
    glMatrix.mat4.rotate(m, m, 0, [1, 0, 0]);
    glMatrix.mat4.rotate(m, m, 0, [0, 1, 0]);
    glMatrix.mat4.rotate(m, m, this.rot, [0, 0, 1]);
    glMatrix.mat4.scale(m, m, [this.scale, this.scale, this.scale]);
    return m;
  }

  getColor() {
    const s = 1;
    const l = 0.5;
    const k = n => (n + this.color / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)];
  }
}