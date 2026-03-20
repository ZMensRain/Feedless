import NewObserver from "@/utils/NewObserver";
import "./pinterest.scss";
import Config, { ConfigurationShape } from "@/utils/Config";
import AddPath from "@/utils/AddPath";

export default defineContentScript({
  matches: ["*://*.pinterest.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["pinterest.com"]);
    NewObserver(unfeeder, ctx);
    unfeeder();
  },
});

function unfeeder() {
  AddPath();
}
