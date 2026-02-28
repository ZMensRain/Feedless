import NewObserver from "@/components/observer";
import Config from "@/components/config";
import "./instagram.scss";
import AddNoScroll from "@/components/noShortScroll";
import AddPath from "@/utils/addPath";

export default defineContentScript({
  matches: ["*://*.instagram.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.instagram.com"]);
    NewObserver(unfeeder, ctx);
    AddNoScroll(
      () => !document.URL.includes("reel"),
      ["ArrowDown", "ArrowUp", " "]
    );
    unfeeder();
  },
});

function unfeeder() {
  AddPath();
}
