export default async function Config(
  keys: StorageItemKey[],
  onUpdate?: (key: string, value: string) => {}
) {
  try {
    let unWatches = keys.map(async (key) => {
      let value = await storage.getItem<string>(key);
      update(key, value ?? "true");
      return storage.watch<string>(key, (v) => {
        const value = v ?? "true";

        onUpdate?.(key, value);
        update(key, value);
      });
    });
    return {
      unwatch: () => unWatches.forEach(async (unwatch) => (await unwatch)()),
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
  console.log(key);
  key = key.replaceAll("local:", "");
  document.querySelector(":root")?.setAttribute(key, value);
}
