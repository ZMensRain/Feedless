export default function DevPopup() {
  const [tab, resource] = createResource(async () => {
    const tab = (
      await browser.tabs.query({ active: true, currentWindow: true })
    )[0];
    let hostname = new URL(tab.url ?? "").hostname;
    if (hostname === "m.youtube.com") hostname = "www.youtube.com";
    else if (hostname === "x.com") hostname = "www.twitter.com";
    else if (hostname.includes("pinterest")) hostname = "pinterest.com";
    return hostname ?? "";
  });

  return (
    <div class="flex flex-col p-10 gap-5 min-w-80 text-center">
      <Show when={tab() !== undefined}>
        <ConfigSection key={tab()!} config={ConfigurationShape[tab()!]} />
      </Show>
      <p class="text-primary">v{import.meta.env.VITE_APP_VERSION}</p>
    </div>
  );
}
