/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_GITHUB_PAGES_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
