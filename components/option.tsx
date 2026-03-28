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
    <div class="flex flex-row justify-between items-center overflow-auto">
      <label for={props.config.Key}>{props.config.HumanName}</label>
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
          class="border-2 p-1.5 rounded-md"
        >
          <For each={props.config.Values}>
            {(opt) => <option selected={props.value == opt}>{opt}</option>}
          </For>
        </select>
      )}
    </div>
  );
};
