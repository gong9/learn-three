const canvas = document.querySelector('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl') as WebGLRenderingContext

const initProgram = (gl, vertexShaderSource, fragmentShaderSource) => {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    return program
}

const vertexShaderSource = `
attribute vec2 a_Position;
attribute vec2 a_Screen_Size;
void main(){
    vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
    position = position * vec2(1.0,-1.0);
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = 5.0;
}
`

const fragmentShaderSource = `
precision mediump float;
uniform vec4 u_Color;

void main(){
vec4 color = u_Color / vec4(255, 255, 255, 1);
gl_FragColor = color;
}
`

const program = initProgram(gl, vertexShaderSource, fragmentShaderSource)
gl.useProgram(program);

const a_Screen_Size = gl.getAttribLocation(program, "a_Screen_Size");
gl.vertexAttrib2f(a_Screen_Size, canvas.width, canvas.height);

const positions:number[] = [];
const a_Position = gl.getAttribLocation(program, 'a_Position')

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
gl.enableVertexAttribArray(a_Position)
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

const render = () => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_STRIP, 0, 2);
}

canvas.addEventListener('click', (e) => {
    const x = e.pageX;
    const y = e.pageY;

    positions.push(x, y);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
    render()
})

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);