<script setup>
//usando como guia: https://blog.logrocket.com/interactive-svg-circle-of-fifths/
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps(
    {
        notes: Array,
        verComoSostenido: Boolean
    }
)

const labels = ref([])
const size = 300;
const radius = size / 2;
const svg = ref('')

onMounted(() => {
    for (let i = 0; i < 12; i++) {
        // majorOrder.value.push( props.notes[(i * 7) % 12]);
        // minorOrder.value.push( props.notes[(i * 7 + 9) % 12]);
        labels.value.push({
            outer: props.notes[i],
            major: props.notes[(i * 7) % 12],
            minor: props.notes[(i * 7 + 9) % 12].toLowerCase()
        })
    }

    svg.value = labels.value.map((obj, index) => {
    const angle = index * (360 / labels.value.length);
    const [x0, y0] = posXY(radius, 125, angle);
    const [x1, y1] = posXY(radius, 85, angle);
    const [x2, y2] = posXY(radius, 55, angle);

    return `
        <g class="cf-arcs">
            ${segment(index, labels.length, size, radius, 0, 50)}
            ${segment(index, labels.length, size, radius, 0, obj.major)}
            ${segment(index, labels.length, size, 100, 0, 30, obj.minor)}
        </g>
        <text x="${x1}" y="${y1+3}" style="fill: #fff;" class="cf-text-middle">${obj.major}</text>
        <text x="${x2}" y="${y2+2}" style="fill: #fff;" class="cf-text-inner">${obj.minor}</text>
        `
    }).join('')
    console.log("svg: ", svg)
})

function polarToCartesian(x, y, r, degrees) {
  const radians = degrees * Math.PI / 180.0;
  return [x + (r * Math.cos(radians)), y + (r * Math.sin(radians))]
}

function segmentPath(x, y, r0, r1, d0, d1) {
  const arc = Math.abs(d0 - d1) > 180 ? 1 : 0
  const point = (radius, degree) =>
    polarToCartesian(x, y, radius, degree)
      .map(n => n.toPrecision(5))
      .join(',')
  return [
    `M${point(r0, d0)}`,
    `A${r0},${r0},0,${arc},1,${point(r0, d1)}`,
    `L${point(r1, d1)}`,
    `A${r1},${r1},0,${arc},0,${point(r1, d0)}`,
    'Z',
  ].join('')
}

function segment(index, seegments, size, radius, width) {
    const center = size / 2;
    const degrees = 360 / seegments;
    const start = degrees * index;
    const end = (degrees * (index + 1)); // +1 to avoid gaps
    const path = segmentPath(center, center, radius, radius - width, start, end);
    return `<path d="${path}" />`
}

function posXY(center, radius, angle){
    return [
        center + radius * Math.cos(angle * Math.PI / 180),
        center + radius * Math.sin(angle * Math.PI / 180)
    ]
}


</script>

<template>
    <svg id="circulo" width="300" height="300" viewBox="0 0 300 300">
        <template v-for="index in 12">
            <svg v-html="segment(index, 12, 300, 150, 50)" />
            <svg v-html="segment(index, 12, 300, 100, 30)" />
            <svg v-html="segment(index, 12, 300, 70, 30)" />
        </template>
        <svg v-html="svg"></svg>
    </svg>

</template>

<style scoped>
#circulo{
    transform: rotate(-15deg);
    transform-origin: 50% 50%;
}
</style>