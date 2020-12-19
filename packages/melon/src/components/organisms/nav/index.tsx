import { h, FC, styled } from '@kajitsu/lemon'

const menus = [
  {
    path: '/',
    name: 'Top'
  },
  {
    path: '/blog',
    name: 'Blog'
  }
] as const

type MenuNames = 'Top' | 'Blog'

export const Nav: FC<{ current: MenuNames }> = ({ current }) => (
  <HtmlNav>
    <NavTitle>maxmellon's blog</NavTitle>
    <NavList>
      {menus.map(v => (
        current === v.name
          ? <NavListItem><Current>{v.name}</Current></NavListItem>
          : <NavListItem><a href={v.path}>{v.name}</a></NavListItem>
      ))}
    </NavList>
  </HtmlNav>
)

const NavTitle = styled('h1')`
  font-size: 1.5rem;
  line-height: 1.7;
  display: inline-flex;
`

const HtmlNav = styled('nav')`
  width: 1000px;
  margin: 0 auto;
  height: 100%;
`
const NavList = styled('ol')`
  display: inline-flex;
  vertical-align: top;
  height: 100%;
  line-height: 1.8;
`

const NavListItem = styled('li')`
  padding-left: 3rem;
  line-height: 2.6;
`

const Current = styled('span')`
  font-weight: bold;
`

