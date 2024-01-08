import { sveltekit } from "@sveltejs/kit/vite";
import { loadEnv } from "vite";
import type { UserConfig } from "vitest";
import { defineConfig } from "vitest/config";

export default ({ mode }: UserConfig) => {
  // Extends 'process.env.*' with VITE_*-variables from '.env.(mode=production|development)'
  process.env = {...process.env, ...loadEnv(mode === undefined ? "" : mode, process.cwd())};

  return defineConfig({
      plugins: [sveltekit()]
  }); 
};
