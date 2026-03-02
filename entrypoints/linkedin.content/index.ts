import NewObserver from "@/components/observer";
import "./linkedin.scss";
import Config from "@/components/config";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  runAt: "document_start",
  main(ctx) {
    NewObserver(unfeeder, ctx);
    Config(ConfigurationShape["www.linkedin.com"]);
  },
});

function unfeeder() {}
