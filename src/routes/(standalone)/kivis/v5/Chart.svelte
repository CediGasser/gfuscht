<script lang="ts">
  import * as d3 from 'd3'

  let container: HTMLDivElement | null = null

  type Node = d3.SimulationNodeDatum & {
    id: string
    group: string
    radius?: number
  }
  type Props = {
    data: {
      nodes: Node[]
      links: { source: string; target: string; value: number }[]
    }
    width?: number
    height?: number
  }
  const { data, width = 928, height = 680 }: Props = $props()

  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10)

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = structuredClone(data.links)
  const nodes = structuredClone(data.nodes)

  // Create a simulation with several forces.
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d: Node) => d.id)
    )
    .force('charge', d3.forceManyBody().strength(-10))
    .force('center', d3.forceCenter())

  $effect(() => {
    // Create the SVG container.
    const svg = d3
      .create('svg')
      .attr('width', width)
      .attr('fill', 'none')
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('style', 'max-width: 100%; height: auto;')

    // Add a line for each link, and a circle for each node.
    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value))

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => (d.radius ?? 1) * 2)
      .attr('fill', (d) => color(d.group))

    node.append('title').text((d) => d.id)

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
    })

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    // Add a drag behavior.
    node.call(
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    )

    if (container) {
      container.innerHTML = ''
      container.append(svg.node())
    }
  })
</script>

<div bind:this={container}></div>
