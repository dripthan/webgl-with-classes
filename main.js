
// shader code

const vsSource = `#version 300 es

layout(location = 0) in vec2 vPosition;
layout(location = 1) in vec3 vColor;

out vec3 fColor;

uniform mat4 proj;
uniform mat4 view;
uniform mat4 model;

void main()
{
  gl_Position = proj * view * model * vec4(vPosition, 0.0, 1.0);
  fColor = vColor;
}

`;

const fsSource = `#version 300 es

precision highp float;

in vec3 fColor;

out vec4 outColor;

void main()
{
  outColor = vec4(fColor, 1.0);
}

`;

// primative quad attributes

const quadPositions = [
   0.5,  0.5,
   0.5, -0.5,
  -0.5, -0.5,
  -0.5,  0.5
];

const quadColors = [
  0.0, 0.0, 1.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 1.0,
  1.0, 0.0, 0.0
];

const quadIndices = [
  0, 1, 3,
  1, 2, 3
];

// variables

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
const shader = new Shader(vsSource, fsSource);
const loader = new Loader();
const renderer = new Renderer();
const quad = loader.loadVAO(quadPositions, quadColors, quadIndices);
const entity = new Entity(0, 0, 0, 0.1);

// loop

const loop = () => {

  entity.x += 0.001;
  entity.rot += 0.01;

  renderer.prepareFrame();
  shader.bind();
  shader.setMatrix('proj', renderer.getProj());
  shader.setMatrix('view', renderer.getView());
  renderer.renderEntities([entity], quad, shader);
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