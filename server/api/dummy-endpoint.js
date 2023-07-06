// mockup of a slow network
export default defineEventHandler(async event => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        apiResponse: new Date(),
      })
    }, 4000)
  })
})
