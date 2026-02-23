import "./reddit.css";

export default defineContentScript({
  matches: ["*://www.reddit.com/*"],
  runAt: "document_start",
  main(ctx) {
    console.log("hello reddit");
    ctx.addEventListener(window, "wxt:locationchange", unfeed);
    unfeed();
  },
});

function unfeed() {
  let homePage =
    document.URL == "https://www.reddit.com/" ||
    document.URL.includes("https://www.reddit.com/?");

  document.querySelector("html")?.setAttribute("no-subgrid", String(homePage));
}
