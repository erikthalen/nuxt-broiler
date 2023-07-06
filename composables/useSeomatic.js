// fetch seomatic data,
// keeps itself up-to-date on page shifts
export default async (config, route) => {
  const url = '/actions/seomatic/meta-container/all-meta-containers/'

  const { data } = await useFetch(url, {
    baseURL: config.CMS_URL,
    query: {
      uri: computed(() => route.path),
      asArray: true,
    },
  })

  return {
    seomatic: {
      title: computed(() => data.value?.MetaTitleContainer.title.title),
      meta: computed(() =>
        Object.values(data.value?.MetaTagContainer || {}).filter(
          tag => tag.content
        )
      ),
      link: computed(() =>
        Object.values(data.value?.MetaLinkContainer || {}).filter(
          tag => tag.rel
        )
      ),
      script: computed(() => [
        ...Object.values(data.value?.MetaJsonLdContainer || {}).map(schema => ({
          type: 'application/ld+json',
          children: JSON.stringify(schema),
        })),
        ...Object.values(data.value?.MetaScriptContainer || {}).map(tag => ({
          children: tag.script,
        })),
      ]),
    },
    bodyScripts: computed(() =>
      Object.values(data.value?.MetaScriptContainer || {}).map(
        tag => tag.bodyScript
      )
    ),
  }
}
