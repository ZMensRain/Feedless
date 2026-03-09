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
    update(key.Key, value ?? key.Values[0]);
    onUpdate?.(key.Key, value ?? key.Values[0]);
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
    const value = key.Values[0];
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
  HumanName: string;
  Key: StorageItemKey;
  Values: string[];
};

export type PlatformConfiguration = {
  HumanName: string;
  Keys: ConfigurationKey[];
};

export const ConfigurationShape: Record<string, PlatformConfiguration> = {
  "www.youtube.com": {
    Keys: [
      ...shortFormKeys("youtube"),
      ...feedKeys("youtube"),
      {
        HumanName: "Hide End Screen",
        Key: "local:youtube-hide-end-screen",

        Values: ["true", "false"],
      },
    ],
    HumanName: "YouTube",
  },
  "www.linkedin.com": {
    Keys: [
      ...feedKeys("linkedin"),
      {
        HumanName: "Hide Premium Upsells",
        Key: "local:linkedin-hide-premium-upsells",

        Values: ["true", "false"],
      },
      {
        HumanName: "Hide Add to Your Feed",
        Key: "local:linkedin-hide-add-to-your-feed",

        Values: ["true", "false"],
      },
    ],
    HumanName: "LinkedIn",
  },
  "www.reddit.com": { Keys: feedKeys("reddit"), HumanName: "Reddit" },
  "www.tiktok.com": {
    Keys: [
      ...shortFormKeys("tiktok"),
      ...feedKeys("tiktok", ["explore", "live", "following", "search"]),
    ],
    HumanName: "TikTok",
  },
  "www.facebook.com": {
    Keys: [
      ...feedKeys("facebook", ["games", "marketplace", "videos"]),
      ...shortFormKeys("facebook"),
    ],
    HumanName: "Facebook",
  },
  "www.instagram.com": {
    Keys: [
      ...feedKeys("instagram", ["explore"]),
      ...shortFormKeys("instagram"),
    ],
    HumanName: "Instagram",
  },
  "music.youtube.com": {
    Keys: [
      ...feedKeys("youtube_music", ["explore"]),
      {
        HumanName: "Hide Related",
        Key: "local:youtube_music-hide-related",

        Values: ["true", "false"],
      },
    ],
    HumanName: "YouTube Music",
  },
  "bsky.app": {
    HumanName: "Bluesky",
    Keys: [
      ...feedKeys("bsky"),
      {
        Key: "local:bsky-hide-trending",
        HumanName: "Hide Trending",
        Values: ["true", "false"],
      },
    ],
  },
  "substack.com": {
    Keys: [
      ...feedKeys("substack", ["explore", "up-next", "new-bestsellers"]),
      {
        HumanName: "Hide Related",
        Key: "local:substack-hide-related",

        Values: ["true", "false"],
      },
    ],
    HumanName: "Substack",
  },
};

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------

function shortFormKeys(platform: string): ConfigurationKey[] {
  return [
    {
      HumanName: "Shortform",
      Key: `local:${platform}-shortform`,

      Values: ["block", "show", "hide"],
    },
  ];
}

function feedKeys(platform: string, feeds?: string[]): ConfigurationKey[] {
  if (feeds === undefined) feeds = [];

  return [
    {
      HumanName: "Hide Home Feed",
      Key: `local:${platform}-hide-feed`,

      Values: ["true", "false"],
    },
    ...feeds.map(
      (feed): ConfigurationKey => ({
        HumanName: `Hide ${feed} Feed`,
        Key: `local:${platform}-hide-${feed}-feed`,

        Values: ["true", "false"],
      })
    ),
  ];
}
