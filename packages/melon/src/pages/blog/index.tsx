import { h, FC } from '@kajitsu/lemon'
import { PageTemplate } from '../../components/templates/page'
import { Nav } from '../../components/organisms/nav'

export const Blog: FC = () => {
  const header = <Nav current="Blog" />
  return (
    <PageTemplate headerContents={header} footerContents={null}>
    </PageTemplate>
  )
};
