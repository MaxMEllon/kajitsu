import { h, Fragment } from "@kajitsu/lemon";
import { PageTemplate } from "../../components/templates/page";
import { Nav } from "../../components/organisms/nav";

type Articles = {
  [year: string]: Array<{
    title: string;
    key: string;
    extendsHeader: () => Promise<h.JSX.Element>;
    renderer: () => Promise<h.JSX.Element>;
  }>;
};

export const articles: Articles = {
  "2020": [
    {
      title: "node modules なし blog を作っている話",
      key: "20201221",
      extendsHeader: async () => {
        return (
          <>
            <meta property="og:url" content="https://me1on.dev/blog/20201221" />
            <meta property="og:title" content="node modules なし blog を作っている話" />
            <meta property="og:site_name" content="maxmellon's blog" />
            <meta name="twitter:card" content="summary" />
          </>
        );
      },
      renderer: async () => {
        const header = <Nav />;
        const Article = await import("./20201221").then((r) => r.Article);
        return (
          <PageTemplate headerContents={header} footerContents={null}>
            <Article />
          </PageTemplate>
        );
      },
    },
  ],
};
