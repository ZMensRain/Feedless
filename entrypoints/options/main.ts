import { OptionSection } from "@/components/optionSection";

function update(key: string, value: string) {}

function main() {
  const app = document.getElementById("app");
  for (const key in ConfigurationShape) {
    let section = OptionSection(key, ConfigurationShape[key]);
    app?.appendChild(section);
  }
}

main();

console.log("options loaded");
