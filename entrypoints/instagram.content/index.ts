import NewObserver from "@/components/observer";
import Config from "@/components/config";
import "./instagram.scss";
import AddNoScroll from "@/components/noShortScroll";
import AddPath from "@/utils/addPath";

let shortform = "show";

export default defineContentScript({
  matches: ["*://*.instagram.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.instagram.com"], onUpdate);
    NewObserver(unfeeder, ctx);
    AddNoScroll(
      () => document.URL.includes("reel") && shortform !== "show",
      ["ArrowDown", "ArrowUp", " "]
    );
    unfeeder();
  },
});

function onUpdate(key: string, value: string) {
  if (key === "instagram-shortform") shortform = value;
}

function unfeeder() {
  AddPath();
}
