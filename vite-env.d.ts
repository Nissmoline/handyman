// src/vite-env.d.ts (или src/types/assets.d.ts)

/// <reference types="vite/client" />

// SVG as url
declare module '*.svg?url' {
    const src: string
    export default src
  }
  