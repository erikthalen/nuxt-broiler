<script setup>
import defaultPageLoad from '~/utils/page-load/default-page-load.js'

const el = ref(null)

const { style } = usePageLoad(el, {
  pageLoads: {
    /* add your page specific page load effects here */
  },
  defaultPageLoad: defaultPageLoad,
})
</script>

<template>
  <div ref="el" :style="style">
    <nav style="display: flex; gap: 1em">
      <nuxt-link to="/">Index</nuxt-link>
      <nuxt-link to="/another">Another</nuxt-link>
    </nav>

    <slot />
  </div>
</template>
