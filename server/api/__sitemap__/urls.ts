import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (event) => {
    const contentList = (await serverQueryContent(event).find()) as ParsedContent[]
    return contentList
      .map((c) => {
        return asSitemapUrl({
          loc: `${c._path}`,
          changefreq: 'weekly'
        })
      })
  })