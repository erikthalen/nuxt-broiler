// mockup of a (very) fast network
export default defineEventHandler(event => {
  const date = new Date()

  return { createdAt: date.toLocaleTimeString('dk-DK') }
})
