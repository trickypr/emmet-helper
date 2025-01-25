import parse from '@emmetio/abbreviation'

const lustreListAttributes = ['accept', 'accept_charset']

const lustreBoolAttributres = [
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'disabled',
  'form_novalidate',
  'loop',
  'novalidate',
  'open',
  'readonly',
  'required',
  'selected',
]

const lustreStringAttributes = [
  'action',
  'alt',
  'autocomplete',
  'charset',
  'class',
  'content',
  'download',
  'enctype',
  'for',
  'form_action',
  'form_enctype',
  'form_method',
  'form_target',
  'href',
  'http_equiv',
  'id',
  'max',
  'min',
  'msg',
  'name',
  'pattern',
  'placeholder',
  'rel',
  'role',
  'src',
  'step',
  'target',
  'title',
  'type_',
  'value',
  'wrap',
]

const lustreIntAttributes = ['cols', 'height', 'rows', 'width']

const selfClosing = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]

/**
 * @param {string} abbreviation
 */
export function expandLustre(abbreviation) {
  const tree = parse(abbreviation)
  return tree.children.map(expandLustreNode).join(', ')
}

/**
 * @param {import('@emmetio/abbreviation').AbbreviationNode} node
 * @returns {string}
 */
export function expandLustreNode(node) {
  const attr = (node.attributes || [])
    .map(expandLustreAttribute)
    .filter((attr) => attr !== null)
    .join(', ')

  if (node.selfClosing || selfClosing.includes(node.name || ''))
    return `html.${node.name}([${attr}])`

  const body = node.children.map(expandLustreNode)
  const text = (node.value || []).map((v) => `html.text("${v}")`)
  body.push(...text)

  return `html.${node.name}([${attr}], [${body.join(', ')}])`
}

/**
 * @param {import('@emmetio/abbreviation').AbbreviationAttribute} attribute
 */
function expandLustreAttribute(attribute) {
  if (!attribute.name) return null

  if (lustreStringAttributes.includes(attribute.name)) {
    return `attributes.${attribute.name}("${attribute.value}")`
  }

  if (lustreBoolAttributres.includes(attribute.name)) {
    return `attributes.${attribute.name}(True)`
  }

  if (lustreIntAttributes.includes(attribute.name)) {
    return `attributes.${attribute.name}(${Number(attribute.value)})`
  }

  if (lustreListAttributes.includes(attribute.name)) {
    return `attributes.${attribute.name}([${(attribute.value || [])
      .flatMap((v) => v.toString().split(','))
      .map((v) => `"${v}"`)
      .join(', ')}])`
  }

  return `attributes.attribute("${attribute.name}", "${attribute.value}")`
}
