import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const CLI_DIR = dirname(fileURLToPath(import.meta.url));

export const SDK_ROOT = resolve(CLI_DIR, "../..");
export const PACKAGE_JSON_PATH = resolve(SDK_ROOT, "package.json");
