import { ContentScriptContext } from "#imports";

export default function NewObserver(
  callback: () => void,
  ctx: ContentScriptContext
) {
  const h: MutationCallback = (mutations) => {
    for (let mutation of mutations) {
      if (mutation.type == "childList") {
        if (mutation.addedNodes.length > 0) {
          callback();
        }
      }
    }
  };

  let observer = new MutationObserver(h);

  observer.observe(document, { childList: true, subtree: true });

  ctx.addEventListener(window, "wxt:locationchange", callback);

  return observer;
}
