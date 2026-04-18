#!/usr/bin/env bun
import { readFileSync } from "fs";
import { PACKAGE_JSON_PATH } from "./paths";
import { loadConfig } from "./config";

const cwd = process.cwd();
const command = process.argv[2];

function readVersion() {
  const pkg = JSON.parse(readFileSync(PACKAGE_JSON_PATH, "utf8")) as { version?: string };
  return pkg.version ?? "0.0.0";
}

async function main() {
  switch (command) {
    case "--version":
    case "-v":
      console.log(readVersion());
      break;
    case "init": {
      const { runInit } = await import("./init");
      await runInit(cwd);
      break;
    }
    case "dev": {
      const config = await loadConfig(cwd);
      const { startDev } = await import("./dev");
      await startDev(cwd, config);
      break;
    }
    case "export": {
      const config = await loadConfig(cwd);
      const { runExport } = await import("./export");
      await runExport(cwd, config, process.argv.slice(3));
      break;
    }
    case "build": {
      const config = await loadConfig(cwd);
      const { runBuild } = await import("./build");
      await runBuild(cwd, config);
      break;
    }
    default:
      console.log(`react-shot - App Store Screenshot Generator

Commands:
  react-shot init                   Initialize new project
  react-shot dev                    Start preview server
  react-shot export <id>            Export composition
  react-shot export <id> --all      Export all locales + devices
  react-shot export <id> --store    Export to appstore/ folder structure
  react-shot build                  Build for production
  react-shot --version              Print CLI version

Options:
  --locale <code>     Specific locale (default: en)
  --device <type>     ios or ipad (default: ios)
  --all-locales       Export all configured locales
  --all               Export all locales + all devices
  --store             Export to appstore/ folder structure
  --port <number>     Dev server port (default: 5174)
`);
      break;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
