import "./instagram.scss";

let shortform = "show";

export default defineContentScript({
  matches: ["*://*.instagram.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["www.instagram.com"], onUpdate);
    NewObserver(unfeeder, ctx);
    AddNoScroll(
      () => document.URL.includes("reel") && shortform !== "show",
      ["ArrowDown", "ArrowUp", " "]
    );
    unfeeder();
  },
});

function onUpdate(key: string, value: string) {
  if (key === "local:instagram-shortform") shortform = value;
}

function unfeeder() {
  AddPath();
}
