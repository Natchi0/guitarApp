<script setup>
import { defineProps, ref } from 'vue';
import { useCircle } from '../Composables/useCircle';
/**
 * este componente es basicamente esto
 * 
 * function segment(index, seegments, size, radius, width) {
    const center = size / 2;
    const degrees = 360 / seegments; //siempre es 30
    const start = degrees * index;
    const end = (degrees * (index + 1) + 1); // +1 to avoid gaps
    const path = segmentPath(center, center, radius, radius - width, start, end);
    return `<path d="${path}" />`
}
 */

const props = defineProps({
    x: Number,
    y: Number,
    r0: Number,
    r1: Number,
    d0: Number,
    d1: Number,
    color: String,
    nota: String
})

const {selectedKey, selectKey} = useCircle()

const selected = ref(false)

function seleccionarNota(){
  selectKey(props.nota)
  selected.value = !selected.value
}

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

</script>

<template>
  <path class="wedge hover:fill-slate-700" :class="{'fill-black': selected}" stroke="black" :fill="props.color ? props.color : 'white'" :d="segmentPath(props.x, props.y, props.r0, props.r1, props.d0, props.d1)" @click="seleccionarNota"></path>
</template>

<style scoped>
.wedge {
  transition: fill 0.2s;
}


</style>