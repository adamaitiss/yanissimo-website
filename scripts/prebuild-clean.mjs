#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGETS = [".next", ".next-static", ".next-server"];

const resolveTarget = (target) => path.join(ROOT, target);

const removed = [];

for (const target of TARGETS) {
  const resolved = resolveTarget(target);
  try {
    fs.rmSync(resolved, { recursive: true, force: true });
    removed.push(target);
  } catch (error) {
    console.warn(`⚠️  Failed to clean ${target}:`, error);
  }
}

if (removed.length > 0) {
  console.log(`🧹 Cleaned build artifacts: ${removed.join(", ")}`);
}
