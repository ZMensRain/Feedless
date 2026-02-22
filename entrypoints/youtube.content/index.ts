import "./youtube.css";
var menuClosedFlag = false;

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
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
  if (document.URL.includes("shorts")) {
    let body = document.querySelector("#primary");
    if (body != undefined) body.innerHTML = "";
  }

  // removes the grid on home screen of youtube
  if (document.URL != "https://www.youtube.com/") return;
  let primary = document.getElementById("primary");
  if (primary != undefined) primary.innerHTML = "";

  // close the sidebar
  if (!menuClosedFlag) {
    let button = document.querySelector(
      "#masthead #guide-button button[aria-pressed='true']"
    ) as HTMLButtonElement;

    if (button != undefined) {
      button.click();
      menuClosedFlag = true;
    }
  }
}
