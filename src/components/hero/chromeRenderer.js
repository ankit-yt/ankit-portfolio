// A single mesh and draw call with procedural studio reflections. No texture downloads.
const vertex = `
attribute vec3 position;
uniform float time;
uniform vec2 pointer;
uniform float aspect;
varying vec3 normal;
varying vec3 world;
void main() {
  vec3 p = position;
  float ripple = .12*sin(p.x*5.+time*.55)*sin(p.y*4.-time*.3)+.09*cos(p.z*5.+time*.4);
  p *= 1.+ripple;
  float ax = -.25 + pointer.y*.23;
  float ay = time*.08 + pointer.x*.3;
  mat3 rx = mat3(1.,0.,0.,0.,cos(ax),sin(ax),0.,-sin(ax),cos(ax));
  mat3 ry = mat3(cos(ay),0.,-sin(ay),0.,1.,0.,sin(ay),0.,cos(ay));
  world = ry*rx*p;
  normal = normalize(ry*rx*(position + vec3(.18*cos(position.x*5.+time*.55), .12*sin(position.y*4.-time*.3), .16*sin(position.z*5.+time*.4))));
  float perspective = 3.6/(3.6-world.z);
  gl_Position = vec4(world.x*perspective/aspect*.65, world.y*perspective*.65, -world.z*.2, 1.);
}`;
const fragment = `
precision mediump float;
varying vec3 normal;
varying vec3 world;
void main() {
  vec3 n = normalize(normal);
  vec3 view = normalize(vec3(0.,0.,3.6)-world);
  vec3 r = reflect(-view,n);
  float strip = pow(max(0.,1.-abs(r.y-.35)*1.8),18.);
  float softbox = pow(max(0.,dot(r,normalize(vec3(-.6,.7,1.)))),20.);
  float rimlight = pow(max(0.,dot(r,normalize(vec3(.8,-.2,.5)))),32.);
  float lower = smoothstep(-.9,-.55,r.y)*(1.-smoothstep(-.35,-.12,r.y));
  float fresnel = pow(1.-max(0.,dot(n,view)),3.);
  vec3 color = vec3(.025,.035,.055)+vec3(.75,.82,.96)*strip+vec3(.95)*softbox*1.5+vec3(.48,.55,.85)*rimlight+vec3(.36,.4,.5)*lower+vec3(.22,.27,.39)*fresnel;
  color += vec3(.09,.1,.13)*max(0.,n.y);
  gl_FragColor = vec4(pow(color,vec3(.8)),1.);
}`;
export function createChromeRenderer(canvas, root) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');
  const low = navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  if (low || motion.matches) return { dispose() {} };
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: true, powerPreference: 'low-power' });
  if (!gl) return { dispose() {} };
  const shaders = [], buffers = [];
  let program, frame = 0, visible = true, lost = false, stopped = false;
  let quality = coarse.matches ? 1 : 2, count = 0, previous = 0, samples = 0, elapsed = 0, slowWindows = 0;
  let activeTime = 0, lastTick = 0;
  let targetX = 0, targetY = 0, x = 0, y = 0;
  const compile = (type, source) => {
    const shader = gl.createShader(type); shaders.push(shader);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Chrome shader unavailable');
    return shader;
  };
  const cleanupGL = () => { buffers.forEach(buffer => gl.deleteBuffer(buffer)); shaders.forEach(shader => gl.deleteShader(shader)); if (program) gl.deleteProgram(program); };
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Chrome program unavailable');
  } catch { cleanupGL(); return { dispose() {} }; }
  gl.useProgram(program); gl.enable(gl.DEPTH_TEST);
  const vertices = gl.createBuffer(), indices = gl.createBuffer(); buffers.push(vertices, indices);
  const locations = { time: gl.getUniformLocation(program, 'time'), pointer: gl.getUniformLocation(program, 'pointer'), aspect: gl.getUniformLocation(program, 'aspect') };
  const position = gl.getAttribLocation(program, 'position');
  const mesh = () => {
    const rings = quality === 2 ? 48 : 24, segments = quality === 2 ? 64 : 32;
    const positions = [], elements = [];
    for (let row = 0; row <= rings; row++) for (let col = 0; col <= segments; col++) {
      const a = row/rings*Math.PI, b = col/segments*Math.PI*2;
      positions.push(Math.sin(a)*Math.cos(b), Math.cos(a)*1.14, Math.sin(a)*Math.sin(b));
    }
    for (let row = 0; row < rings; row++) for (let col = 0; col < segments; col++) {
      const a = row*(segments+1)+col, b = a+segments+1;
      elements.push(a,b,a+1,b,b+1,a+1);
    }
    count = elements.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,3,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indices); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(elements),gl.STATIC_DRAW);
  };
  const resize = () => {
    if (lost || stopped) return;
    const ratio = Math.min(devicePixelRatio || 1, quality === 2 ? 1.5 : 1);
    canvas.width = Math.min(960, Math.round(root.clientWidth*ratio));
    canvas.height = Math.min(960, Math.round(root.clientHeight*ratio));
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform1f(locations.aspect, canvas.width/Math.max(1,canvas.height));
    start();
  };
  const render = (time) => {
    frame = 0;
    if (!visible || document.hidden || motion.matches || stopped || lost) { previous = lastTick = 0; return; }
    const delta = lastTick ? time-lastTick : 16.7;
    lastTick = time; activeTime += Math.min(delta, 50)/1000;
    if (previous && !coarse.matches) {
      elapsed += time-previous; samples++;
      if (samples >= 90) {
        slowWindows = elapsed/samples > 27 ? slowWindows+1 : 0;
        samples = elapsed = 0;
        if (slowWindows >= 2) {
          slowWindows = 0;
          if (quality === 2) { quality = 1; mesh(); resize(); }
          else { stopped = true; root.dataset.render = 'fallback'; return; }
        }
      }
    }
    previous = time;
    x += (targetX-x)*.045; y += (targetY-y)*.045;
    gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(locations.time,activeTime); gl.uniform2f(locations.pointer,x,y);
    gl.drawElements(gl.TRIANGLES,count,gl.UNSIGNED_SHORT,0);
    root.dataset.render = 'webgl';
    // On touch screens render once, then only on resize/visibility changes.
    if (!coarse.matches && !frame) frame = requestAnimationFrame(render);
  };
  function start() { if (!frame && !stopped && !lost && visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(render); }
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; previous = lastTick = 0; } else start(); };
  const pointer = event => { if (coarse.matches) return; const rect = root.getBoundingClientRect(); targetX = (event.clientX-rect.left)/rect.width*2-1; targetY = (event.clientY-rect.top)/rect.height*2-1; };
  const resetPointer = () => { targetX = targetY = 0; };
  const settings = () => { cancelAnimationFrame(frame); frame = 0; previous = lastTick = 0; if (motion.matches) root.dataset.render = 'fallback'; else start(); };
  const contextLost = event => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; root.dataset.render = 'fallback'; };
  mesh();
  const sizing = new ResizeObserver(resize); sizing.observe(root);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; previous = lastTick = 0; } }); observer.observe(root);
  document.addEventListener('visibilitychange',visibility);
  root.addEventListener('pointermove',pointer,{ passive:true }); root.addEventListener('pointerleave',resetPointer);
  canvas.addEventListener('webglcontextlost',contextLost);
  motion.addEventListener('change',settings); coarse.addEventListener('change',settings);
  resize();
  return { dispose() { stopped = true; cancelAnimationFrame(frame); sizing.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange',visibility); root.removeEventListener('pointermove',pointer); root.removeEventListener('pointerleave',resetPointer); canvas.removeEventListener('webglcontextlost',contextLost); motion.removeEventListener('change',settings); coarse.removeEventListener('change',settings); cleanupGL(); root.dataset.render = 'fallback'; } };
}
