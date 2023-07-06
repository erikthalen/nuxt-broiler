<script setup>
const { data } = await useEndpoint('/api/dummy-endpoint', {
  // force refresh, for demo purposes
  key: Date.now().toString(),
  await: true
})
</script>

<template>
  <div>
    <h1>Index page</h1>
    <p>{{ data }}</p>
  </div>
</template>
