type Props = {
  onPasswordEntered?: (password: string) => void;
  correct?: boolean;
};

export default function PasswordPage(props: Props) {
  function handleSubmit(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
    }
  ) {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");
    if (password == null) return;
    props.onPasswordEntered?.(password.toString());
  }

  return (
    <div class="h-full flex flex-col items-center justify-center gap-2">
      <h1 class="flex flex-row gap-2 items-center text-5xl font-bold">
        Unlock <img src={"/icon.svg"} class="w-20" aria-hidden="true" />{" "}
        Feedless
      </h1>
      <form
        onSubmit={handleSubmit}
        class="bg-surface min-w-[500px] min-h-[300px] p-[100px] rounded-2xl flex flex-col items-center gap-4 mt-4"
      >
        <div class="flex flex-col gap-1 w-full">
          <label for="password-field">Password</label>
          <input
            id="password-field"
            name="password"
            type="password"
            class="rounded-md border"
          ></input>
        </div>

        <button
          type="submit"
          class="bg-primary text-primary-foreground cursor-pointer p-4 rounded-xl pt-2 pb-2"
        >
          Unlock
        </button>
        <Show when={props.correct == false} fallback={<div> </div>}>
          <p class="text-red-500">Incorrect password</p>
        </Show>
      </form>
    </div>
  );
}
