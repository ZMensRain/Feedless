import NewObserver from "@/components/observer";
import Config from "@/components/config";
import "./tiktok.scss";
import AddNoScroll from "@/components/noShortScroll";

let shortform = "block";

export default defineContentScript({
  matches: ["*://*.tiktok.com/*"],
  runAt: "document_start",
  main(ctx) {
    NewObserver(unfeeder, ctx);
    Config(ConfigurationShape["www.tiktok.com"], onUpdate);
    AddNoScroll(
      () => document.URL.includes("video") && shortform !== "show",
      ["ArrowDown", "ArrowUp", " "]
    );
    unfeeder();
  },
});

function onUpdate(key: string, value: string) {
  if (key === "tiktok-shortform") shortform = value;
}

function unfeeder() {
  addPath();
  // nukes shorts
  // let body = document.querySelector("body");
  // if (body != undefined) body.innerHTML = "";
}
