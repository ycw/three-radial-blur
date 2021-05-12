# About

Radial blur pass for threejs postprocessing. 

[live example](https://ycw.github.io/three-radial-blur/example/index.html)


## Installation

via cdn

https://cdn.jsdelivr.net/gh/ycw/three-radial-blur@{VERSION}/src/RadialBlurPass.js


## Usage

```js
import * as THREE from '//path/to/three.js'
import * as Pass from '//path/to/examples/jsm/postprocessing/Pass.js'
import { EffectComposer } from '//path/to/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from '//path/to/jsm/postprocessing/RenderPass.js'
import { RadialBlurPass } from '//path/to/RadialBlurPass.js'

...
const fx = new EffectComposer(renderer);
fx.add(new RenderPass(scene, camera));
fx.add(new RadialBlurPass(THREE, Pass/*, options */));
...
```

Available options: 

```js
fx.add(new RadialPass(THREE, Pass, {
  intensity: 1.0, // 0. to 1.; def to 1.
  iterations: 100, // Blur steps; must >= 1; def to 100
  radialCenter: new THREE.Vector2() // -1 to 1; def to { x:0, y:0 }
}));
```

## Credits

[mrdoob / three.js](https://github.com/mrdoob/three.js/)

## License

[MIT](./LICENSE)