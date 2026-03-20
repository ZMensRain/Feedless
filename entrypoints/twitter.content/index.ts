import "./twitter.scss";

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
  AddPath();
}
