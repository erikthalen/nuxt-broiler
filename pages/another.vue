<script setup>
const { data } = await useEndpoint('/api/dummy-endpoint', {
  // force refresh, for demo purposes
  key: Date.now().toString(),
})
</script>

<template>
  <div>
    <h1>Another page</h1>
    {{ data }}
  </div>
</template>
