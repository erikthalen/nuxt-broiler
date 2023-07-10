<script setup>
const { data } = await useEndpoint('/api/dummy-endpoint', {
  // force refresh, for demo purposes
  key: 'another',
  lazy: false
})
</script>

<template>
  <div>
    <h1>Another page</h1>
    <p>
      This page's <code>useEndpoint</code> is not awaited.<br />
      So the <code>onEnter</code> transition will run even if the data is not in
      the DOM:
    </p>
    <pre><code>{{ data || 'null' }}</code></pre>
  </div>
</template>
