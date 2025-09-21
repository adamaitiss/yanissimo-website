#!/usr/bin/env node
import path from "node:path";
import { promises as fs } from "node:fs";

import sharp from "sharp";

const ROOT = process.cwd();
const ACCEPTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const DIRECTORY_CONFIG = [
  {
    dir: path.join(ROOT, "public", "gallery"),
    maxWidth: 2000,
    thumbnailWidth: 600,
    thumbnailQuality: 72,
    losslessWebp: true,
  },
  {
    dir: path.join(ROOT, "public", "images"),
    maxWidth: 2000,
    thumbnailWidth: 600,
    thumbnailQuality: 72,
    losslessWebp: true,
    skip: (relativePath) => relativePath.startsWith("hero-aerial") || relativePath.endsWith(".blur-data.txt"),
  },
  {
    dir: path.join(ROOT, "public", "rooms"),
    maxWidth: 1600,
    thumbnailWidth: 600,
    thumbnailQuality: 70,
    losslessWebp: true,
  },
];

const HERO_SOURCE = path.join(ROOT, "public", "images", "hero-aerial-original.jpg");
const HERO_TARGETS = [
  {
    destination: path.join(ROOT, "public", "images", "hero-aerial.avif"),
    format: "avif",
    options: { quality: 52, effort: 4 },
  },
  {
    destination: path.join(ROOT, "public", "images", "hero-aerial.webp"),
    format: "webp",
    options: { quality: 74, effort: 4 },
  },
];

const PLACEHOLDER_OUTPUT = path.join(ROOT, "lib", "generated");
const PLACEHOLDER_FILE = path.join(PLACEHOLDER_OUTPUT, "image-placeholders.ts");

async function ensureDir(target) {
  await fs.mkdir(target, { recursive: true });
}

async function collectFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "thumbnails") continue;
      files.push(...(await collectFiles(fullPath)));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!ACCEPTED_EXTENSIONS.has(ext)) continue;
    files.push(fullPath);
  }
  return files;
}

function relativeToDir(baseDir, filePath) {
  return path.relative(baseDir, filePath).replace(/\\/g, "/");
}

async function encode(pipeline, ext, qualityOverrides = {}, directoryOptions = {}) {
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return pipeline.jpeg({ quality: qualityOverrides.jpeg ?? 80, mozjpeg: true }).toBuffer();
    case ".png":
      return pipeline.png({ quality: qualityOverrides.png ?? 80, compressionLevel: 9 }).toBuffer();
    case ".webp":
      return pipeline
        .webp({
          quality: qualityOverrides.webp ?? 75,
          effort: 4,
          lossless: directoryOptions.losslessWebp ?? false,
        })
        .toBuffer();
    case ".avif":
      return pipeline.avif({ quality: qualityOverrides.avif ?? 52, effort: 4 }).toBuffer();
    default:
      return pipeline.toBuffer();
  }
}

async function optimizeImage(filePath, options) {
  if (filePath.includes(`${path.sep}thumbnails${path.sep}`)) return;
  const ext = path.extname(filePath).toLowerCase();
  if (!ACCEPTED_EXTENSIONS.has(ext)) return;

  const buffer = await fs.readFile(filePath);
  const baseImage = sharp(buffer, { failOn: "none" }).rotate();
  const metadata = await baseImage.metadata();

  let pipeline = baseImage.clone();
  if (metadata.width && options.maxWidth && metadata.width > options.maxWidth) {
    pipeline = pipeline.resize({ width: options.maxWidth, withoutEnlargement: true });
  }

  const optimisedBuffer = await encode(pipeline, ext, options.quality, options);
  await fs.writeFile(filePath, optimisedBuffer);

  if (options.thumbnailWidth && metadata.width && metadata.width > options.thumbnailWidth) {
    const { dir, name } = path.parse(filePath);
    const thumbDir = path.join(dir, "thumbnails");
    await ensureDir(thumbDir);
    const thumbPath = path.join(thumbDir, `${name}.webp`);
    const thumbBuffer = await baseImage
      .clone()
      .resize({ width: options.thumbnailWidth, withoutEnlargement: true })
      .webp({ quality: options.thumbnailQuality ?? 70, effort: 4 })
      .toBuffer();
    await fs.writeFile(thumbPath, thumbBuffer);
  }
}

async function processDirectory(config) {
  const files = await collectFiles(config.dir);
  for (const file of files) {
    const relative = relativeToDir(config.dir, file);
    if (config.skip?.(relative)) continue;
    await optimizeImage(file, config);
  }
}

async function processHero() {
  try {
    const buffer = await fs.readFile(HERO_SOURCE);
    const baseImage = sharp(buffer, { failOn: "none" }).rotate();
    const metadata = await baseImage.metadata();
    const targetWidth = metadata.width && metadata.width < 2560 ? metadata.width : 2560;

    for (const target of HERO_TARGETS) {
      const resized = baseImage
        .clone()
        .resize({ width: targetWidth, withoutEnlargement: true })
        [target.format]({ ...(target.options ?? {}), effort: 4 });
      const outputBuffer = await resized.toBuffer();
      await fs.writeFile(target.destination, outputBuffer);
    }

    const placeholderBuffer = await baseImage
      .clone()
      .resize({ width: 24, withoutEnlargement: true })
      .webp({ quality: 60, effort: 4 })
      .toBuffer();

    const placeholderDataUrl = `data:image/webp;base64,${placeholderBuffer.toString("base64")}`;
    await ensureDir(PLACEHOLDER_OUTPUT);
    const fileContents = `// This file is generated by scripts/optimize-images.mjs\nexport const IMAGE_PLACEHOLDERS = {\n  hero: \"${placeholderDataUrl}\",\n} as const;\n\nexport type ImagePlaceholderKey = keyof typeof IMAGE_PLACEHOLDERS;\n`;
    await fs.writeFile(PLACEHOLDER_FILE, fileContents);
  } catch (error) {
    console.warn("⚠️  Unable to process hero image:", error.message ?? error);
  }
}

async function main() {
  console.log("🖼️  Optimizing images...");
  await processHero();
  for (const config of DIRECTORY_CONFIG) {
    console.log(` • ${path.relative(ROOT, config.dir)}`);
    await processDirectory(config);
  }
  console.log("✅ Image optimization complete");
}

main().catch((error) => {
  console.error("❌ Image optimization failed", error);
  process.exitCode = 1;
});
