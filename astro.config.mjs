import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://smartoire.com",

  // No adapter needed for default static output on Pages

  integrations: [sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  output: "static", // fully static HTML output
});
