const iframe = document.querySelector("iframe#story");
const buttons = document.querySelectorAll("button");

for (const b of buttons) {
  b.addEventListener("click", () => {
    iframe.src = "/" + b.innerText;
  });
}
