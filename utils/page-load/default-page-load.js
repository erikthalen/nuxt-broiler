const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))

const DURATION = 2000

function onBeforeEnter(el, style) {
  style.value = { opacity: 0, transition: `opacity ${DURATION}ms` }
}

function onEnter(el, style) {
  return new Promise(async resolve => {
    style.value = { opacity: 1 }

    // access to the DOM
    const title = el.querySelector('h1')
    title.style.transform = 'translateY(20px)'

    // re-paint
    await delay(10)

    title.style.transition = `transform ${DURATION}ms`
    title.style.transform = 'translateY(0px)'

    await delay(DURATION)

    resolve()
  })
}

function onAfterEnter(el, style) {
  style.value = null
}

export default {
  onBeforeEnter,
  onEnter,
  onAfterEnter,
}
