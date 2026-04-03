import "./youtube_mobile.scss";

let hideNextFeed = "false";
let shortform = "show";

export default defineContentScript({
  matches: ["*://m.youtube.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.youtube.com"], onUpdate);
    NewObserver(unfeeder, ctx);
    AddNoScroll(scrollBlockerActive, ["ArrowDown", "ArrowUp"]);
    unfeeder();
  },
});

function scrollBlockerActive(event: Event) {
  const inComments =
    (event.target as HTMLElement).closest("panel-container") !== null;

  return document.URL.includes("shorts") && shortform !== "show" && !inComments;
}

function onUpdate(key: string, value: string) {
  if (key === "local:youtube-shortform") shortform = value;
  if (key === "local:youtube-hide-up-next-feed") hideNextFeed = value;
}

function unfeeder() {
  AddPath();

  if (hideNextFeed === "true") {
    (
      document.querySelector(
        "button.ytm-autonav-toggle-button-container[aria-pressed='true']"
      ) as HTMLButtonElement | undefined
    )?.click();
  }
}
