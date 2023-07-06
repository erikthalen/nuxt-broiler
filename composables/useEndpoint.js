/**
 * global ref to current endpoint data
 */
export const useEndpointData = ref(null)

/**
 * useEndpoint
 *
 * wrapper for useFetch() with appended default values and some lifecycle control
 */
export const useEndpoint = (slug, options = {}) => {
  const config = useRuntimeConfig().public
  const token = getPreviewToken()

  const url = computed(() => unref(slug))
  const uniqueKey = JSON.stringify({ url: url.value, ...unref(options.query) })

  const response = useFetch(url, {
    key: uniqueKey,
    baseURL: config.API_URL || '',
    lazy: true,
    ...options,
    params: {
      ...token,
    },
  })

  if (options.await) {
    watchResponse(response)
  }

  return response
}

/**
 * preview token used in craft cms f.ex.
 */
function getPreviewToken() {
  const route = useRoute()
  return route.query.token ? { token: route.query.token } : null
}

/**
 * used for when the endpoint should be awaited.
 * will inform usePageTransition about pending status and data
 */
function watchResponse(response) {
  useEndpointData.value = 'pending'

  watch(
    response.pending,
    () => {
      setTimeout(() => {
        if (response.pending.value) return

        useEndpointData.value = response.data.value
      })
    },
    { immediate: true }
  )
}
