<script setup>
import { computed, ref } from 'vue';
import CirculoDeQuintas from '../Components/CirculoDeQuintas.vue'
import CircleFifths from '../Components/CircleFifths.vue';
import RoundKeyThing from '../Components/RoundKeyThing.vue';

const notesSharp = ref(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']);
const notesFlat = ref(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);

const verComoSostenido = ref(true);

const notes = computed(() => verComoSostenido.value ? notesSharp.value : notesFlat.value);



</script>

<template>

    <div class="bg-emerald-100 h-full">
        <div class="bg-red-100">
            <!-- <CirculoDeQuintas :notes="notes" :ver-como-sostenido="verComoSostenido"></CirculoDeQuintas> -->
            <!-- <CircleFifths :notes="notes" :ver-como-sostenido="verComoSostenido"></CircleFifths> -->
            <RoundKeyThing></RoundKeyThing>
        </div>
    </div>
    
</template>

<style scoped>

</style>