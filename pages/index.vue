<script setup>
const { data } = await useEndpoint('/api/dummy-endpoint', {
  // force refresh, for demo purposes
  key: 'index',
  await: true,
})
</script>

<template>
  <div>
    <h1>Index page</h1>
    <p>
      This page's <code>useEndpoint</code> has
      <code>{ await: true }</code>.<br />
      So the <code>onEnter</code> transition will first run when its (newest) data is in
      the DOM:
    </p>
    <pre><code>{{ data || 'null' }}</code></pre>
  </div>
</template>
