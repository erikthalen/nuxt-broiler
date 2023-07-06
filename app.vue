<script setup>
import defaultTransition from '~/utils/transitions/default-transition'
import noTransition from '~/utils/transitions/no-transition'

const pageTransitions = usePageTransition({
  defaultTransition: defaultTransition,
  transitions: {
    noTransition,
  },
  globalCallbacks: {
    /* add your global transition hooks that will run on all page shifts */
  },
})
</script>

<template>
  <nuxt-layout>
    <nuxt-page :transition="pageTransitions" />
  </nuxt-layout>
</template>
