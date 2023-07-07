<script setup>
import defaultPageLoad from '~/utils/page-load/default-page-load.js'

const el = ref(null)

const { style } = usePageLoad(el, {
  pageLoads: {
    /* add your page specific page load effects here */
    /* key is page-template-name and value is a page-load: */
    // 'index': frontpageLoad
  },
  defaultPageLoad: defaultPageLoad,
})

const router = useRouter()

const handleClick = () => {
  router.transition.value = {
    name: 'another',
    payload: 'yeah',
  }
}
</script>

<template>
  <div ref="el" :style="style">
    <!-- dummy navigation -->
    <nav style="display: flex; gap: 1em">
      <nuxt-link to="/">Index</nuxt-link>
      <nuxt-link @click="handleClick" to="/another">Another</nuxt-link>
      <nuxt-link to="/third">Third</nuxt-link>
    </nav>

    <slot />
  </div>
</template>
