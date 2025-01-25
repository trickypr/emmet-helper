import { exit, stdin, stdout } from 'node:process'
import { parseArgs } from 'node:util'
import { readFileSync } from 'node:fs'

import { expandLustre } from './lustre.js'
import { createInterface } from 'node:readline'

/** @satisfies {import('node:util').ParseArgsConfig['options']} */
const options = {
  target: {
    type: 'string',
  },
}

const { values } = parseArgs({ options })

if (values.target !== 'lustre') {
  console.log('The only currently supported target is lustre')
  exit(1)
}

const rl = createInterface({
  input: stdin,
  output: stdout,
  terminal: false,
})

rl.on('line', (line) => {
  console.log(expandLustre(line))
})

rl.once('close', () => exit(1))
