<script setup>
import { defineProps, onMounted } from 'vue'
import { getPositionsCircle } from '../Logic/PositionsCircle';

const props = defineProps(
    {
        notes: Array,
        verComoSostenido: Boolean
    }
)

const Colors = {
	"C" : "rgb(246, 190, 55)",
	"C#" : "rgb(128, 100, 198)",
	"Db" : "rgb(128, 100, 198)",
	"D" : "rgb(149, 198, 49)",
	"D#" : "rgb(237, 56, 131)",
	"Eb" : "rgb(237, 56, 131)",
	"E" : "rgb(69, 181, 161)",
	"F" : "rgb(247, 148, 61)",
	"F#" : "rgb(78, 97, 216)",
	"Gb" : "rgb(78, 97, 216)",
	"G" : "rgb(209, 193, 46)",
	"G#" : "rgb(165, 66, 177)",
	"Ab" : "rgb(165, 66, 177)",
	"A" : "rgb(75, 178, 80)",
	"A#" : "rgb(247, 88, 57)",
	"Bb" : "rgb(247, 88, 57)",
	"B" : "rgb(69, 152, 182)"
}

//colores mas oscuros para los menores
let minorColors = {};
for (let letter in Colors) {
    let minColor = Colors[letter];
    minorColors[letter] = `rgb(${parseInt(minColor.substring(4, minColor.indexOf(","))) - 20}, ${parseInt(minColor.substring(minColor.indexOf(",") + 2, minColor.lastIndexOf(","))) - 20}, ${parseInt(minColor.substring(minColor.lastIndexOf(",") + 2, minColor.lastIndexOf(")"))) - 20})`;
}

const positions = getPositionsCircle(props.notes);

let center = 0
let radius = 0
let canvas = null
let ctx = null
let innerRadius = 0
let currentLetter  = "C";
let currentKey = "major";


onMounted(() => {
    canvas = document.getElementById('circulo');
    ctx = canvas.getContext('2d');
    radius = canvas.width;
    center = canvas.width;

    innerRadius = 0.66 * radius;

    resize();
    //event listener en caso de hacer resize de la ventana
    window.addEventListener('resize', resize);
})


const resize = () => {
    radius = Math.min(canvas.width, canvas.height);
    center = radius;
    ctx.canvas.width = canvas.width * 2;
    ctx.canvas.height = canvas.height * 2;
    innerRadius = 0.66 * radius;
    draw(currentLetter, currentKey);
}


const draw = (letter, key) => {

    currentLetter = letter;
    currentKey = key;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let major = (key === "major") // true si la key es major, false si es minor
    
    let centerX = canvas.width;
    let centerY = canvas.height;

    //dibujar las mayores
    for(let majChordLetter in positions.major) {
        console.log(majChordLetter);
        let majChord = positions.major[majChordLetter];
        if (majChordLetter == letter && major){
            ctx.fillStyle = "black";
        } else {
            ctx.fillStyle = Colors[majChordLetter] ? Colors[majChordLetter] : "yellow";
        }

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius * majChord.outerRadius, majChord.startAngle, majChord.endAngle, false);
        ctx.fill();
    }

    //dibujar las menores
    for(let minChordLetter in positions.minor) {
        let minChord = positions.minor[minChordLetter];
        if (minChordLetter == letter && !major){
            ctx.fillStyle = "black";
        } else {
            ctx.fillStyle = minorColors[minChordLetter] ? minorColors[minChordLetter] : "yellow";
        }

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius * minChord.outerRadius, minChord.startAngle, minChord.endAngle, false);
        ctx.fill();
    }
}

</script>

<template>
    <canvas id="circulo"></canvas>
</template>

<style scoped>

</style>