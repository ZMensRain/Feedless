import { Component } from "solid-js";
import "../../assets/tailwind.css";
import ConfigPage from "./pages/config";
import PasswordPage from "./pages/password";

const App: Component = () => {
  const [enteredCorrectPassword, setEnteredCorrectPassword] = createSignal<
    boolean | undefined
  >(undefined);

  const [password] = createResource(async () => {
    // return "password";
    //TODO
    return storage.getItem<string>("local:password");
  });

  function handlePassword(p: string) {
    console.log("aaah");
    if (p != password()) setEnteredCorrectPassword(false);
    else setEnteredCorrectPassword(true);
  }

  return (
    <Show when={!password.loading} fallback={<div>Not Found</div>}>
      <Switch>
        <Match when={password.latest == null || enteredCorrectPassword()}>
          <ConfigPage />
        </Match>
        <Match when={password.latest !== null}>
          <PasswordPage
            onPasswordEntered={handlePassword}
            correct={enteredCorrectPassword()}
          />
        </Match>
      </Switch>
    </Show>
  );
};

render(() => <App />, document.getElementById("app")!);
