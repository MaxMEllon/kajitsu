import { h, FC, styled } from '@kajitsu/lemon'

export const Blog: FC = () => (
  <div id="root">
    <Header>
    </Header>
    <Main>
    </Main>
  </div>
)

const Header = styled('header')`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--header-color);
  height: 40px;
`

const Main = styled('main')`
  background-color: var(--main-color);
  height: min(100vh, 100%);
`
