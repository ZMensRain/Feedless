import { ConfigOption } from "./option";

type Props = {
  key: string;
  config: PlatformConfiguration;
};

export const ConfigSection = (props: Props) => {
  const [values, resource] = createResource(async () => {
    return Promise.all(
      props.config.Keys.map(async (key) => ({
        config: key,
        value: await storage.getItem(key.Key, { fallback: key.Values[0] }),
      }))
    );
  });

  const isMaxRequired = () => {
    for (const value of props.config.Keys) {
      if (value.Values[0] !== value.Max) return true;
    }
    return false;
  };

  const currentSetting = () => {
    const state = values() ?? [];
    let isDefault = true;
    let isMax = true;
    for (const value of state) {
      if (isDefault && value.value != value.config.Values[0]) isDefault = false; // cannot be default anymore
      if (
        isMax &&
        value.value != value.config.Max &&
        value.value != value.config.Values[0]
      )
        isMax = false; // cannot be max anymore
    }

    if (isMax && isDefault && !isMaxRequired()) return "Default";
    if (isDefault) return "Default";
    if (isMax) return "Max";
    return "Custom";
  };

  function onChange(n: string) {
    if (n == "Custom") return;

    if (n == "Default") {
      const items = (values() ?? []).map(({ config }) => ({
        key: config.Key,
        value: config.Values[0],
      }));
      storage.setItems(items);
      resource.refetch();
    }

    if (n == "Max") {
      const items = (values() ?? []).map(({ config }) => ({
        key: config.Key,
        value: config.Max,
      }));
      storage.setItems(items);
      resource.refetch();
    }
  }

  return (
    <section
      data-key={props.key}
      class="break-inside-avoid p-4 flex flex-col gap-2"
    >
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold">{props.config.HumanName}</h2>
        <QuickSettingsButton
          name={props.key}
          currentSetting={currentSetting()}
          isMaxRequired={isMaxRequired()}
          onChange={onChange}
        />
      </div>
      <For
        each={(values() ?? []).toSorted((a, b) =>
          a.config.HumanName.localeCompare(b.config.HumanName)
        )}
      >
        {(option) => (
          <ConfigOption
            {...option}
            onChange={(newValue) => {
              storage.setItem(option.config.Key, newValue);
              resource.refetch();
            }}
          />
        )}
      </For>
    </section>
  );
};

type props = {
  name: string;
  isMaxRequired: boolean;
  currentSetting: string;
  onChange: (setting: string) => void;
};

function QuickSettingsButton(props: props) {
  const options = [
    "Default",
    ...(props.isMaxRequired ? ["Max"] : []),
    "Custom",
  ];

  return (
    <select
      onChange={(e) => props.onChange(e.target.value)}
      class="p-1.5 rounded-md cursor-pointer"
      aria-label={props.name + " templates"}
    >
      <For each={options}>
        {(opt) => <option selected={props.currentSetting == opt}>{opt}</option>}
      </For>
    </select>
  );
}
