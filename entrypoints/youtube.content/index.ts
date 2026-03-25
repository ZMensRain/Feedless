import "./youtube.scss";

let shortform = "show";
let hideNextFeed = "true";

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.youtube.com"], onUpdate);
    NewObserver(unfeeder, ctx);
    AddNoScroll(
      () => document.URL.includes("shorts") && shortform !== "show",
      ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "]
    );
    unfeeder();
  },
});

function onUpdate(key: string, value: string) {
  if (key === "local:youtube-shortform") shortform = value;
  if (key === "local:youtube-hide-up-next-feed") hideNextFeed = value;
}

function unfeeder() {
  AddPath();

  // close the sidebar
  const menuButton = document.getElementById("guide-button");
  const menuButtonButton = document.querySelector("#guide-button #button");

  if (
    menuButton &&
    menuButtonButton &&
    menuButtonButton.getAttribute("aria-pressed") == "true" &&
    menuButton.getAttribute("feedless-pressed") != "true"
  ) {
    menuButton.setAttribute("feedless-pressed", "true");
    menuButton.click();
  }

  if (shortform !== "show" && document.URL.includes("results")) {
    document.querySelectorAll("yt-chip-cloud-chip-renderer").forEach((e) => {
      if (e.innerHTML.includes("Shorts")) {
        e.remove();
      }
    });
  }

  if (hideNextFeed === "true") {
    (
      document.querySelector(
        "button.ytp-autonav-toggle:has([aria-checked='true']"
      ) as HTMLButtonElement | undefined
    )?.click();
  }
}
