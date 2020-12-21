import { h, FC, styled, VNode } from '@kajitsu/lemon'

type Props = {
  headerContents: h.JSX.Element | string | null
  footerContents: h.JSX.Element | string | null
}

export const PageTemplate: FC<Props> = ({ headerContents, children, footerContents }) => (
  <Root>
    {headerContents && (
      <Header>
        {headerContents}
      </Header>
    )}
    <Main>
      {children}
    </Main>
    {footerContents && (
      <Footer>
        {footerContents}
      </Footer>
    )}
  </Root>
);

const Root = styled("div")`
  background-color: var(--main-bg-color);
  color: var(--main-color);
  height: 100%;
  width: 100%;
`

const Header = styled('header')`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--header-bg-color);
  height: 40px;
  color: var(--header-color);
`

const Main = styled('main')`
  height: min(100vh - 40px, 100%);
  width: min(1000px, 95%);
  margin: 0em auto;
`

const Footer = styled("footer")`
`
