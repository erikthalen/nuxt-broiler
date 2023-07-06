function onBeforeEnter(target, el) {}

function onEnter(target, el, done) {
  // call this when you're done with your enter transition
  done()
}

function onAfterEnter(target, el) {}

function onBeforeLeave(target, el) {}

function onLeave(target, el, done) {
  // call this when you're done with your enter transition
  done()
}

function onAfterLeave(target, el) {}

function onEnterCancelled() {}

function onLeaveCancelled() {}

export default {
  onBeforeEnter,
  onEnter,
  onAfterEnter,
  onBeforeLeave,
  onLeave,
  onAfterLeave,

  onEnterCancelled,
  onLeaveCancelled,
}
