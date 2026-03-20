import "./facebook.scss";

let shortform = "show";

export default defineContentScript({
  matches: ["*://*.facebook.com/*"],
  runAt: "document_start",
  main(ctx) {
    AddNoScroll(
      () => document.URL.includes("reel") && shortform !== "show",
      ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", " "]
    );
    Config(ConfigurationShape["www.facebook.com"], onUpdate);
    NewObserver(unfeeder, ctx);

    unfeeder();
  },
});

function onUpdate(key: string, value: string) {
  if (key === "local:facebook-shortform") shortform = value;
}

function unfeeder() {
  AddPath();
}
