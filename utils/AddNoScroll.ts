export default function AddNoScroll(
  isActive: (event: Event) => boolean,
  keys: string[]
) {
  const preventScroll = (event: Event) => {
    if (!isActive(event)) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const removeCertainKeys = (event: KeyboardEvent) => {
    if (!isActive(event)) return;
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const passive = false;

  // prevent only those keys that are used for scrolling
  window.addEventListener("keydown", removeCertainKeys, {
    capture: true,
    passive,
  });
  window.addEventListener("keyup", removeCertainKeys, {
    capture: true,
    passive,
  });
  // prevent other events that are used for scrolling
  const events = [
    "scroll",
    "wheel",
    "mousewheel",
    "DOMMouseScroll",
    "scrollend",
    "dragstart",
    "dragend",
    "drag",
  ];
  events.forEach((eventType) =>
    window.addEventListener(eventType, preventScroll, {
      passive,
      capture: true,
    })
  );
}
