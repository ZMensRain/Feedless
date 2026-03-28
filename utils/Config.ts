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
  Max: string;
};

export type PlatformConfiguration = {
  HumanName: string;
  Keys: ConfigurationKey[];
};

export const ConfigurationShape: Record<string, PlatformConfiguration> = {
  "www.youtube.com": {
    Keys: [
      ...shortFormKeys("youtube"),
      ...feedKeys("youtube", ["up-next", "subscription"]),
      booleanKey(
        "local:youtube-hide-more-from-youtube",
        "Hide More From Youtube"
      ),
      booleanKey("local:youtube-hide-explore", "Hide Explore Sidebar Section"),
      booleanKey(
        "local:youtube-hide-you-section",
        "Hide You Sidebar Section",
        false
      ),
      booleanKey("local:youtube-hide-end-screen", "Hide End Screen bits"),
    ],
    HumanName: "YouTube",
  },
  "www.linkedin.com": {
    Keys: [
      ...feedKeys("linkedin"),
      booleanKey("local:linkedin-hide-premium-upsells", "Hide Premium Upsells"),
      booleanKey(
        "local:linkedin-hide-add-to-your-feed",
        "Hide Add to Your Feed"
      ),
    ],
    HumanName: "LinkedIn",
  },
  "www.reddit.com": {
    Keys: feedKeys("reddit", ["explore", "related-posts"]),
    HumanName: "Reddit",
  },
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
      ...feedKeys("instagram", ["explore", "more-from"]),
      ...shortFormKeys("instagram"),
    ],
    HumanName: "Instagram",
  },
  "music.youtube.com": {
    Keys: [
      ...feedKeys("youtube_music", ["explore"]),
      booleanKey("local:youtube_music-hide-related", "Hide Related"),
    ],
    HumanName: "YouTube Music",
  },
  "pinterest.com": {
    HumanName: "Pinterest",
    Keys: [
      ...feedKeys("pinterest", ["explore", "search", "related-pins", "board"]),
    ],
  },
  "bsky.app": {
    HumanName: "Bluesky",
    Keys: [
      ...feedKeys("bsky", ["explore"]),
      booleanKey("local:bsky-hide-trending", "Hide Trending"),
    ],
  },
  "substack.com": {
    Keys: [
      ...feedKeys("substack", ["explore", "up-next", "new-bestsellers"]),
      booleanKey("local:substack-hide-related", "Hide Related"),
    ],
    HumanName: "Substack",
  },
  "www.twitter.com": {
    Keys: [
      ...feedKeys("twitter", [
        "trending",
        "who-to-follow",
        "whats-new",
        "explore",
      ]),
      booleanKey("local:twitter-hide-premium", "Hide Premium"),
    ],
    HumanName: "Twitter/X",
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
      Max: "block",
    },
  ];
}

function booleanKey(
  Key: StorageItemKey,
  HumanName: string,
  Default: boolean = true
): ConfigurationKey {
  return {
    HumanName,
    Key,
    Max: "true",
    Values: Default ? ["true", "false"] : ["false", "true"],
  };
}

function feedKeys(platform: string, feeds?: string[]): ConfigurationKey[] {
  if (feeds === undefined) feeds = [];

  return [
    {
      HumanName: "Hide Home Feed",
      Key: `local:${platform}-hide-feed`,
      Values: ["true", "false"],
      Max: "true",
    },
    ...feeds.map(
      (feed): ConfigurationKey => ({
        HumanName: `Hide ${feed} Feed`,
        Key: `local:${platform}-hide-${feed}-feed`,
        Values: ["true", "false"],
        Max: "true",
      })
    ),
  ];
}
