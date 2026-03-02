export default async function Config(
  config: PlatformConfiguration,
  onUpdate?: (key: string, value: string) => void
) {
  try {
    return fromStorage(config, onUpdate);
  } catch (error) {
    return fromDefaults(config, onUpdate);
  }
}

function fromStorage(
  config: PlatformConfiguration,
  onUpdate?: (key: string, value: string) => void
) {
  let unWatches = config.Keys.map(async (key) => {
    let value = await storage.getItem<string>(key.Key);
    update(key.Key, value ?? key.possibleValues[key.DefaultValue]);
    return storage.watch<string>(key.Key, (v) => {
      const value = v ?? "true";
      onUpdate?.(key.Key, value);
      update(key.Key, value);
    });
  });
  return {
    unwatch: () => unWatches.forEach(async (unwatch) => (await unwatch)()),
  };
}

function fromDefaults(
  config: PlatformConfiguration,
  onUpdate?: (key: string, value: string) => void
) {
  config.Keys.map((key) => {
    const value = key.possibleValues[key.DefaultValue];
    onUpdate?.(key.Key, value);
    update(key.Key, value);
  });
  return { unwatch: () => {} };
}

function update(key: string, value: string) {
  key = key.replaceAll("local:", "");
  document.querySelector(":root")?.setAttribute(key, value);
}

export type ConfigurationKey = {
  Key: StorageItemKey;
  possibleValues: string[];
  DefaultValue: number; // index from the possible values
};

export type PlatformConfiguration = {
  Keys: ConfigurationKey[];
};

export const ConfigurationShape: Record<string, PlatformConfiguration> = {
  "www.youtube.com": {
    Keys: [
      ...shortFormKeys("youtube"),
      ...feedKeys("youtube"),
      {
        Key: "local:youtube-hide-end-screen",
        DefaultValue: 0,
        possibleValues: ["true", "false"],
      },
    ],
  },
  "www.linkedin.com": {
    Keys: [
      ...feedKeys("linkedin"),
      {
        Key: "local:linkedin-hide-premium-upsells",
        DefaultValue: 0,
        possibleValues: ["true", "false"],
      },
      {
        Key: "local:linkedin-hide-add-to-your-feed",
        DefaultValue: 0,
        possibleValues: ["true", "false"],
      },
    ],
  },
  "www.reddit.com": { Keys: feedKeys("reddit") },
  "www.tiktok.com": {
    Keys: [
      ...shortFormKeys("tiktok"),
      ...feedKeys("tiktok", ["explore", "live", "following", "search"]),
    ],
  },
  "www.facebook.com": {
    Keys: [
      ...feedKeys("facebook", ["games", "marketplace", "videos"]),
      ...shortFormKeys("facebook"),
    ],
  },
  "www.instagram.com": {
    Keys: [
      ...feedKeys("instagram", ["explore"]),
      ...shortFormKeys("instagram"),
    ],
  },
  "music.youtube.com": {
    Keys: [
      ...feedKeys("youtube_music", ["explore"]),
      {
        Key: "local:youtube_music-hide-related",
        DefaultValue: 0,
        possibleValues: ["true", "false"],
      },
    ],
  },
};

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------

function shortFormKeys(platform: string): ConfigurationKey[] {
  return [
    {
      Key: `local:${platform}-shortform`,
      DefaultValue: 0,
      possibleValues: ["block", "show", "hide"],
    },
  ];
}

function feedKeys(platform: string, feeds?: string[]): ConfigurationKey[] {
  if (feeds === undefined) feeds = [];

  return [
    {
      Key: `local:${platform}-hide-feed`,
      DefaultValue: 0,
      possibleValues: ["true", "false"],
    },
    ...feeds.map(
      (feed): ConfigurationKey => ({
        Key: `local:${platform}-hide-${feed}-feed`,
        DefaultValue: 0,
        possibleValues: ["true", "false"],
      })
    ),
  ];
}
