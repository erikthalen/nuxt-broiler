/**
 * global ref to current endpoint data
 */
export const useEndpointData = ref(true)

/**
 * preview token used in craft cms f.ex.
 */
const getPreviewToken = () => {
  const route = useRoute()
  return route.query.token ? { token: route.query.token } : null
}

/**
 * useEndpoint
 *
 * wrapper for useFetch() with appended default values and some lifecycle control
 */
export const useEndpoint = async (slug, options = {}) => {
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
    useEndpointData.value = null

    watch(
      response.pending,
      () => {
        useEndpointData.value = response.data.value
      },
      { immediate: true }
    )
  } else {
    useEndpointData.value = {}
  }

  return response
}
