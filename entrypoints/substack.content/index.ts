import NewObserver from "@/utils/NewObserver";
import "./substack.scss";
import Config from "@/utils/Config";
import AddPath from "@/utils/AddPath";

export default defineContentScript({
  matches: ["*://substack.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["substack.com"]);
    NewObserver(unfeeder, ctx);
    unfeeder();
  },
});

function unfeeder() {
  AddPath();
}
