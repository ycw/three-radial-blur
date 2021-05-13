import { RadialBlurShader } from './RadialBlurShader.js'

export function RadialBlurPassGen({ THREE, Pass, FullScreenQuad }) {

  // expose
  return class RadialBlurPass extends Pass {
    constructor({
      intensity = 1.,
      iterations = 100,
      radialCenter = new THREE.Vector2()
    } = {}) {
      super();

      const uniforms = THREE.UniformsUtils.clone(RadialBlurShader.uniforms);
      uniforms.uRadialCenter.value = radialCenter;
      uniforms.uIntensity.value = intensity;
      uniforms.uIterations.value = iterations;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: RadialBlurShader.vertexShader,
        fragmentShader: RadialBlurShader.fragmentShader,
        glslVersion: THREE.GLSL3
      });

      this.fsQuad = new FullScreenQuad(material);
      this.uniforms = material.uniforms;
    }

    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */) {
      this.uniforms['tDiffuse'].value = readBuffer.texture;

      if (this.renderToScreen) {
        renderer.setRenderTarget(null);
      } else {
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear();
      }
      this.fsQuad.render(renderer);
    }

  };

}
