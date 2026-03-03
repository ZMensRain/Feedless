import "./youtube_music.scss";
import NewObserver from "@/components/observer";
import Config, { ConfigurationShape } from "@/components/config";
import AddPath from "@/utils/addPath";
import AddNoScroll from "@/components/noShortScroll";

export default defineContentScript({
  matches: ["*://music.youtube.com/*"],
  runAt: "document_start",
  main(ctx) {
    Config(ConfigurationShape["music.youtube.com"]);
    NewObserver(unfeeder, ctx);

    unfeeder();
  },
});

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
}
