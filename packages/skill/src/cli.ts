#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { buildDemoProofBundle, renderProofMarkdown, writeProofBundle } from "./proofBundle.js";

interface DemoOptions {
  out: string;
  public?: string;
  markdown?: string;
}

const [, , command, ...args] = process.argv;

if (command !== "demo") {
  process.stderr.write("Usage: paid-receipt demo --out <path> [--public <path>] [--markdown <path>]\n");
  process.exit(1);
}

const options = parseDemoOptions(args);
const bundle = buildDemoProofBundle();
writeProofBundle(bundle, options.out);

if (options.public) {
  writeProofBundle(bundle, options.public);
}

if (options.markdown) {
  writeFileSync(options.markdown, renderProofMarkdown(bundle));
}

process.stdout.write(`proof_bundle=${options.out}\n`);
process.stdout.write(`chain_root=${bundle.chainRoot}\n`);
process.stdout.write(`publish_status=${bundle.chainPublish.status}\n`);

function parseDemoOptions(argv: string[]): DemoOptions {
  const options: Partial<DemoOptions> = {};

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];

    if (flag === "--out") {
      options.out = value;
      index += 1;
    } else if (flag === "--public") {
      options.public = value;
      index += 1;
    } else if (flag === "--markdown") {
      options.markdown = value;
      index += 1;
    }
  }

  if (!options.out) {
    throw new Error("--out is required");
  }

  return options as DemoOptions;
}
