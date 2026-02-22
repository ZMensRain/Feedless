import "./tiktok.css";

export default defineContentScript({
  matches: ["*://*.tiktok.com/*"],
  main(ctx) {
    let observer = new MutationObserver(observe);
    observer.observe(document, { childList: true, subtree: true });

    ctx.addEventListener(window, "wxt:locationchange", ({ newUrl }) => {
      unfeed();
    });
  },
});

function observe(mutations: MutationRecord[]) {
  for (let mutation of mutations) {
    if (mutation.type == "childList") {
      if (mutation.addedNodes.length > 0) {
        unfeed();
      }
    }
  }
}

function unfeed() {
  // nukes shorts
  let body = document.querySelector("body");
  if (body != undefined) body.innerHTML = "";
}
