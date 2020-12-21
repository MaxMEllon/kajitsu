import { h, FC, styled } from '@kajitsu/lemon'

export const Nav: FC = () => (
  <HtmlNav>
    <NavTitle>maxmellon's blog</NavTitle>
    <NavList>
      <NavListItem><a href="/">Blog</a></NavListItem>
    </NavList>
  </HtmlNav>
)

const NavTitle = styled('h1')`
  font-size: 1.5rem;
  line-height: 1.7;
  display: inline-flex;
`

const HtmlNav = styled('nav')`
  width: min(1000px, 95%);
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
