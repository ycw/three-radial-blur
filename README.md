# About

Radial blur pass for threejs postprocessing. 

[Live example](https://ycw.github.io/three-radial-blur/example/)


## Installation

via cdn

https://cdn.jsdelivr.net/gh/ycw/three-radial-blur@{VERSION}/src/index.js

via npm

`$ npm i ycw/three-radial-blur` or

`$ npm i ycw/three-radial-blur#{VERSION_TAG}`


## Usage

```js
import * as THREE from 'three'
import { EffectComposer, Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { RadialBlurPassGen } from 'three-radial-blur'

...

// Generate RadialBlurPass class
const RadialBlurPass = RadialBlurPassGen({ THREE, Pass, FullScreenQuad });

// Create RadialBlurPass instance
const myRadialBlurPass = new RadialBlurPass({
  intensity: 1.0, // normalize blur distance; 0. to 1.
  iterations: 10, // total steps along blur distance
  maxIterations: 100, // max. iterations ( immutable after creation ) 
  radialCenter: new THREE.Vector2() // radial center; -1. to 1.
});

// Add to effect composer
const fx = new EffectComposer(renderer);
fx.addPass(new RenderPass(scene, camera));
fx.addPass(myRadialBlurPass);

// APIs
myRadialBlurPass.maxIterations;
myRadialBlurPass.intensity = 1.0;
myRadialBlurPass.iterations = 10; 
myRadialBlurPass.radialCenter.set(0, 0);
```


## Credits

[mrdoob / three.js](https://github.com/mrdoob/three.js/)

## License

[MIT](./LICENSE)