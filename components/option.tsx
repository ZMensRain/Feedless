import { ConfigurationKey } from "./config";

type Props = {} & ConfigurationKey;

function isBooleanOption(options: string[]): boolean {
  const s = new Set(options);
  if (s.size != 2) return false;
  if (!s.has("false")) return false;
  if (!s.has("true")) return false;

  return true;
}

export const ConfigOption = (props: Props) => {
  const resource = createResource(async () =>
    storage.getItem<string>(props.Key)
  );
  const value = () => resource[0]() ?? props.Values[0];

  return (
    <div class="config-option">
      <label for={props.Key}>{props.HumanName}</label>
      {isBooleanOption(props.Values) ? (
        <input
          type="checkbox"
          id={props.Key}
          checked={value() == "true"}
          onChange={(e) => {
            storage.setItem(props.Key, String(e.target.checked));
            resource[1].refetch();
          }}
        />
      ) : (
        <select
          id={props.Key}
          onChange={(e) => {
            storage.setItem(props.Key, e.target.value);
            resource[1].refetch();
          }}
        >
          <For each={props.Values}>
            {(opt) => <option selected={value() == opt}>{opt}</option>}
          </For>
        </select>
      )}
    </div>
  );
};
