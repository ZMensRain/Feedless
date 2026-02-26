import NewObserver from "@/components/observer";
import Config from "@/components/config";
import "./instagram.css";
import NoParams from "@/components/noParams";

const configKeys: StorageItemKey[] = [
  "local:instagram-no-reels",
  "local:instagram-no-feed",
  "local:instagram-no-explore",
];

function addScrollListeners() {
  const preventScroll = (event: Event) => {
    if (!document.URL.includes(".com/reels")) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const removeCertainKeys = (event: KeyboardEvent) => {
    // Blocking left and right arrows on /creator/reels
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!document.URL.includes(".com/reels")) return;
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === " "
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const passive = false;

  // prevent only those keys that are used for scrolling
  window.addEventListener("keydown", removeCertainKeys, { passive });

  // prevent other events that are used for scrolling
  const events = ["scroll", "wheel", "touchmove", "pointerdown", "pointerup"];
  events.forEach((eventType) =>
    window.addEventListener(eventType, preventScroll, { passive })
  );
}

export default defineContentScript({
  matches: ["*://*.instagram.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(configKeys);
    NewObserver(unfeeder, ctx);
    unfeeder();
  },
});

function unfeeder() {
  let url = NoParams(document.URL);
  let root = document.querySelector(":root");
  let homepage = url == "https://www.instagram.com/";
  let explorePage = url == "https://www.instagram.com/explore/";

  root?.setAttribute("page-home", String(homepage));
  root?.setAttribute("page-explore", String(explorePage));

  // TODO could be a problem with adding many event listeners that do the same thing
  if (document.URL.includes("reels")) {
    addScrollListeners();
  }
}
