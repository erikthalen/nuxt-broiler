function onLeave(el, done, payload) {
  el.style.transition = 'transform 1000ms'
  el.style.transform = 'scaleY(0)'

  setTimeout(done, 1000)
}

function onBeforeEnter(el, payload) {
  el.style.transform = 'scaleY(0)'
}

function onEnter(el, done, payload) {
  setTimeout(() => {
    el.style.transition = 'transform 1000ms'
    el.style.transform = 'scaleY(1)'

    setTimeout(done, 1000)
  }, 100)
}

function onAfterEnter(el, payload) {
  el.removeAttribute('style')
}

export default {
  onLeave,
  onBeforeEnter,
  onEnter,
  onAfterEnter,
}
