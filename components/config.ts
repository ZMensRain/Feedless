export default function Config(
  keys: StorageItemKey[],
  onUpdate?: (key: string, value: string) => {}
) {
  try {
    let unWatches = keys.map((key) =>
      storage.watch<string>(key, (v) => {
        const value = v ?? "true";

        onUpdate?.(key, value);
        update(key, value);
      })
    );
    return {
      unwatch: () => unWatches.forEach((unwatch) => unwatch()),
    };
  } catch (error) {
    keys.map((key) => {
      const value = "true";

      onUpdate?.(key, value);
      update(key, value);
    });
  }

  return {
    unwatch: () => {},
  };
}

function update(key: string, value: string) {
  document.querySelector(":root")?.setAttribute(key, value);
}
