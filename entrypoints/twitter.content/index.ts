import Config from "@/utils/Config";
import "./twitter.scss";
import NewObserver from "@/utils/NewObserver";

export default defineContentScript({
  matches: ["*://*.twitter.com/*", "*://*.x.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.twitter.com"]);
    NewObserver(unfeeder, ctx);
    unfeeder();
  },
});

function unfeeder() {
  addPath();
}
