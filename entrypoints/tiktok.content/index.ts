import "./tiktok.scss";

let shortform = "block";

export default defineContentScript({
  matches: ["*://*.tiktok.com/*"],
  runAt: "document_start",
  main(ctx) {
    NewObserver(unfeeder, ctx);
    Config(ConfigurationShape["www.tiktok.com"], onUpdate);
    AddNoScroll(
      () => document.URL.includes("video") && shortform !== "show",
      ["ArrowDown", "ArrowUp", " "]
    );
    unfeeder();
  },
});

function onUpdate(key: string, value: string) {
  if (key === "local:tiktok-shortform") shortform = value;
}

function unfeeder() {
  AddPath();
}
