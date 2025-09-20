#!/usr/bin/env node
import path from "node:path";
import { promises as fs } from "node:fs";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "sections");

const BLOCKLIST = [
  { label: "barefoot", regex: /barefoot/i },
  { label: "the barefoot", regex: /the\s+barefoot/i },
  { label: "cocktail", regex: /cocktail/i },
  { label: "wine", regex: /\bwine\b/i },
  { label: "бар", regex: /бар/i },
  { label: "алког", regex: /алког/i },
  { label: "brand:", regex: /brand:/i },
];

async function collectMarkdown(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMarkdown(fullPath)));
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

async function run() {
  const files = await collectMarkdown(CONTENT_DIR);
  const violations = [];

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const lines = raw.split(/\r?\n/);
    lines.forEach((line, index) => {
      BLOCKLIST.forEach(({ label, regex }) => {
        if (regex.test(line)) {
          violations.push({ file, line: index + 1, label, snippet: line.trim() });
        }
      });
    });
  }

  if (violations.length > 0) {
    console.error("\n🚫 Content policy violation detected:\n");
    for (const violation of violations) {
      console.error(` - ${path.relative(ROOT, violation.file)}:${violation.line} uses prohibited token "${violation.label}"`);
      console.error(`   › ${violation.snippet}`);
    }
    console.error("\nPlease replace branded or bar/alcohol references before committing.\n");
    process.exitCode = 1;
    return;
  }

  console.log("✅ Content lint passed");
}

run().catch((error) => {
  console.error("❌ Content lint failed", error);
  process.exitCode = 1;
});
