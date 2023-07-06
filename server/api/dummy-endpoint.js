// mockup of a slow network
export default defineEventHandler(async event => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        time: new Date(),
      })
    }, 2000)
  })
})
