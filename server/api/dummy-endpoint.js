// mockup of a slow network
export default defineEventHandler(async event => {
  return new Promise(resolve => {
    setTimeout(() => {
      const date = new Date()
      resolve({
        url: event.node.res.req.url,
        createdAt: date.toLocaleTimeString('dk-DK'),
      })
    }, 4000)
  })
})
