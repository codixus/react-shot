import { createServer } from "vite";
import { resolve } from "path";
import type { ReactShotConfig } from "./config";
import { createViteConfig } from "./vite-config";

export async function startDev(cwd: string, config: ReactShotConfig) {
  const port = config.port;

  const server = await createServer(createViteConfig(cwd, config, { server: { port } }));

  await server.listen();

  console.log(`\n  react-shot dev server`);
  console.log(`  Local:   http://localhost:${port}/`);
  console.log(`  Project: ${cwd}`);
  console.log(`  Compositions: ${resolve(cwd, config.compositionsDir)}\n`);

  server.printUrls();
}
