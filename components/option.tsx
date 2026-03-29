import { ConfigurationKey } from "../utils/Config";

type Props = {
  config: ConfigurationKey;
  value: string;
  onChange: (value: string) => void;
};

function isBooleanOption(options: string[]): boolean {
  const s = new Set(options);
  if (s.size != 2) return false;
  if (!s.has("false")) return false;
  if (!s.has("true")) return false;

  return true;
}

export const ConfigOption = (props: Props) => {
  return (
    <div class="flex flex-row items-center overflow-auto bg-surface rounded-xl p-2 pr-4 cursor-pointer">
      <label
        for={props.config.Key}
        class="p-2 flex-1 cursor-pointer capitalize"
      >
        {props.config.HumanName}
      </label>
      {isBooleanOption(props.config.Values) ? (
        <input
          type="checkbox"
          id={props.config.Key}
          checked={props.value == "true"}
          onChange={(e) => props.onChange(String(e.target.checked))}
          class="w-4.5 h-4.5 border rounded-md accent-primary"
        />
      ) : (
        <select
          id={props.config.Key}
          onChange={(e) => props.onChange(e.target.value)}
          class="border-2 p-1.5 rounded-md cursor-pointer"
        >
          <For each={props.config.Values}>
            {(opt) => <option selected={props.value == opt}>{opt}</option>}
          </For>
        </select>
      )}
    </div>
  );
};
