export function ConfigOption(
  key: StorageItemKey,
  config: ConfigurationKey
): HTMLElement {
  let element =
    config.Values.length === 2 ? checkbox(key, config) : select(key, config);

  element.classList.add("config-option");

  // handle getting the current value
  storage
    .getItem<string>(key)
    .then((value) => updateConfig(key, value ?? config.Values[0]));
  storage.watch<string>(key, (v) => {
    updateConfig(key, v ?? config.Values[0]);
  });

  return element;
}

function select(key: StorageItemKey, config: ConfigurationKey): HTMLElement {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const select = document.createElement("select");
  select.id = key;
  select.value = config.Key[0];

  select.addEventListener("change", (e) => {
    const value = (e?.target as HTMLSelectElement)?.value ?? "";
    storage.setItem(key, value);
  });

  const options = config.Values.map((value, i) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    option.selected = i === 0;
    return option;
  });
  select.append(...options);

  div.appendChild(label);
  div.appendChild(select);

  label.htmlFor = key;
  label.innerHTML = config.HumanName;

  return div;
}

function checkbox(key: StorageItemKey, config: ConfigurationKey): HTMLElement {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  div.appendChild(label);
  div.appendChild(checkbox);

  checkbox.type = "checkbox";
  checkbox.id = key;
  checkbox.addEventListener("change", (e) => {
    const value = (e?.target as HTMLInputElement)?.checked ?? false;
    storage.setItem(key, value.toString());
  });

  label.htmlFor = key;
  label.innerHTML = config.HumanName;

  return div;
}

function updateConfig(key: string, value: string) {
  const element = document.getElementById(key);

  // reflect the value in the UI
  if (element?.tagName === "INPUT") {
    (element as HTMLInputElement).checked = value === "true";
  } else if (element?.tagName === "SELECT") {
    (element as HTMLSelectElement).value = value;
  }
}
