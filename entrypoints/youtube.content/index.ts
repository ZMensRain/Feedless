import NewObserver from "@/components/observer";
import "./youtube.css";
import Config from "@/components/config";
var menuClosedFlag = false;

const configKeys: StorageItemKey[] = [];

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(configKeys);
    NewObserver(unfeeder, ctx);
  },
});

function unfeeder() {
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
