import test from 'node:test'
import * as assert from 'node:assert'

import { expandLustre } from '../src/lib.js'

test('name', () => assert.equal(expandLustre('div'), 'html.div([], [])'))
test('name - self closing', () =>
  assert.equal(expandLustre('img'), 'html.img([])'))

test('children', () => {
  assert.equal(expandLustre('div>img'), 'html.div([], [html.img([])])')
})
test('siblings', () => {
  assert.equal(
    expandLustre('div>img+img'),
    'html.div([], [html.img([]), html.img([])])',
  )
})

test('classes', () => {
  assert.equal(
    expandLustre('div.class-1.class-2'),
    'html.div([attributes.class("class-1"), attributes.class("class-2")], [])',
  )
})
test('id', () => {
  assert.equal(
    expandLustre('div#id>img'),
    'html.div([attributes.id("id")], [html.img([])])',
  )
})

test('string attributes', () => {
  assert.equal(
    expandLustre('div[for="some_id"]'),
    'html.div([attributes.for("some_id")], [])',
  )
})
test('bool attributes', () => {
  assert.equal(
    expandLustre('input[readonly]'),
    'html.input([attributes.readonly(True)])',
  )
})
test('int attributes', () => {
  assert.equal(
    expandLustre('input[rows=3]'),
    'html.input([attributes.rows(3)])',
  )
})
test('list attributes', () => {
  assert.equal(
    expandLustre('input[accept="json,yaml"]'),
    'html.input([attributes.accept(["json", "yaml"])])',
  )
})
test('unknown attributes', () => {
  assert.equal(
    expandLustre('input[unknown=value]'),
    'html.input([attributes.attribute("unknown", "value")])',
  )
})

test('text', () => {
  assert.equal(
    expandLustre('div{content}'),
    'html.div([], [html.text("content")])',
  )
})
test('repeat - simple', () => {
  assert.equal(
    expandLustre('div*4'),
    'html.div([], []), html.div([], []), html.div([], []), html.div([], [])',
  )
})
test('repeat - text', () => {
  assert.equal(
    expandLustre('div{content $}*2'),
    'html.div([], [html.text("content 1")]), html.div([], [html.text("content 2")])',
  )
})
