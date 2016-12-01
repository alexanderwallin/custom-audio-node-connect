# custom-audio-node-connect

**`custom-audio-node-connect`** shims the [`AudioNode.connect`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode/connect) method and lets you choose which audio nodes to actually connect to each other.

This is useful if you want your own custom nodes/effects to be chainable just like any other node.

The code in this module [is copied](https://github.com/Theodeus/tuna/blob/master/tuna.js#L153) straight from the terrific [`tuna`](https://github.com/Theodeus/tuna) by [Theodeus](https://github.com/Theodeus). All cred goes there!


## Installation

```sh
npm i -S custom-audio-node-connect
```


## Usage

```js
import enableCustomConnects from 'custom-audio-node-connect'
import BitCrusher from './my-effects/BitCrusher.js'

const ctx = new AudioContext()

// Every time `AudioNode.connect(someAudioNode)` is called, the `inputSelector`
// function will be called to determine what to actually connect to.
//
// In this imaginary example, BitCrusher objects has an `input` property
// which is a regular GainNode. If someAudioNode has an `input` property,
// we let the connecting node connect to that, otherwise we just return
// the node as is.
const inputSelector = (node) => node.input || node
enableCustomConnects(ctx, inputSelector)

// Create an AudioNode, here an oscillator, together with an instance
// of our custom BitCrusher effect.
const osc = ctx.createOscillator()
osc.frequency.value = 440
const crushEffect = new BitCrusher()

// Connecting now works seemlessly. You'll have to implement the
// BitCrusher's `connect()` and `disconnect()` methods yourself. :(
osc.connect(crushEffect)
crushEffect.connect(ctx.destination)
```


## API

### `enableCustomConnects(audioContext, inputSelector)`

##### `audioContext`

An [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) instance.

##### `inputSelector`

```js
(node: any) => AudioNode
```

A function that takes any object passed to `AudioNode.connect()` and return and `AudioNode` that the connecting node should connect to.


## See also

* [`audio-param-shim`](https://github.com/alexanderwallin/audio-param-shim) - An AudioParam shim that lets you act on value changes in any way you want
* [`Theodeus/tuna`](https://github.com/Theodeus/tuna) - An audio effects library for the Web Audio API.
