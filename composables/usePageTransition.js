export const usePageTransitionRunning = ref(false)

const transitionController = (
  router,
  transitions,
  defaultTransition,
  globalHooks,
  endpointData = ref(null)
) => {
  const get = (from, type, ...args) => {
    if (!from?.name || !type || !transitions[from?.name]) {
      // no page transition if there's no default transition
      if (!defaultTransition) return null

      const defaultTransitionCurrentHook = defaultTransition[type]

      // no transition-hook if the default doesn't define one
      if (!defaultTransitionCurrentHook) return null

      // run default transition's hook
      return defaultTransitionCurrentHook(...args, from?.payload)
    }

    // get the chosen transition's hook
    const handler = transitions[from.name][type]

    // run the chosen transition's hook
    return typeof handler === 'function'
      ? handler(...args, from?.payload)
      : null
  }

  return {
    onBeforeLeave: el => {
      usePageTransitionRunning.value = true

      runIfDefined(
        globalHooks.onBeforeLeave,
        el,
        router.transition.value?.payload
      )
      get(router.transition.value, 'onBeforeLeave', el)
    },

    onLeave: async (el, done) => {
      try {
        runIfDefined(globalHooks.onLeave, el, router.transition.value?.payload)
        get(router.transition.value, 'onLeave', el, done)
      } catch (error) {
        console.log(error)
        done()
      }
    },

    onAfterLeave: el => {
      runIfDefined(
        globalHooks.onAfterLeave,
        el,
        router.transition.value?.payload
      )
      get(router.transition.value, 'onAfterLeave', el)
    },

    onBeforeEnter: el => {
      runIfDefined(
        globalHooks.onBeforeEnter,
        el,
        router.transition.value?.payload
      )
      get(router.transition.value, 'onBeforeEnter', el)
    },

    onEnter: async (el, done) => {
      await waitFor(() => endpointData.value !== 'pending')

      try {
        runIfDefined(globalHooks.onEnter, el, router.transition.value?.payload)
        get(router.transition.value, 'onEnter', el, done)
      } catch (error) {
        console.log(error)
        done()
      }
    },

    onAfterEnter: el => {
      runIfDefined(
        globalHooks.onAfterEnter,
        el,
        router.transition.value?.payload
      )
      get(router.transition.value, 'onAfterEnter', el)

      // cleanup itself
      router.transition.value = null
      endpointData.value = null
      usePageTransitionRunning.value = false
    },
  }
}

export default ({
  transitions = {},
  defaultTransition = {},
  globalHooks = {},
  endpointData,
} = {}) => {
  const router = useRouter()

  router.transition = ref(null)

  return {
    css: false,
    mode: 'out-in',
    ...transitionController(
      router,
      transitions,
      defaultTransition,
      globalHooks,
      endpointData
    ),
  }
}

function runIfDefined(fn, el, ...args) {
  return typeof fn === 'function' ? fn(el, ...args) : null
}

async function waitFor(callback) {
  return new Promise(resolve => {
    const tick = () => {
      requestAnimationFrame(callback() ? resolve : tick)
    }
    tick()
  })
}
