/**
 * handle browser url queries,
 * used for filtering etc.
 * 
 * useFetch re-fetches when query changes and "query" is computed:
 * 
 * await useFetch('endpoint', {
 *   query: computed(() => { some: 'value' })
 * })
 */
export default () => {
  const router = useRouter()
  const route = useRoute()

  /**
   * if url is:
   * ?category=1796&q=abc
   * 
   * and you run:
   * addQuery({ key: 'category', value: 1234 })
   * 
   * url becomes:
   * ?category=1796,1234&q=abc
   * 
   */
  const addQuery = ({ key, value }) => {
    const newQuery = !route.query[key] ? value : `${route.query[key]},${value}`

    router.push({
      query: {
        ...route.query,
        [key]: newQuery,
      },
    })
  }

  /**
   * if url is:
   * ?category=1796&q=abc
   * 
   * and you run:
   * replaceQuery({ key: 'q', value: 'new-query' })
   * 
   * url becomes:
   * ?category=1796&q=new-query
   * 
   */
  const replaceQuery = ({ key, value }) => {
    if (value) {
      router.push({
        query: {
          ...route.query,
          [key]: value,
        },
      })
    } else {
      router.push({ query: { ...route.query, [key]: undefined } })
    }
  }

  /**
   * if url is:
   * ?category=1796,1234&q=abc
   * 
   * and you run:
   * removeQuery({ key: 'category', value: 1234 })
   * 
   * url becomes:
   * ?category=1796&q=abc
   * 
   */
  const removeQuery = ({ key, value }) => {
    const trimCommas = str =>
      str.replace(/^,+/, '').replace(/,+$/, '').replaceAll(',,', ',')
    const newQuery = trimCommas(route.query[key].replace(value, ''))

    if (newQuery) {
      router.push({
        query: {
          ...route.query,
          [key]: newQuery,
        },
      })
    } else {
      router.push({ query: { ...route.query, [key]: undefined } })
    }
  }

  /**
   * if url is:
   * ?category=1796&q=abc
   * 
   * and you run:
   * hasQuery({ key: 'category', value: 1796 })
   * 
   * you get back:
   * true
   * 
   */
  const hasQuery = ({ key, value }) => {
    if (!value) {
      return !!route.query[key]
    }

    return route.query[key]
      ? route.query[key].split(',').includes(value.toString())
      : false
  }

  /**
   * if url is:
   * ?category=1796,123&q=abc
   * 
   * and you run:
   * getQuery({ key: 'category' })
   * 
   * you get back:
   * [1796, 123]
   * 
   */
  const getQuery = ({ key }) => {
    return route.query[key]?.split(',')
  }

  /**
   * if url is:
   * ?category=1796&genre=1853&q=abc
   * 
   * and you run:
   * resetQuery('category')
   * 
   * url becomes:
   * ?genre=1853&q=abc
   * 
   * or...
   * 
   * if url is:
   * ?category=1796&genre=1853&q=abc
   * 
   * and you run:
   * resetQuery(['category', 'genre'])
   * 
   * url becomes:
   * ?q=abc
   * 
   */
  const resetQuery = keys => {
    const rawKeys = [].concat(unref(keys))

    const blankQuery = rawKeys.reduce(
      (acc, cur) => ({ ...acc, [cur]: undefined }),
      {}
    )
    const newQuery = { ...route.query, ...blankQuery }

    router.push({ query: newQuery })
  }

  const toggleQuery = ({ key, value }) => {
    if (hasQuery({ key, value })) {
      removeQuery({ key, value })
    } else {
      addQuery({ key, value })
    }
  }

  return {
    addQuery,
    removeQuery,
    replaceQuery,
    hasQuery,
    getQuery,
    resetQuery,
    toggleQuery,
  }
}
