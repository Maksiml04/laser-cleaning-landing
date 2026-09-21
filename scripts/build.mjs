import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "lightningcss";
import { minify as minifyHtml } from "html-minifier-terser";
import { transform as minifyJs } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const pageDirectories = ["uslugi", "restoration", "industrial", "prices", "contacts"];
const rootFiles = ["index.html", "404.html", "styles.css", "app.js", "robots.txt", "sitemap.xml"];
const assetFiles = [
  "assets/hero-industrial.jpg",
  "assets/hero-restoration.jpg",
  "assets/rust-before-after.jpg",
  "assets/industrial-process.jpg",
  "assets/industrial-wide.png",
];

const htmlOptions = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  sortAttributes: true,
  sortClassName: true,
  useShortDoctype: true,
};

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });

const minifyFile = async (relativePath) => {
  const source = path.join(root, relativePath);
  const target = path.join(dist, relativePath);
  const input = await fs.readFile(source);
  await fs.mkdir(path.dirname(target), { recursive: true });

  if (relativePath.endsWith(".html")) {
    const output = await minifyHtml(input.toString("utf8"), htmlOptions);
    await fs.writeFile(target, output);
    return;
  }

  if (relativePath.endsWith(".css")) {
    const { code } = transform({ filename: relativePath, code: input, minify: true });
    await fs.writeFile(target, code);
    return;
  }

  if (relativePath.endsWith(".js")) {
    const { code } = await minifyJs(input.toString("utf8"), {
      sourcefile: relativePath,
      minify: true,
      target: "es2020",
      format: "iife",
    });
    await fs.writeFile(target, code);
    return;
  }

  await fs.copyFile(source, target);
};

for (const file of rootFiles) await minifyFile(file);
for (const file of assetFiles) await minifyFile(file);

for (const directory of pageDirectories) {
  await minifyFile(path.join(directory, "index.html"));
}

console.log(`Built ${dist}`);
