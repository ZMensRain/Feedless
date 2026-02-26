import NewObserver from "@/components/observer";
import Config from "@/components/config";
import "./facebook.css";

const configKeys: StorageItemKey[] = [
  "local:facebook-hide-games",
  "local:facebook-hide-main-feed",
  "local:facebook-hide-videos",
  "local:facebook-marketplace-searchbox",
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

  url = obj.origin + obj.pathname;

  if (url[url.length - 1] != "/") url += "/";

  return url;
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

  let marketPage = isMarketplaceUrlTrue(url);

  root?.setAttribute("page-gaming", String(gamingPage));
  root?.setAttribute("page-home", String(homepage));
  root?.setAttribute("page-watch", String(videoPage));
  root?.setAttribute("page-marketplace", String(marketPage));
}

export function isMarketplaceUrlTrue(urlString: string): boolean {
  try {
    // Parse the URL; this will throw if the string is not a valid URL.
    const url = new URL(urlString);
    const path = url.pathname;

    const notFeedPattern =
      /marketplace\/(inbox|notifications|status|you|item|groups)/;
    if (notFeedPattern.test(path)) {
      return false;
    }

    if (path.includes("search")) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
