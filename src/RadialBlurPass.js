import shader from './RadialBlurShader.js'

export function RadialBlurPass(
  // inject lib three
  THREE,
  // inject jsm/postprocessing/Pass module
  Pass,
  // opts
  { intensity = 1., iterations = 100 } = {}
) {

  return new class extends Pass.Pass {

    constructor() {
      super();

      const uniforms = THREE.UniformsUtils.clone(shader.uniforms);
      uniforms.uRadialCenter.value = new THREE.Vector2();
      uniforms.uIntensity.value = intensity;
      uniforms.uIterations.value = iterations;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        glslVersion: THREE.GLSL3
      });

      this.fsQuad = new Pass.FullScreenQuad(material);
      this.uniforms = material.uniforms;
    }

    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */) {
      this.uniforms['tDiffuse'].value = readBuffer.texture;

      if (this.renderToScreen) {
        renderer.setRenderTarget(null);
        this.fsQuad.render(renderer);
      } else {
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear();
        this.fsQuad.render(renderer);
      }
    }

  };
}
