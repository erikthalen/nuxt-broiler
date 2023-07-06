// mockup of a slow network
export default defineEventHandler(async event => {
  return new Promise(resolve => {
    setTimeout(() => {
      const date = new Date()
      resolve({ createdAt: date.toLocaleTimeString('dk-DK') })
    }, 4000)
  })
})
