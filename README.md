# Manifest/Scope

> [!NOTE]
> Unless stated otherwise the default option for a configuration should be the one which restricts the platform the most.

## Shortform Content

Every platform that is supported that has shortform content should have a config called **{platform}-shortform** and it should be one of the following values:

- **"block"** does not allow a person to watch the shortform content and it hides shortform content from th UI.
- **"show"** doesn't do anything to the shortform content
- **"hide"** allows a person to watch shortform content when shared with them but does not allow them to scroll and it hides shortform content from th UI

## Non-shortform Content

every platform with a feed should have a single config called **{platform}-hide-feed** either **"true"** or **"false"** that controls whether the feed is hidden on all pages, for platforms like facebook with multiple types of feeds there should be a **{platform}-hide-{feedtype}-feed** also either **"true"** or **"false"**

If the home feed is removed and it is reasonably possible the search bar and logo or a label should be centred where the feed once was.

In cases such as Pinterest where the search results are a feed themselves a special feed type should be created called **{platform}-hide-search-feed** either **"true"** or **"false"** defaults to **"false"**

## What will not be done

- removing sign in popups/UI except when it is trivial to do so and it does not remove the only way to sign in/signup, when choosing which sign in/signup UI to keep favour the ones in the top right. Instagram for example once the popup appears it is not trivial to remove it and keep a functioning application.

## Targets

- [x] YouTube
- [x] LinkedIn
- [x] Reddit
- [x] TikTok
- [x] Pinterest
- [x] SubStack
- [x] Twitter/X
- [x] Facebook
- [x] BlueSky
- [x] Instagram
- [ ] Amazon
- [x] YouTube music
- [ ] Spotify
