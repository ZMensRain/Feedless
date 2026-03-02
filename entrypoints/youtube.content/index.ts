import NewObserver from "@/components/observer";
import "./youtube.scss";
import Config, { ConfigurationShape } from "@/components/config";
import AddPath from "@/utils/addPath";
import AddNoScroll from "@/components/noShortScroll";

let shortform = "show";
let menuBarClosed = false;

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.youtube.com"], onUpdate);
    NewObserver(unfeeder, ctx);
    AddNoScroll(
      () => !document.URL.includes("shorts") && shortform === "show",
      ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "]
    );
    unfeeder();
  },
});

function onUpdate(key: string, value: string) {
  if (key === "youtube-shortform") shortform = value;
}

function unfeeder() {
  AddPath();
  if (!menuBarClosed) {
    (document.querySelector("#guide-button") as HTMLButtonElement).click();
    menuBarClosed = true;
  }
}
