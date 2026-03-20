import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig, WxtViteConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/auto-icons", "@wxt-dev/module-solid"],
  autoIcons: {
    baseIconPath: "./public/icon.svg",
    developmentIndicator: "overlay",
  },
  manifest: {
    name: "Feedless",
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
});
