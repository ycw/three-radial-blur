# About

Radial blur pass for threejs postprocessing. 

[Live example](https://ycw.github.io/three-radial-blur/example/index.html)


## Installation

via cdn

https://cdn.jsdelivr.net/gh/ycw/three-radial-blur@{VERSION}/src/index.js

via npm

`$ npm i ycw/three-radial-blur` or

`$ npm i ycw/three-radial-blur#{VERSION_TAG}`


## Usage

```js
import * as THREE from '//path/to/three'
import { EffectComposer, Pass, FullScreenQuad } from '//path/to/jsm/postprocessing/EffectComposer'
import { RenderPass } from '//path/to/jsm/postprocessing/RenderPass'
import { RadialBlurPassGen } from '//path/to/three-radial-blur'

...

// Generate RadialBlurPass class
const RadialBlurPass = RadialBlurPassGen({ THREE, Pass, FullScreenQuad });

// Create RadialBlurPass instance
const myRadialBlurPass = new RadialBlurPass(/*..options..*/);

// Add to effect composer
const fx = new EffectComposer(renderer);
fx.addPass(new RenderPass(scene, camera));
fx.addPass(myRadialBlurPass);

```

Available options: 

```js
{
  intensity: 1.0, // blur distance; 0. to 1.
  iterations: 100, // n blur steps; must >= 1
  radialCenter: new THREE.Vector2() // radial center; -1 to 1
}
```

## Credits

[mrdoob / three.js](https://github.com/mrdoob/three.js/)

## License

[MIT](./LICENSE)