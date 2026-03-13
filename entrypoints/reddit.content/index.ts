import NewObserver from "@/components/observer";
import "./reddit.scss";
import Config from "@/components/config";
import AddPath from "@/utils/addPath";

export default defineContentScript({
  matches: ["*://www.reddit.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.reddit.com"]);
    NewObserver(unfeeder, ctx);
    unfeeder();
  },
});

function unfeeder() {
  AddPath();

  (
    document.querySelector(".flex-nav-expanded #flex-nav-collapse-button") as
      | HTMLButtonElement
      | undefined
  )?.click();
}
