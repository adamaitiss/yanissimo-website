import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const cnamePath = "public/CNAME";
const targetDir = "out";

const domain = readFileSync(cnamePath, "utf8").trim();

mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "CNAME"), `${domain}\n`);
