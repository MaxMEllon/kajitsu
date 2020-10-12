import { h, FC, styled } from "@kajitsu/lemon";
import { atomsStories } from "./import";

export const Root: FC = () => {
  return (
    <Main>
      <Sidebar role="menu">
        <section>
          <GroupHeader>atoms</GroupHeader>
          <ul>
            {atomsStories.map((scenario) => (
              <li>
                <Button role="menuitem" class="story-select-button">
                  {scenario.key}
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </Sidebar>
      <Section>
        <iframe id="story" />
      </Section>
    </Main>
  );
};

const Main = styled("main")`
  width: 100%;
  height: 100%;
`;

const Sidebar = styled("nav")`
  position: absolute;
  border-right: 1px solid gray;
  height: 100%;
  width: 250px;
  background-color: #e4e4e4;
`;

const GroupHeader = styled("h2")`
  font-weight: bold;
`;

const Section = styled("section")`
  position: absolute;
  left: 250px;
  width: calc(100% - 250px);
`;

const Button = styled("button")`
  width: 100%;
  height: 25px;
`;
