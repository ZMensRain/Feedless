import { Component } from "solid-js";

const App: Component = () => {
  return (
    <>
      <main>
        <h1>Feedless Options</h1>
        <p>
          A quick explanation of shortform options, they can be set to block,
          show, or hide. Block prevents you from seeing the shortform content at
          all. Show does nothing to the shortform content. Hide hides the
          shortform content from the UI but still allows you to watch shortform
          videos if you have a link and disables scrolling.
        </p>
        <div id="configuration-sections">
          <For each={Object.keys(ConfigurationShape)}>
            {(key) => (
              <ConfigSection key={key} config={ConfigurationShape[key]} />
            )}
          </For>
        </div>
      </main>
      <footer>
        <p>Thank You HeroRareheart for the original logo design</p>
      </footer>
    </>
  );
};

render(() => <App />, document.getElementById("app")!);
