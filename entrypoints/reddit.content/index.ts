import "./reddit.scss";

let hidePopularCommunities = "true";
let hideNewsFeed = "true";
let hideExploreFeed = "true";
let hideSubredditFeed = "true";

export default defineContentScript({
	matches: ["*://www.reddit.com/*"],
	runAt: "document_start",
	main(ctx) {
		Config(ConfigurationShape["www.reddit.com"], update);
		NewObserver(unfeeder, ctx);
		unfeeder();
	},
});

function update(key: string, value: string) {
	if (key === "local:reddit-hide-popular-communities-feed") hidePopularCommunities = value;
	else if (key === "local:reddit-hide-explore-feed") hideExploreFeed = value;
	else if (key === "local:reddit-hide-news-feed") hideNewsFeed = value;
	else if (key === "local:reddit-hide-subreddit-feed") hideSubredditFeed = value;
	hideElements();
}

function hideElement(el: Element | null | undefined, hide: string) {
	if (!el) return;
	if (!(el instanceof HTMLElement)) return;
	if (hide === "false") {
		el.style = "";
		return;
	}
	el.style = "display:none;";
}

function hideElements() {
	hideElement(
		GetElementThroughShadowRoots(["left-nav-top-section", "$shadowRoot", "#popular-posts"]),
		hidePopularCommunities
	);
	hideElement(GetElementThroughShadowRoots(["left-nav-top-section", "$shadowRoot", "#news-posts"]), hideNewsFeed);

	hideElement(
		GetElementThroughShadowRoots(["left-nav-top-section", "$shadowRoot", "#explore-communities"]),
		hideExploreFeed
	);

	hideElement(GetElementThroughShadowRoots(["main", "community-highlight-carousel"]), hideSubredditFeed);
	hideElement(GetElementThroughShadowRoots(["main", "div"]), hideSubredditFeed);
	hideElement(GetElementThroughShadowRoots(["main", "#i18n-shreddit-feed-content"]), hideSubredditFeed);
}

function unfeeder() {
	AddPath();
	hideElements();
	// (document.querySelector(".flex-nav-expanded #flex-nav-collapse-button") as HTMLButtonElement | undefined)?.click();
}
