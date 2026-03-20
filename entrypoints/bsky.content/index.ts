import NewObserver from "@/utils/NewObserver";
import Config from "@/utils/Config";
import "./bsky.scss";

export default defineContentScript({
  matches: ["*://bsky.app/*"],
  runAt: "document_start",
  main(ctx) {
    NewObserver(unfeeder, ctx);
    Config(ConfigurationShape["bsky.app"]);
    unfeeder();
  },
});

function unfeeder() {
  addPath();
}
