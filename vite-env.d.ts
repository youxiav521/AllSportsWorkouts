/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  /** Mapbox access token, injected at build time from the GitHub Actions secret MAPBOX_TOKEN. */
  readonly VITE_MAPBOX_TOKEN?: string;
  /** Site owner name, injected at build time from the GitHub Actions secret SITE_OWNER. */
  readonly VITE_SITE_OWNER?: string;
  /** Site URL, injected at build time from the GitHub Actions secret SITE_URL. */
  readonly VITE_SITE_URL?: string;
  /** Site logo URL, injected at build time from the GitHub Actions secret SITE_LOGO. */
  readonly VITE_SITE_LOGO?: string;
  /** GitHub repository (owner/name), injected at build time from github.repository. */
  // readonly VITE_GITHUB_REPO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
