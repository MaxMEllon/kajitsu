import { h, Fragment } from '@kajitsu/lemon'
import { PageTemplate } from '../../components/templates/page'
import { Nav } from '../../components/organisms/nav'

type Articles = {
  [year: string]: Array<{
    title: string
    key: string
    extendsHeader: () => Promise<h.JSX.Element>
    renderer: () => Promise<h.JSX.Element>
  }>
}

export const articles: Articles = {
  '2020': [
    {
      title: 'no dependencies で blog を作っている話',
      key: '20201221',
      extendsHeader: async () => {
        return (
          <>
            <meta property="og:url" content="" />
            <meta property="og:title" content="no dependencies で blog を作っている話" />
            <meta property="og:site_name" content="maxmellon's blog" />
          </>
        )
      },
      renderer: async () => {
        const header = <Nav />
        const Article = await import('./20201221').then(r => r.Article)
        return (
          <PageTemplate headerContents={header} footerContents={null}>
            <Article />
          </PageTemplate>
        )
      }
    }
  ]
}
