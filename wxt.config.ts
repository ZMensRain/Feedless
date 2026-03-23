import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig, WxtViteConfig, UserConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/auto-icons", "@wxt-dev/module-solid"],
  autoIcons: {
    baseIconPath: "./public/icon.svg",
    developmentIndicator: "overlay",
  },
  manifest: {
    name: "Feedless",
    browser_specific_settings: {
      gecko: {
        id: "{27ef3b57-547f-4c2a-a72d-49e316fdcf99}",
        data_collection_permissions: {
          required: ["none"],
        },
      },
    },
    permissions: ["storage"],
  },
  vite: () =>
    ({
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./"),
        },
      },
    } as WxtViteConfig),
} as UserConfig);
