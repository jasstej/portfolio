#!/usr/bin/env node
const { execSync } = require('node:child_process');
const { writeFileSync } = require('node:fs');
try {
  const date = execSync("git log -1 --format=%cd", { encoding: "utf8" }).trim();
  // Write .env.local safely (append or create)
  const line = `NEXT_PUBLIC_LAST_COMMIT_DATE=${date}\n`;
  writeFileSync('.env.local', line, { flag: 'a' });
  console.log('Set NEXT_PUBLIC_LAST_COMMIT_DATE:', date);
} catch (e) {
  console.warn('Could not set NEXT_PUBLIC_LAST_COMMIT_DATE:', e.message);
}
