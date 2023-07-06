function onBeforeEnter(el, payload) {
  el.style.transform = 'translateY(100px)'
}

function onEnter(el, done, payload) {
  setTimeout(() => {
    el.style.transition = 'transform 1000ms'
    el.style.transform = 'translateY(0px)'

    setTimeout(done, 1000)
  }, 10)
}

function onAfterEnter(el, payload) {}

function onBeforeLeave(el, payload) {}

function onLeave(el, done, payload) {
  setTimeout(() => {
    el.style.transition = 'transform 1000ms'
    el.style.transform = 'translateY(100px)'

    setTimeout(done, 1000)
  })
}

function onAfterLeave(el, payload) {}

export default {
  onBeforeEnter,
  onEnter,
  onAfterEnter,
  onBeforeLeave,
  onLeave,
  onAfterLeave,
}
