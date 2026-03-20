export default function ConfigPage() {
  let dialog!: HTMLDialogElement;

  function handleSubmit(e?: Event) {
    e?.preventDefault();

    let password = (
      document.getElementById("password-input") as HTMLInputElement
    ).value;

    storage
      .setItem("local:password", password)
      .then(() => alert("Password Set"));
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
                onClick={() => dialog.showModal()}
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

        <dialog
          id="confirmation"
          closedby="any"
          ref={dialog}
          class="m-auto bg-surface text-text p-4 rounded-2xl"
        >
          <p>Are you sure you want to remove the password</p>
          <div class="flex flex-row gap-4 justify-center mt-4">
            <button
              class="border  p-4 pt-2 pb-2 rounded-xl"
              onClick={() => dialog.close()}
            >
              No
            </button>
            <button
              class="bg-primary text-primary-foreground p-4 pt-2 pb-2 rounded-xl"
              onClick={() => {
                storage.removeItem("local:password");
                dialog.close();
              }}
            >
              Yes
            </button>
          </div>
        </dialog>
      </main>
    </>
  );
}
