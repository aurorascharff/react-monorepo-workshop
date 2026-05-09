#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const stepsRoot = path.join(root, 'steps')

const args = process.argv.slice(2)
const options = {
  all: false,
  includeGenerated: false,
  nameOnly: false,
  nameStatus: false,
  stat: false,
  paths: [],
}

const positional = []

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i]

  if (arg === '--all') {
    options.all = true
  } else if (arg === '--include-generated') {
    options.includeGenerated = true
  } else if (arg === '--name-only') {
    options.nameOnly = true
  } else if (arg === '--name-status') {
    options.nameStatus = true
  } else if (arg === '--stat') {
    options.stat = true
  } else if (arg === '--path') {
    const next = args[i + 1]
    if (!next) fail('Missing value after --path.')
    options.paths.push(next)
    i += 1
  } else if (arg === '--help' || arg === '-h') {
    printHelp()
    process.exit(0)
  } else {
    positional.push(arg)
  }
}

const stepNames = readdirSync(stepsRoot)
  .filter((name) => /^step\d+$/.test(name))
  .sort((a, b) => stepNumber(a) - stepNumber(b))

if (stepNames.length < 2) {
  fail('Expected at least two steps in ./steps.')
}

let comparisons

if (positional.length >= 2 && isStep(positional[0]) && isStep(positional[1])) {
  const [from, to, ...paths] = positional
  comparisons = [[from, to]]
  options.paths.push(...paths)
} else if (positional.length === 0 || options.all) {
  comparisons = stepNames
    .slice(0, -1)
    .map((step, index) => [step, stepNames[index + 1]])
  options.stat ||= !options.nameOnly && !options.nameStatus && !options.all
  options.paths.push(...positional)
} else {
  fail(
    `Expected two step names, such as "step1 step2". Received: ${positional.join(' ')}`,
  )
}

for (const [from, to] of comparisons) {
  printHeader(from, to)
  runDiff(from, to)
}

function runDiff(from, to) {
  const diffArgs = ['diff', '--no-index', '--no-ext-diff']

  if (options.nameOnly) {
    diffArgs.push('--name-only')
  } else if (options.nameStatus) {
    diffArgs.push('--name-status')
  } else if (options.stat) {
    diffArgs.push('--stat')
  }

  diffArgs.push('--')

  const paths = options.paths.length > 0 ? options.paths : ['']

  const targetPaths = []

  for (const subpath of paths) {
    targetPaths.push(stepPath(from, subpath), stepPath(to, subpath))
  }

  diffArgs.push(...targetPaths)

  if (!options.includeGenerated && targetPaths.every(isDirectory)) {
    diffArgs.push(
      ':!node_modules/**',
      ':!**/node_modules/**',
      ':!apps/api/data/*.sqlite',
      ':!**/apps/api/data/*.sqlite',
      ':!apps/medix.com/next-env.d.ts',
      ':!**/apps/medix.com/next-env.d.ts',
    )
  }

  const result = spawnSync('git', diffArgs, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 100,
  })

  if (result.stdout) process.stdout.write(result.stdout)
  if (result.stderr) process.stderr.write(result.stderr)

  if (result.status > 1) {
    process.exit(result.status)
  }

  if (!result.stdout.trim() && !result.stderr.trim()) {
    console.log('No changes.')
  }
}

function isDirectory(target) {
  return statSync(path.join(root, target)).isDirectory()
}

function stepPath(step, subpath) {
  const target = path.join('steps', step, subpath)

  if (!existsSync(path.join(root, target))) {
    fail(`Path does not exist: ${target}`)
  }

  return target
}

function printHeader(from, to) {
  console.log(`\n## ${from} -> ${to}\n`)
}

function isStep(value) {
  return /^step\d+$/.test(value) && stepNames.includes(value)
}

function stepNumber(step) {
  return Number(step.replace('step', ''))
}

function fail(message) {
  console.error(message)
  console.error('')
  printHelp()
  process.exit(1)
}

function printHelp() {
  console.log(`Usage:
  npm run diff:steps
  npm run diff:steps -- --name-only
  npm run diff:steps -- --name-status
  npm run diff:steps -- --all
  npm run diff:steps -- step0 step1
  npm run diff:steps -- step0 step1 apps/arena
  npm run diff:steps -- --path apps/arena --stat

Default:
  Shows a summary for every adjacent step pair.

Options:
  --all        Show full patches for every adjacent step pair.
  --include-generated
               Include generated files such as node_modules output,
               SQLite data, and Next generated types.
  --name-only  Show changed file names only.
  --name-status
               Show changed file names with added/modified/deleted status.
  --stat       Show a diffstat.
  --path PATH  Compare only a path inside each step snapshot.
`)
}
