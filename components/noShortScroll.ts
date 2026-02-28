export default function AddNoScroll(
  blocked: (key: string) => boolean,
  keys: string[]
) {
  const preventScroll = (event: Event) => {
    if (blocked(event.type)) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const removeCertainKeys = (event: KeyboardEvent) => {
    if (keys.includes(event.key) && !blocked(event.key)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const passive = false;

  // prevent only those keys that are used for scrolling
  window.addEventListener("keydown", removeCertainKeys, { passive });

  // prevent other events that are used for scrolling
  const events = ["scroll", "wheel", "touchmove", "pointerdown", "pointerup"];
  events.forEach((eventType) =>
    window.addEventListener(eventType, preventScroll, { passive })
  );
}
