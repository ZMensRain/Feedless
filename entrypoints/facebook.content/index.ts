import NewObserver from "@/components/observer";
import Config from "@/components/config";
import "./facebook.css";

const configKeys: StorageItemKey[] = [
  "local:facebook-hide-games",
  "local:facebook-hide-main-feed",
  "local:facebook-hide-videos",
];

export default defineContentScript({
  matches: ["*://*.facebook.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(configKeys);
    NewObserver(unfeeder, ctx);
    unfeeder();
  },
});

function NoParams(url: string): string {
  let obj = new URL(url);

  return obj.origin + obj.pathname;
}

function unfeeder() {
  let url = NoParams(document.URL);
  console.log(url);
  let root = document.querySelector(":root");
  let gamingPage = url.includes("https://www.facebook.com/gaming");
  let homepage = url == "https://www.facebook.com/";
  let videoPage =
    url.includes("https://www.facebook.com/watch/") ||
    url.includes("https://www.facebook.com/reel/");

  root?.setAttribute("page-gaming", String(gamingPage));
  root?.setAttribute("page-home", String(homepage));
  root?.setAttribute("page-watch", String(videoPage));
}
