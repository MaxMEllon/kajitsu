import { h, FC, styled } from "@kajitsu/lemon";
import { atomsStories } from "./import";

export const Root: FC = () => {
  return (
    <main>
      <Sidebar>
        <ul>
          {atomsStories.map((scenario) => (
            <p>
              {/* @ts-ignore */}
              <button>{scenario.key}</button>
            </p>
          ))}
        </ul>
      </Sidebar>
      <Section>
        {/* @ts-ignore */}
        <iframe />
        {/* @ts-ignore */}
        <script>{script}</script>
      </Section>
    </main>
  );
};

const Sidebar = styled("nav")`
  position: absolute;
  border-right: 1px solid gray;
  height: 100%;
  width: 250px;
  background-color: #e4e4e4;
`;

const Section = styled("section")`
  position: absolute;
  left: 250px;
  width: calc(100% - 250px);
`;

const script = `
  const iframe = document.querySelector('iframe')
  const buttons = document.querySelectorAll('button')
  for (const b of buttons) {
    b.addEventListener('click', () => {
      iframe.src = '/' + b.innerText
    })
  }
`;
