import { ConfigOption } from "./option";

export function OptionSection(
  key: string,
  config: PlatformConfiguration
): HTMLElement {
  const section = document.createElement("section");
  section.innerHTML = `<h2>${config.HumanName}</h2>`;
  section.setAttribute("data-key", key);

  config.Keys.sort((a, b) => a.HumanName.localeCompare(b.HumanName));

  // append the config keys
  config.Keys.map((key) => section.appendChild(ConfigOption(key.Key, key)));

  return section;
}
