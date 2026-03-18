import { ConfigOption } from "./option";

type Props = {
  key: string;
  config: PlatformConfiguration;
};

export const ConfigSection = (props: Props) => {
  return (
    <section data-key={props.key}>
      <h2>{props.config.HumanName}</h2>
      <For
        each={props.config.Keys.toSorted((a, b) =>
          a.HumanName.localeCompare(b.HumanName)
        )}
      >
        {(option) => <ConfigOption {...option} />}
      </For>
    </section>
  );
};
