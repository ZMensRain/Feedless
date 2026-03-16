import "./bsky.scss";
import AddParams from "@/utils/addParams";

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
  AddPath();
  AddParams();
}
