
// shader code

const vsSource = `#version 300 es

layout(location = 0) in vec2 vPosition;

uniform mat4 projView;
uniform mat4 model;

void main()
{
  gl_Position = projView * model * vec4(vPosition, 0.0, 1.0);
  gl_PointSize = 10.0;
}

`;

const fsSource = `#version 300 es

precision highp float;

out vec4 outColor;

uniform vec3 quadColor;

void main()
{
  outColor = vec4(quadColor, 1.0);
}

`;

// primative quad attributes

const quadPositions = [
   0.5,  0.5,
   0.5, -0.5,
  -0.5, -0.5,
  -0.5,  0.5
];

const quadIndices = [
  0, 1, 2,
  0, 2, 3
];

// variables

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
const mouse = { x: 0, y: 0, down: false };
const shader = new Shader(vsSource, fsSource);
const loader = new Loader();
const renderer = new Renderer();
const quad = loader.loadVAO(quadPositions, quadIndices);
const entities = [];

// loop

const loop = () => {

  if (mouse.down) {
    for (let i = 0; i < 50; i++) {
      entities.push(new Entity(
        mouse.x,
        mouse.y,
        0,
        0.25,
        Date.now() * 0.05,
        Math.random() * Math.PI * 2,
        Math.random() * 0.1,
        (Math.random() - 0.5) * 0.5,
        Math.random() * -0.01 - 0.0025,
        2,
        (Math.random() - 0.5) * 0.1,
        -0.0025
      ));
    }
  }

  for (let i = entities.length - 1; i >= 0; --i) {
    const e = entities[i];
    if (e.scale < 0) {
      entities.splice(i, 1);
    }
  }

  renderer.prepareFrame();
  shader.bind();
  shader.setMatrix('projView', renderer.getProjView());
  renderer.renderEntities(entities, quad, shader);
  shader.unbind();

  requestAnimationFrame(loop);
};

// events

addEventListener('load', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(loop);
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
});

addEventListener('mousemove', ({x, y}) => {
  const clipX = x / innerWidth * 2 - 1;
  const clipY = y / innerHeight * 2 - 1;
  const invProjView = glMatrix.mat4.create();
  const output = [0, 0, 0, 0];
  glMatrix.mat4.invert(invProjView, renderer.getProjView());
  glMatrix.vec4.transformMat4(output, [clipX, clipY, 0, 0], invProjView);
  mouse.x = output[0] * 10;
  mouse.y = output[1] * -10;
});

addEventListener('mousedown', () => {
  mouse.down = true;
});

addEventListener('mouseup', () => {
  mouse.down = false;
});