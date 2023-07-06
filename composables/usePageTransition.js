const runIfDefined = (fn, el) => (typeof fn === 'function' ? fn(el) : null)

const transitionController = (
  router,
  transitions,
  defaultTransition,
  extendCallbacks
) => {
  const get = (from, type, ...args) => {
    if (!from?.name || !type || !transitions[from?.name]) {
      // no page transition if there's no default transition
      if (!defaultTransition) return null

      const defaultTransitionCurrentHook = defaultTransition[type]

      // no transition-hook if the default doesn't define one
      if (!defaultTransitionCurrentHook) return null

      // run default transition's hook
      return defaultTransitionCurrentHook(...args, from?.target)
    }

    // get the chosen transition's hook
    const handler = transitions[from.name][type]

    // run the chosen transition's hook
    return typeof handler === 'function' ? handler(...args, from?.target) : null
  }

  return {
    onBeforeLeave: el => {
      runIfDefined(extendCallbacks.onBeforeLeave, el)
      get(router.transition, 'onBeforeLeave', el)
    },

    onLeave: async (el, done) => {
      try {
        runIfDefined(extendCallbacks.onLeave, el)
        get(router.transition, 'onLeave', el, done)
      } catch (error) {
        console.log(error)
        done()
      }
    },

    onAfterLeave: el => {
      runIfDefined(extendCallbacks.onAfterLeave, el)
      get(router.transition, 'onAfterLeave', el)
    },

    onBeforeEnter: el => {
      runIfDefined(extendCallbacks.onBeforeEnter, el)
      get(router.transition, 'onBeforeEnter', el)
    },

    onEnter: (el, done) => {
      try {
        runIfDefined(extendCallbacks.onEnter, el)
        get(router.transition, 'onEnter', el, done)
      } catch (error) {
        console.log(error)
        done()
      }
    },

    onAfterEnter: el => {
      runIfDefined(extendCallbacks.onAfterEnter, el)
      get(router.transition, 'onAfterEnter', el)

      // cleanup itself
      router.transition = null
    },
  }
}

export default ({
  transitions = {},
  defaultTransition = {},
  extendCallbacks = {},
} = {}) => {
  const router = useRouter()

  return {
    css: false,
    mode: 'out-in',
    ...transitionController(
      router,
      transitions,
      defaultTransition,
      extendCallbacks
    ),
  }
}
