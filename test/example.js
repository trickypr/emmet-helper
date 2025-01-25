import test from 'node:test'
import * as assert from 'node:assert'

import { add } from '../src/lib.js'

test('add 2 and 3', () => assert.equal(add(2, 3), 5))
