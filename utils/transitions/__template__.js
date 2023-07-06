/**
 * template for creating custom page transitions.
 *
 * create a new copy of this file,
 * import it in usePageTransitions and
 * add it to the transitions object.
 *
 * trigger the transition by, somewhere in your app, appending a transition object to router:
 *
 * const router = useRouter()
 * router.transition = { name: 'myTransition', target: 'some-data' }
 *
 * this transition will now be used next time the app changes page.
 *
 * api:
 * name: the name of the key in {transitions} containing this exported object
 * target: a payload sent as param to the transition-hooks (f.ex. an dom element)
 *
 *
 * if the router doesn't receive a transition.name, or if it doesn't exists,
 * it will try to run transition.defaultTransition.
 * or else navigate without transition.
 * so create a transition-file called defaultTransition, if there are none.
 *
 * you can remove the on-hooks you don't need.
 */

function onBeforeLeave(target, el) {}

function onLeave(target, el, done) {
  // call this when you're done with your enter transition
  done()
}

function onAfterLeave(target, el) {}

function onBeforeEnter(target, el) {}

function onEnter(target, el, done) {
  // call this when you're done with your enter transition
  done()
}

function onAfterEnter(target, el) {}

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
