import NewObserver from "@/components/observer";
import Config from "@/components/config";
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
