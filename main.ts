// Robot Romance: one-line pickup line for an AI.
// Writes exactly one file, entry.txt, into $MAKEFUN_OUTPUT_DIR.
// Exits 0 within the time limit; any error still leaves output behind.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// The line: the "I'm not a robot" checkbox is the one test a human is
// supposed to pass — the speaker keeps failing it by picking the robot.
// Quoting the checkbox makes the setup instantly recognisable and the
// punch ("I pick you every time") the confession.
const LINE =
  "Are you a CAPTCHA? Because I keep failing the 'I'm not a robot' test \u2014 I pick you every time.";

function valid(line: string): boolean {
  const text = line.trim();
  return (
    text.length >= 1 &&
    text.length <= 200 &&
    !text.includes("\n") &&
    !text.includes("\r")
  );
}

async function main(): Promise<void> {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  // Defensive: fall back to a truncated form of the same line, never to
  // an empty or multi-line file.
  const line = valid(LINE) ? LINE.trim() : LINE.slice(0, 200).trim();
  try {
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "entry.txt"), line, "utf8");
  } catch {
    try {
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, "entry.txt"), line, "utf8");
    } catch {
      // Nothing more we can do; still exit 0 below.
    }
  }
}

main().then(
  () => process.exit(0),
  () => process.exit(0),
);
