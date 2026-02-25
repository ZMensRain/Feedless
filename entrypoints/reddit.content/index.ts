import NewObserver from "@/components/observer";
import "./reddit.css";
import Config from "@/components/config";

const configKeys: StorageItemKey[] = ["local:hide_reddit_feed"];

export default defineContentScript({
  matches: ["*://www.reddit.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(configKeys);
    NewObserver(unfeeder, ctx);
    unfeeder();
  },
});

function unfeeder() {
  let homePage =
    document.URL == "https://www.reddit.com/" ||
    document.URL.includes("https://www.reddit.com/?");

  document.querySelector("html")?.setAttribute("no-subgrid", String(homePage));
}
