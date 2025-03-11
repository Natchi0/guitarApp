<script setup>
//tercer intento, siguiendo como guia https://epiccoleman.com/posts/2023-04-05-svg-circle-of-fifths
import PiezaCirculo from './PiezaCirculo.vue';
import { CircleData } from '../Logic/CircleData';
import tinycolor from 'tinycolor2';
const data = [
    "rgb(246, 190, 55)",
    "rgb(128, 100, 198)",
    "rgb(149, 198, 49)",
    "rgb(237, 56, 131)",
    "rgb(69, 181, 161)",
    "rgb(247, 148, 61)",
    "rgb(78, 97, 216)",
    "rgb(209, 193, 46)",
    "rgb(165, 66, 177)",
    "rgb(75, 178, 80)",
    "rgb(247, 88, 57)",
    "rgb(69, 152, 182)",
]

function polarToCartesian(x, y, r, degrees) {
  const radians = degrees * Math.PI / 180.0;
  return [x + (r * Math.cos(radians)), y + (r * Math.sin(radians))]
}


</script>

<template>
    <h1 class="text-2xl text-center">key thing</h1>

    <svg class="container m-auto" width="800" height="800" viewBox="0 0 400 400">

        <g class="orientacion">
            <template v-for="(v, i) in data">
                <PiezaCirculo :x="200" :y="200" :r0="180" :r1="120" :d0="(i + 1) * 30" :d1="((i + 2) * 30) + 1" :color="v"></PiezaCirculo>
                <PiezaCirculo :x="200" :y="200" :r0="120" :r1="80" :d0="(i + 1) * 30" :d1="((i + 2) * 30) + 1" :color="tinycolor(v).darken(10).toString()"></PiezaCirculo>
                <PiezaCirculo :x="200" :y="200" :r0="80" :r1="50" :d0="(i + 1) * 30" :d1="((i + 2) * 30) + 1" :color="tinycolor(v).darken(20).toString()"></PiezaCirculo>
            </template>
        </g>

        
        <g>
            <template v-for="(v, i) in CircleData">
                <text class="textNota"
                    :x="polarToCartesian(200, 200, 150, (i * 30) - 90)[0]"
                    :y="polarToCartesian(200, 200, 150, (i * 30) - 90)[1]"
                    :transform="'rotate(' + ((i * 30) - 90) + ' ' + polarToCartesian(200, 200, 150, (i * 30) - 90)[0] + ' ' + polarToCartesian(200, 200, 150, (i * 30) - 90)[1] + ') rotate(' + (-(i * 30) + 90) + ' ' + polarToCartesian(200, 200, 150, (i * 30) - 90)[0] + ' ' + polarToCartesian(200, 200, 150, (i * 30) - 90)[1] + ')'"
                >{{ v.note }}</text>

                <text class="textNota"
                    :x="polarToCartesian(200, 200, 100, (i * 30) - 90)[0]"
                    :y="polarToCartesian(200, 200, 100, (i * 30) - 90)[1]"
                    :transform="'rotate(' + ((i * 30) - 90) + ' ' + polarToCartesian(200, 200, 100, (i * 30) - 90)[0] + ' ' + polarToCartesian(200, 200, 100, (i * 30) - 90)[1] + ') rotate(' + (-(i * 30) + 90) + ' ' + polarToCartesian(200, 200, 100, (i * 30) - 90)[0] + ' ' + polarToCartesian(200, 200, 100, (i * 30) - 90)[1] + ')'"
                >{{ v.relativeMinor }}</text>

                <text class="textNota"
                    :x="polarToCartesian(200, 200, 65, (i * 30) - 90)[0]"
                    :y="polarToCartesian(200, 200, 65, (i * 30) - 90)[1]"
                    :transform="'rotate(' + ((i * 30) - 90) + ' ' + polarToCartesian(200, 200, 65, (i * 30) - 90)[0] + ' ' + polarToCartesian(200, 200, 65, (i * 30) - 90)[1] + ') rotate(' + (-(i * 30) + 90) + ' ' + polarToCartesian(200, 200, 65, (i * 30) - 90)[0] + ' ' + polarToCartesian(200, 200, 65, (i * 30) - 90)[1] + ')'"
                >{{ v.diminished }}</text>
            </template>
        </g>
    
    </svg>
</template>

<style scoped>
.textNota {
    text-anchor: middle;
    dominant-baseline: central;
    font-size: 12px;
    fill: white;
}

.orientacion {
    transform: rotate(15deg);
    transform-origin: 200px 200px;
}
</style>