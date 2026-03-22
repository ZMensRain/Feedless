import "./linkedin.scss";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  runAt: "document_start",
  main(ctx) {
    NewObserver(unfeeder, ctx);
    Config(ConfigurationShape["www.linkedin.com"]);
  },
});

function unfeeder() {}
