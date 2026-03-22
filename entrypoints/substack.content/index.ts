import "./substack.scss";

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
