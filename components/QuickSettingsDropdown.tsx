type props = {
  name: string;
  isMaxRequired: boolean;
  currentSetting: string;
  onChange: (setting: string) => void;
};

export default function QuickSettingsDropdown(props: props) {
  const options = () => [
    "Default",
    ...(props.isMaxRequired ? ["Max"] : []),
    ...(props.currentSetting === "Custom" ? ["Custom"] : []),
  ];

  return (
    <Show when={options().length > 1}>
      <select
        onChange={(e) => props.onChange(e.target.value)}
        class="p-1.5 rounded-md cursor-pointer"
        aria-label={props.name + " templates"}
      >
        <For each={options()}>
          {(opt) => (
            <option selected={props.currentSetting == opt}>{opt}</option>
          )}
        </For>
      </select>
    </Show>
  );
}
