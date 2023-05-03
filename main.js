
// global

const vsSource = `#version 300 es

in vec3 vPosition;
in vec3 vColor;

out vec3 fColor;

void main()
{
  gl_Position = vec4(vPosition, 1.0);
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

const positions = [
  0.0,  0.5, 0.0,
 -0.5, -0.5, 0.0,
  0.5, -0.5, 0.0
];

const colors = [
  1.0, 1.0, 0.0,
  0.0, 1.0, 1.0,
  1.0, 0.0, 1.0
];

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
const program = new Program(vsSource, fsSource);
const loader = new Loader(program.getID());
const model = loader.loadVAO(positions, colors);

(() => {

  // loop

  const loop = () => {

    // clear

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // draw

    gl.bindVertexArray(model);
    program.bind()
    program.bindAttribs();

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    program.unbindAttribs();
    program.unbind()
    gl.bindVertexArray(null);

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

})();