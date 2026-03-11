import NewObserver from "@/components/observer";
import "./substack.scss";
import Config from "@/components/config";
import AddPath from "@/utils/addPath";

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
