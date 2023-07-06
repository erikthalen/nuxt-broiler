function onBeforeEnter(el, style) {}

function onEnter(el, style) {
  return new Promise(resolve => {
    // call this when your animation is done
    resolve()
  })
}

function onAfterEnter(el, style) {}

export default {
  onBeforeEnter,
  onEnter,
  onAfterEnter,
}
