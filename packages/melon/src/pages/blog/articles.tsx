import { h, Fragment } from "@kajitsu/lemon";
import { PageTemplate } from "../../components/templates/page";
import { Nav } from "../../components/organisms/nav";

type Articles = {
  [year: string]: Array<{
    title: string;
    date: string;
    key: string;
    extendsHeader: () => Promise<h.JSX.Element>;
    renderer: (nonce?: string) => Promise<h.JSX.Element>;
  }>;
};

export const articles: Articles = {
  "2020": [
    {
      title: "node modules に依存しない blog を作っている話",
      date: '2020-12-21',
      key: "20201221",
      extendsHeader: async () => {
        return (
          <>
            <meta property="og:url" content="https://me1on.dev/blog/20201221" />
            <meta property="og:title" content="node modules に依存しない blog を作っている話" />
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
  "2021": [
    {
      title: "tc39/proposal-pipeline-operator の過去と現状",
      date: '2021-12-04',
      key: "20211204",
      extendsHeader: async () => {
        return (
          <>
            <meta property="og:url" content="https://me1on.dev/blog/20211204" />
            <meta property="og:title" content="tc39/proposal-pipeline-operator の過去と現状" />
            <meta property="og:site_name" content="maxmellon's blog" />
            <meta name="twitter:card" content="summary" />
          </>
        );
      },
      renderer: async (nonce?: string) => {
        const header = <Nav />;
        const Article = await import("./20211204").then((r) => r.Article);
        return (
          <PageTemplate headerContents={header} footerContents={null}>
            <Article nonce={nonce} />
          </PageTemplate>
        );
      },
    },
  ],
};
