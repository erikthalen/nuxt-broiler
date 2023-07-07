<script setup>
const { data } = await useEndpoint('/api/dummy-endpoint', {
  // force refresh, for demo purposes
  key: 'third',
  await: 'cache',
})
</script>

<template>
  <div>
    <h1>Third page</h1>
    <p>
      This page's <code>useEndpoint</code> has
      <code>{ await: 'cache' }</code>.<br />
      So the <code>onEnter</code> transition will first run when any page-data
      is in the DOM:
    </p>
    <pre><code>{{ data || 'null' }}</code></pre>
  </div>
</template>
