import { h, FC, styled } from "@kajitsu/lemon";
import { PageTemplate } from "../../components/templates/page";
import { Nav } from "../../components/organisms/nav";
import { articles } from "./articles";

export const Blog: FC = () => {
  const header = <Nav />;
  return (
    <PageTemplate headerContents={header} footerContents={null}>
      <H1>記事一覧</H1>
      {Object.entries(articles).reverse().map(([year, list]) => (
        <section>
          <Year>{year}</Year>
          <UnOrderedList>
            {list.map((article) => (
              <ListItem>
                <ArticleFlex>
                  <Time datetime={article.date}>{article.date}</Time>
                  <a href={`/blog/${article.key}`}>{article.title}</a>
                </ArticleFlex>
              </ListItem>
            ))}
          </UnOrderedList>
        </section>
      ))}
    </PageTemplate>
  );
};

const Time = styled("time")`
  margin-right: 12px;
  max-width: 100px;
  min-width: 100px;
  width: 100px;
`

const ArticleFlex = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
`

const H1 = styled("h1")`
  font-size: 32px;
  margin: 20px 0;
`;

const Year = styled("h2")`
  font-size: 28px;
`;

const UnOrderedList = styled("ul")`
  margin: 10px 0;
  list-style-type: disc;
  margin-left: 26px;
`;

const ListItem = styled("li")``;
