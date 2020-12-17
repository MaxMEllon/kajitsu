import { h, FC, styled } from '@kajitsu/lemon'

export const Blog: FC = () => (
  <div id="root">
    <Header>
      <Nav>
        <NavTitle>maxmellon's blog</NavTitle>
        <NavList>
          <NavListItem>
            <a href="/">Top</a>
          </NavListItem>
          <NavListItem>
            <Current>Blog</Current>
          </NavListItem>
        </NavList>
      </Nav>
    </Header>
    <Main>
    </Main>
  </div>
);

const Header = styled('header')`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--header-color);
  height: 40px;
  color: white;
`

const NavTitle = styled('h1')`
  font-size: 1.5rem;
  line-height: 1.7;
  display: inline-flex;
`

const Nav = styled('nav')`
  width: 1000px;
  margin: 0 auto;
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

const Main = styled('main')`
  background-color: var(--main-color);
  height: min(calc(100vh - 40px), 100%);
  margin: 0em auto;
`
