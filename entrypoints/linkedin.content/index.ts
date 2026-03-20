import NewObserver from "@/utils/NewObserver";
import "./linkedin.scss";
import Config from "@/utils/Config";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  runAt: "document_start",
  main(ctx) {
    NewObserver(unfeeder, ctx);
    Config(ConfigurationShape["www.linkedin.com"]);
  },
});

function unfeeder() {}
