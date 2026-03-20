import ConfirmationDialog from "@/components/confiromationDialog";

export default function ConfigPage() {
  let resetPasswordDialog!: HTMLDialogElement;
  let setPasswordDialog!: HTMLDialogElement;

  function handleSubmit(e?: Event) {
    e?.preventDefault();
    setPasswordDialog.showModal();
  }

  return (
    <>
      <main class="bg-background min-h-svh p-8 text-text">
        <h1 class="flex flex-row gap-2 items-center text-5xl font-bold">
          <img src={"/icon.svg"} class="w-20" aria-hidden="true" />
          Feedless Options
        </h1>
        <p class="mt-4">
          A quick explanation of shortform options, they can be set to block,
          show, or hide. Block prevents you from seeing the shortform content at
          all. Show does nothing to the shortform content. Hide hides the
          shortform content from the UI but still allows you to watch shortform
          videos if you have a link and disables scrolling.
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
        <div class="columns-[500px]">
          <For each={Object.keys(ConfigurationShape)}>
            {(key) => (
              <ConfigSection key={key} config={ConfigurationShape[key]} />
            )}
          </For>
        </div>
        <footer class="border-t pt-4 mt-4">
          <p>Thank You HeroRareheart for the original logo design</p>
        </footer>

        <ConfirmationDialog
          ref={setPasswordDialog}
          message="Are you sure you want to set or update your password?"
          onConfirm={() => {
            let password = (
              document.getElementById("password-input") as HTMLInputElement
            ).value;

            storage.setItem("local:password", password);
          }}
        />

        <ConfirmationDialog
          ref={resetPasswordDialog}
          message="Are you sure you want to remove your password?"
          onConfirm={() => storage.removeItem("local:password")}
        />
      </main>
    </>
  );
}
