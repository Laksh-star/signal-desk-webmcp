import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const serverDir = join(dist, "server");

const files = {
  "/": { path: "index.html", contentType: "text/html; charset=utf-8" },
  "/index.html": { path: "index.html", contentType: "text/html; charset=utf-8" },
  "/styles.css": { path: "styles.css", contentType: "text/css; charset=utf-8" },
  "/src/app.js": { path: "src/app.js", contentType: "text/javascript; charset=utf-8" },
  "/src/data.js": { path: "src/data.js", contentType: "text/javascript; charset=utf-8" },
};

await rm(dist, { recursive: true, force: true });
await mkdir(serverDir, { recursive: true });

const assets = {};
for (const [route, asset] of Object.entries(files)) {
  assets[route] = {
    contentType: asset.contentType,
    body: await readFile(join(root, asset.path), "utf8"),
  };
}

const workerSource = `const assets = ${JSON.stringify(assets)};

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const route = assets[url.pathname] ? url.pathname : "/";
    const asset = assets[route];

    return withSecurityHeaders(
      new Response(asset.body, {
        headers: {
          "content-type": asset.contentType,
          "cache-control": "no-store",
        },
      }),
    );
  },
};
`;

await writeFile(join(serverDir, "index.js"), workerSource, "utf8");
