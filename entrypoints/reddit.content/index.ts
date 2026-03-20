import NewObserver from "@/utils/NewObserver";
import "./reddit.scss";
import Config from "@/utils/Config";
import AddPath from "@/utils/AddPath";

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
