/**
 * Shims the `AudioNode.connect()` method and lets you choose
 * which audio nodes to actually connect to each other.
 *
 * @see https://github.com/Theodeus/tuna/blob/master/tuna.js#L153
 *
 * @param  {AudioContext} context        An AudioContext instance
 * @param  {Function}     inputSelector  A function that takes an object that
 *                                       has been passed to `AudioNode.connect()`
 *                                       and returns what the calling audio node
 *                                       should actually connect to
 */
export default function enableCustomConnects(context, inputSelector) {
  if (context.__connectified === true) {
    return
  }

  function shimConnect(node, ...args) {
    const nodeInput = inputSelector(node)
    const finalArgs = [nodeInput, ...args]
    oconnect.apply(this, finalArgs)
    return node
  }

  const gain = context.createGain()
  const proto = Object.getPrototypeOf(Object.getPrototypeOf(gain))
  const oconnect = proto.connect

  proto.connect = shimConnect
  context.__connectified__ = true
}

