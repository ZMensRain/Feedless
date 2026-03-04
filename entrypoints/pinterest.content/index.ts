import NewObserver from "@/components/observer";
import "./pinterest.scss";
import Config, { ConfigurationShape } from "@/components/config";
import AddPath from "@/utils/addPath";

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
