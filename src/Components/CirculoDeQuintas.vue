<script setup>
import { defineProps, onMounted, useTemplateRef, ref, watch } from 'vue'
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

const chordContainer = useTemplateRef('chordContainer')
const wheelContainer = useTemplateRef('wheelContainer')
const canvas = useTemplateRef('canvas')

//colores mas oscuros para los menores
let minorColors = {};
for (let letter in Colors) {
    let minColor = Colors[letter];
    minorColors[letter] = `rgb(${parseInt(minColor.substring(4, minColor.indexOf(","))) - 20}, ${parseInt(minColor.substring(minColor.indexOf(",") + 2, minColor.lastIndexOf(","))) - 20}, ${parseInt(minColor.substring(minColor.lastIndexOf(",") + 2, minColor.lastIndexOf(")"))) - 20})`;
}

// variables del círculo
const positions = ref(getPositionsCircle(props.notes));
let ctx = null
let center = 0
let radius = 0
let innerRadius = 0
let currentLetter  = "C";
let currentKey = "major";


onMounted(() => {
    ctx = canvas.value.getContext('2d');
    radius = canvas.value.width;
    center = canvas.value.width;
    innerRadius = 0.66 * radius;

    resize();
    size();

    //event listener en caso de hacer resize de la ventana
    window.addEventListener('resize', () => {
        resize();
        size();
    });
})

const size = () => {
    const margin = 15;
    let dim = Math.min(chordContainer.value.offsetWidth, chordContainer.value.offsetHeight);
    console.log(chordContainer.value)
    dim -= margin * 2;

    wheelContainer.value.style.width = `${dim}px`;
    wheelContainer.value.style.height = `${dim}px`;
    wheelContainer.value.style.marginLeft = `${-dim / 2}px`;
    wheelContainer.value.style.marginTop = `${-dim / 2}px`;

    canvas.value.width = dim*2;
    canvas.value.height = dim*2;
    console.log(dim)
    radius = dim / 2;
    center = radius;
    innerRadius = 0.66 * radius;

    draw(currentLetter, currentKey);
}

const resize = () => {
    radius = Math.min(canvas.value.width, canvas.value.height);
    center = radius;
    ctx.canvas.width = canvas.value.width * 2;
    ctx.canvas.height = canvas.value.height * 2;
    innerRadius = 0.66 * radius;

    draw(currentLetter, currentKey);
}


const draw = (letter, key) => {

    currentLetter = letter;
    currentKey = key;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let major = (key === "major") // true si la key es major, false si es minor
    
    let centerX = canvas.value.width / 2;
    let centerY = canvas.value.height / 2;

    //dibujar las mayores
    for(let majChordLetter in positions.value.major) {
        let majChord = positions.value.major[majChordLetter];
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
    for(let minChordLetter in positions.value.minor) {
        let minChord = positions.value.minor[minChordLetter];
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

//si las notas cambian, actualizar el circulo
watch(() => props.notes, (newNotes) => {
    positions.value = getPositionsCircle(newNotes);
    draw(currentLetter, currentKey);
});

</script>

<template>
    <div id="Chord" ref="chordContainer">
        <div id="Wheel" ref="wheelContainer" class="bg-red-100">
            <canvas ref="canvas" id="circulo" class="bg-amber-300"></canvas>

        </div>
    </div>
</template>

<style scoped>

</style>