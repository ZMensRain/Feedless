import ConfirmationDialog from "@/components/confiromationDialog";

export default function ConfigPage() {
	let resetPasswordDialog!: HTMLDialogElement;
	let setPasswordDialog!: HTMLDialogElement;

	function handleSubmit(e?: Event) {
		e?.preventDefault();
		setPasswordDialog.showModal();
	}

	const [currentTab, setCurrentTab] = createSignal("overview");

	const navButtonClasses = "text-left cursor-pointer hover:bg-surface p-3 rounded-lg";
	const selectedNavButtonClasses = "text-primary bg-surface/70";
	return (
		<div class="flex">
			<nav class="flex flex-col p-10 pt-30">
				<button
					class={navButtonClasses}
					classList={{ [selectedNavButtonClasses]: currentTab() === "overview" }}
					onClick={() => setCurrentTab("overview")}
				>
					Overview
				</button>
				<For each={Object.keys(ConfigurationShape)}>
					{(key) => (
						<button
							class={navButtonClasses}
							classList={{ [selectedNavButtonClasses]: currentTab() === key }}
							onClick={() => setCurrentTab(key)}
						>
							{ConfigurationShape[key].HumanName}
						</button>
					)}
				</For>
			</nav>
			<main class="bg-background min-h-svh p-8 text-text flex-1 flex flex-col">
				<h1 class="flex flex-row gap-2 items-center text-5xl font-bold">
					<img src={"/icon.svg"} class="w-20" aria-hidden="true" />
					Feedless Options
				</h1>
				<div class="flex-1">
					<Show when={currentTab() === "overview"}>
						<p class="mt-4">
							A quick explanation of shortform options, they can be set to block, show, or hide. Block
							prevents you from seeing the shortform content at all. Show does nothing to the shortform
							content. Hide hides the shortform content from the UI but still allows you to watch
							shortform videos if you have a link and disables scrolling.
						</p>
						<form class="mt-4 mb-4" onSubmit={handleSubmit}>
							<div class="flex flex-col">
								<label for="password-input">Password</label>
								<div class="flex flex-row gap-4">
									<input
										id="password-input"
										type="password"
										class="flex-1 border rounded-md"
										onKeyDown={(event) => event.key == "Enter" && handleSubmit()}
									/>
									<button class="bg-primary text-primary-foreground p-4 pt-2 pb-2 rounded-xl">
										Set or Update
									</button>
									<button
										class="bg-primary text-primary-foreground p-4 pt-2 pb-2 rounded-xl"
										type="button"
										onClick={() => resetPasswordDialog.showModal()}
									>
										Remove
									</button>
								</div>
							</div>
						</form>

						<ConfirmationDialog
							ref={setPasswordDialog}
							message="Are you sure you want to set or update your password?"
							onConfirm={() => {
								let password = (document.getElementById("password-input") as HTMLInputElement).value;

								storage.setItem("local:password", password);
							}}
						/>

						<ConfirmationDialog
							ref={resetPasswordDialog}
							message="Are you sure you want to remove your password?"
							onConfirm={() => storage.removeItem("local:password")}
						/>
					</Show>
					<Show when={ConfigurationShape[currentTab()] !== undefined} keyed={true}>
						<ConfigSection key={currentTab()} config={ConfigurationShape[currentTab()]} />
					</Show>
				</div>
				<footer class="border-t pt-4 mt-4 flex gap-5">
					<p>v{import.meta.env.VITE_APP_VERSION} Thank You HeroRareheart for the logo design</p>
					<a
						href="https://github.com/ZMensRain/Feedless"
						target="_blank"
						class="flex flex-row gap-2 text-primary"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-github-icon lucide-github"
							aria-hidden="true"
						>
							<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
							<path d="M9 18c-4.51 2-5-2-7-2" />
						</svg>
						Source
					</a>
				</footer>
			</main>
		</div>
	);
}
