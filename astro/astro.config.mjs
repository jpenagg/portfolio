import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jpena.dev",
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" }
    }
  }
});
