import "./tiktok.scss";

let shortform = "block";

export default defineContentScript({
  matches: ["*://*.tiktok.com/*"],
  runAt: "document_start",
  main(ctx) {
    NewObserver(unfeeder, ctx);
    Config(ConfigurationShape["www.tiktok.com"], onUpdate);
    AddNoScroll(scrollBlockerActive, ["ArrowDown", "ArrowUp", " "]);
    unfeeder();
  },
});

function scrollBlockerActive(event: Event) {
  const inComments =
    (event.target as HTMLElement).closest(
      `[class*="DivCommentListContainer"`
    ) !== null;
  return document.URL.includes("video") && shortform !== "show" && !inComments;
}

function onUpdate(key: string, value: string) {
  if (key === "local:tiktok-shortform") shortform = value;
}

function unfeeder() {
  AddPath();
}
