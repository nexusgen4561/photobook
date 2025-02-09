const d3 = require('d3')
const { collapse, wrapText, helpers } = require('../utils')
const defineBoxShadow = require('../defs/defineBoxShadow')
const defineAvatarClip = require('../defs/defineAvatarClip')
const render = require('./render')
const defaultConfig = require('./config')

module.exports = {
  init,
}

function init(options) {
  // Merge options with the default config
  const config = {
    ...defaultConfig,
    ...options,
    treeData: options.data,
  }

  if (!config.id) {
    console.error('react-org-chart: missing id for svg root')
    return
  }

  const {
    id,
    treeData,
    lineType,
    margin,
    nodeWidth,
    nodeHeight,
    nodeSpacing,
    shouldResize,
    loadConfig,
  } = config

  // Calculate how many pixel nodes to be spaced based on the
  // type of line that needs to be rendered
  if (lineType == 'angle') {
    config.lineDepthY = nodeHeight + 40
  } else {
    config.lineDepthY = nodeHeight + 60
  }

  // Get the root element
  const elem = document.querySelector(id)

  if (!elem) {
    console.error(`react-org-chart: svg root DOM node not found (id: ${id})`)
    return
  }

  // Reset in case there's any existing DOM
  elem.innerHTML = ''

  const elemWidth = elem.offsetWidth
  const elemHeight = elem.offsetHeight

  // Setup the d3 tree layout
  config.tree = d3.layout
    .tree()
    .nodeSize([nodeWidth + nodeSpacing, nodeHeight + nodeSpacing])

  // Calculate width of a node with expanded children
  const childrenWidth = parseInt((treeData.children.length * nodeWidth) / 2)

  // <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" xml:space="preserve" viewBox="0 0 193 260" enable-background=" new 0 0 193 260" height="260" width="193"
  // Add svg root for d3
  const svgroot = d3
    .select(id)
    .append('svg')
    .attr('id', 'svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('x', '0px')
    .attr('y', '0px')
    .attr('xml:space', 'preserve')
    .attr('viewBox', `0 0 ${elemWidth} ${elemHeight}`)
    .attr('enable-background', ` new 0 0 ${elemWidth} ${elemHeight}`)
    .attr('width', elemWidth)
    .attr('height', elemHeight)

  // Add our base svg group to transform when a user zooms/pans
  const svg = svgroot
    .append('g')
    .attr(
      'transform',
      'translate(' +
      parseInt(
        childrenWidth + (elemWidth - childrenWidth * 2) / 2 - margin.left / 2
      ) +
      ',' +
      48 +
      ')'
    )

  // Define box shadow and avatar border radius
  defineBoxShadow(svgroot, 'boxShadow')
  defineAvatarClip(svgroot, 'avatarClip', {
    borderRadius: 40,
  })

  // Center the viewport on initial load
  treeData.x0 = 0
  treeData.y0 = elemHeight / 2

  // Collapse all of the children on initial load
  treeData.children.forEach(collapse)

  // Connect core variables to config so that they can be
  // used in internal rendering functions
  config.svg = svg
  config.svgroot = svgroot
  config.elemWidth = elemWidth
  config.elemHeight = elemHeight
  config.render = render

  // Start initial render
  render(config)

  // Update DOM root height
  d3.select(id).style('height', elemHeight + margin.top + margin.bottom)

  //creating  canvas and duplicate svg for image and PDF download
  const canvasContainer = document.createElement('div')
  canvasContainer.setAttribute('id', `${id}-canvas-container`)
  canvasContainer.setAttribute('style', 'display:none;')

  //duplicate svg container
  const svgContainer = document.createElement('div')
  svgContainer.setAttribute('id', `${id}-svg-container`)
  svgContainer.setAttribute('style', 'display:none;')

  //appending svg and canvas containers to root
  const orgChart = document.getElementById('root')
  orgChart.append(canvasContainer)
  orgChart.append(svgContainer)
}