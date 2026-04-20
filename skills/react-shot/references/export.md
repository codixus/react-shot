# Export pipeline

`bunx react-shot export <id>` runs a Puppeteer-driven render of the composition's full canvas, then Sharp slices it into per-screenshot PNGs.

## CLI flags

```bash
react-shot export hero                  # en / ios / single PNG set
react-shot export hero --locale tr      # single locale override
react-shot export hero --device ipad    # ios | ipad
react-shot export hero --all-locales    # every locale, single device
react-shot export hero --all            # every locale × ios + ipad
react-shot export hero --store          # write under config.export.deviceFolders
```

Without `--store`, output goes to `output/<id>/<locale>/<device>/01.png…NN.png` plus a zip.

## Flow

1. The CLI dynamically imports `./compositions/index.ts` and looks up `<id>`.
2. A headless Vite server boots on `config.port + 100` and loads the route `/render/<id>?locale=...&device=...`.
3. Puppeteer sets the viewport to `preset.width * slices × preset.height` and snapshots the full canvas as a PNG buffer.
4. Sharp extracts each slice: `{ left: i * sliceWidth, top: 0, width: sliceWidth, height: sliceHeight }` → `NN.png`.
5. In dev mode, the slices are zipped into `<id>-<locale>-<device>.zip`.

## Config shape

```ts
// react-shot.config.ts
import { defineConfig } from "react-shot/config";

export default defineConfig({
  compositionsDir: "./compositions",
  publicDir: "./public",
  port: 5174,
  export: {
    outputDir: "./appstore",
    deviceFolders: {
      ios: "APP_IPHONE_67",
      ipad: "APP_IPAD_PRO_3GEN_129",
    },
  },
});
```

## Per-composition knobs

In `compositions/index.ts`:

```ts
{
  id: "hero",
  component: lazy(() => import("./hero")),
  preset: appstore,
  ipadPreset: appstoreIPad,       // optional — used when --device ipad
  slices: 5,                       // number of screenshots
  device: "iphone-16-pro",         // default Canvas device
  locales: ["en", "tr", "de"],
}
```

The `--store` flag drops files into `outputDir/<locale>/<deviceFolder>/NN.png`, which matches what App Store Connect expects for a fastlane upload.

## Font loading

Fonts must be served from `public/` so Puppeteer can load them. The SDK ships `public/assets/fonts/Nunito-*.ttf`. Wait-for-`document.fonts.ready` is already handled inside the export script — don't add your own `setTimeout` around it.
