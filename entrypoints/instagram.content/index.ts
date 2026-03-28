import "./instagram.scss";

let shortform = "show";

export default defineContentScript({
  matches: ["*://*.instagram.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.instagram.com"], onUpdate);
    NewObserver(unfeeder, ctx);
    AddNoScroll(scrollBlockerActive, ["ArrowDown", "ArrowUp", " "]);
    unfeeder();
  },
});

function scrollBlockerActive(event: Event) {
  const inComments =
    (event.target as HTMLElement).closest("div:has(a img):not(:has(video))") !==
    null;
  return document.URL.includes("reel") && shortform !== "show" && !inComments;
}

function onUpdate(key: string, value: string) {
  if (key === "local:instagram-shortform") shortform = value;
}

function unfeeder() {
  AddPath();
}
