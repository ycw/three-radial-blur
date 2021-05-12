export default {
  uniforms: {
    'tDiffuse': { value: null },
    'uRadialCenter': { value: null },
    'uIntensity': { value: 1.0 }, 
    'uIterations': { value: 100 }
  },
  vertexShader: /* glsl 3 */ `
    out vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: /* glsl 3 */ `
    uniform sampler2D tDiffuse;
    uniform vec2 uRadialCenter;
    uniform float uIntensity;
    uniform int uIterations;
    in vec2 vUv;
    out vec4 fColor;
    void main() {
      vec2 v = uIntensity * ( uRadialCenter * .5 + .5 - vUv );

      for ( int i = 0; i < uIterations; i++ ) {
        fColor += texture2D( tDiffuse, vUv + v * float( i ) / float( uIterations ) );
      }

      fColor /= float( uIterations );
    }
  `
};