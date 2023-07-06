<script setup>
import defaultTransition from '~/utils/transitions/default-transition'
import anotherTransition from '~/utils/transitions/another-transition'

/**
 * trigger custom transition with:
 *
 * const router = useRouter()
 * router.transition.value = {
 *   name: 'my-transition',
 *   payload: 'some-data'
 * }
 */

const pageTransitions = usePageTransition({
  // a ref to endpoint data populated by useEndpoint,
  // used when { await: true }
  endpointData: useEndpointData,

  // transition to run when no other is defined
  defaultTransition: defaultTransition,

  // individual transitions triggered by @click f.ex.
  transitions: {
    another: anotherTransition,
  },

  // vue transition hooks that runs on every page shift
  globalCallbacks: {
    onLeave(el, payload) {
      console.log('transition onLeave', payload)
    },
    onEnter(el, payload) {
      // onEnter have access to the new page's endpoint data if the page is awaited
      console.log('transition onEnter', useEndpointData.value)
    },
  },
})

// used for debug
const router = useRouter()
</script>

<template>
  <nuxt-layout>
    <nuxt-page :transition="pageTransitions" />

    <!-- this can be removed -->
    <client-only>
      <code class="debug">
        useEndpointData: {{ useEndpointData || 'null' }}<br />
        transition: {{ router.transition || 'null' }}
      </code>
    </client-only>
  </nuxt-layout>
</template>

<style>
body {
  line-height: 1.3;
}

.debug {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

code {
  background: #eee;
  color: dodgerblue;
  padding: 0.1em 0.4em 0.2em;
  border-radius: 0.4em;
}
</style>
