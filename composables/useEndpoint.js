export const useEndpointIsPending = ref(false)

const getPreviewToken = () => {
  const route = useRoute()
  return route.query.token ? { token: route.query.token } : null
}

// fetches cms-endpoints,
// with default config applied
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
    useEndpointIsPending.value = response.pending.value
    
    watch(response.pending, () => {
      useEndpointIsPending.value = response.pending.value
    })
  }

  return response
}
