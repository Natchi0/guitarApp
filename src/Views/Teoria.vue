<script setup>
import { computed, ref } from 'vue';
import CirculoDeQuintas from '../Components/CirculoDeQuintas.vue'

const notesSharp = ref(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']);
const notesFlat = ref(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);

const verComoSostenido = ref(true);

const notes = computed(() => verComoSostenido.value ? notesSharp.value : notesFlat.value);



</script>

<template>

    <div class="bg-emerald-100 h-full">
        <div class="h-60 w-60 mx-auto">
            <CirculoDeQuintas :notes="notes" :ver-como-sostenido="verComoSostenido"></CirculoDeQuintas>
        </div>
    </div>
    
</template>

<style scoped>

</style>