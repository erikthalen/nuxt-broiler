# Nuxt 3 composables for managing api calls and transitions

## `useEndpoint`

Wrapper for useFetch.  
Managing data fetching with the ability to inform  
`usePageTransition` about the current data.

### setup

Add `runtimeConfig.public.API_URL` in `nuxt.config.js`,
that will be used as `baseUrl` in useFetch().

### usage

Same as `useFetch`, except:

```js
const { data } = await useEndpoint('/api/endpoint', {
  await: true, // will make potential onEnter callback wait for data
})
```

## `usePageTransition`

Handles page transitions.  
Exposes the same api as vue transition, with all the same hooks.  
Gives the ability to choose between transitions on-the-fly.

### setup

In app.vue add the following:

```js
<script setup>
const pageTransitions = usePageTransition()
</script>
```

```html
<template>
  <nuxt-page :transition="pageTransitions" />
</template>
```

### usage

No option is required, but will enable more control.  
Get started by copy-pasting the template file with all hooks.

```js
// app.vue
import defaultTransition from '~/defaultTransition'
import anotherTransition from '~/anotherTransition'

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
      console.log('runs on every onLeave')
    },
    onEnter(el, payload) {
      // onEnter have access to the new page's endpoint data if the page is awaited
      console.log('runs on every onLeave', useEndpointData.value)
    },
  },
})
```

Somewere in the app a transition can be triggered by:

```js
// my-component.vue
<script setup>
  const router = useRouter()
  
  const handleClick = () => {
    router.transition.value = {
      name: 'another', // should match a key in usePageTransition.transitions
      payload: 'yeah', // data that's passed and available in the transition hooks
    }
  }
</script>
```

```html
<!-- my-component.vue -->
<template>
  <nuxt-link @click="handleClick" to="/somewere">Click me</nuxt-link>
</template>
```

## `usePageLoad`

Slimmer version of `usePageTransition`.  
Runs through it's hooks once, on initial page load.  
Like `usePageTransition` it has the ability to trigger unique set of hooks depending on page-template.

### setup

```js
// layouts/default.vue
const el = ref(null)

const { style } = usePageLoad(el, {
  pageLoads: {
    /* add your page specific page load effects here */
    /* key is page-template-name and value is a page-load: */
    index: frontpageLoad,
  },
  defaultPageLoad: defaultPageLoad,
})
```

```html
<!-- layouts/default.vue -->
<div ref="el" :style="style">
  <slot />
</div>
```

### usage

Copy-paste the template file to get started.

## `useQuery`

Not directly part of the transitions or data fetching.  
But small and usable for managing url query params.

### usage

Check the file for available functions.  

More of a gotcha, but if the query object in useFetch is computed,  
Nuxt will re-fetch on query updates:

```js
const colorRef  = ref('red')

const { data } = await useEndpoint('/api/endpoint', {
  query: computed(() => {
    color: colorRef.value
  }),
})

// endpoint will be called again with the new query
setTimeout(() => {
  colorRef.value = 'blue'
}, 1000)
```
