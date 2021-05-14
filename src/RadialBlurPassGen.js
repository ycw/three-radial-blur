import { RadialBlurShader } from './RadialBlurShader.js'

export function RadialBlurPassGen({ THREE, Pass, FullScreenQuad }) {

  // expose
  return class RadialBlurPass extends Pass {
    constructor({
      intensity = 1.,
      iterations = 10,
      maxIterations = 100,
      radialCenter = new THREE.Vector2(),
    } = {}) {
      super();

      const uniforms = THREE.UniformsUtils.clone(RadialBlurShader.uniforms);
      uniforms.uRadialCenter.value = radialCenter;
      uniforms.uIntensity.value = intensity;
      uniforms.uIterations.value = iterations;

      const defines = {
        ...RadialBlurShader.defines,
        MAX_ITERATIONS: maxIterations
      };

      const material = new THREE.ShaderMaterial({
        defines,
        uniforms,
        vertexShader: RadialBlurShader.vertexShader,
        fragmentShader: RadialBlurShader.fragmentShader,
      });

      this._fsQuad = new FullScreenQuad(material);
      this._uniforms = material.uniforms;
      this._defines = material.defines;
    }

    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */) {
      this._uniforms['tDiffuse'].value = readBuffer.texture;

      if (this.renderToScreen) {
        renderer.setRenderTarget(null);
      } else {
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear();
      }
      this._fsQuad.render(renderer);
    }

    get iterations() {
      return this._uniforms.uIterations.value;
    }

    set iterations(value) {
      if (value > this._defines.MAX_ITERATIONS) {
        console.warn(`iterations (${value}) will be capped by maxIterations (${this._defines.MAX_ITERATIONS}) in shader`);
      }
      this._uniforms.uIterations.value = value;
    }

    get intensity() {
      return this._uniforms.uIntensity.value;
    }

    set intensity(value) {
      this._uniforms.uIntensity.value = value;
    }

    get radialCenter() {
      return this._uniforms.uRadialCenter.value;
    }

    set radialCenter(value) {
      return this_uniforms.uRadialCenter.value = value;
    }

    get maxIterations() {
      return this._defines.MAX_ITERATIONS;
    }

  };

}
