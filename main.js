
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

void main()
{
  outColor = vec4(1.0, 1.0, 1.0, 1.0);
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
const keys = [];
const shader = new Shader(vsSource, fsSource);
const loader = new Loader();
const renderer = new Renderer();
const quad = loader.loadVAO(quadPositions, quadIndices);
const entities = [new Entity(
  [0, 0, 0],
  [0, 0, 0],
  [1, 1, 1],
  [0, 0, 0],
  [0, 0.02, 0.01],
  [0, 0, 0]
)];

// loop

const loop = () => {

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

addEventListener('keydown', ({keyCode}) => {
  keys[keyCode] = true;
});

addEventListener('keyup', ({keyCode}) => {
  keys[keyCode] = false;
});