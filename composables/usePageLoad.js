export default (el, { pageLoads = {}, defaultPageLoad = {} } = {}) => {
  const router = useRouter()

  const getPageLoad = route => {
    return pageLoads[route] || defaultPageLoad
  }

  const currentRoute = computed(
    () =>
      router
        .getRoutes()
        .find(({ name }) => name === router.currentRoute.value.name).name
  )
  const style = ref(null)
  const currentPageLoad = getPageLoad(currentRoute.value)

  onServerPrefetch(() => {
    // init setup, before the dom is painted
    currentPageLoad.onBeforeEnter(el.value, style)
  })

  onMounted(async () => {
    if (!process.client) return

    // the transition
    await currentPageLoad.onEnter(el.value, style)

    // after transition, individual clean up
    currentPageLoad.onAfterEnter(el.value, style)

    // after everything, global clean up
    style.value = null
    useEndpointData.value = null
  })

  return { style }
}
