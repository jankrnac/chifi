<template>
<div class="mb-6 md:mb-12">
    <h1 class="text-center text-2xl lg:text-4xl font-bold mt-12 mb-2">
        {{doc.title}}
    </h1>

    <div v-if="doc.releaseDate" class="text-center text-gray-500 text-sm md:text-base">Release date: <b class="font-semibold">{{ new Date(doc.releaseDate).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}) }}</b></div>
</div>
</template>

<script setup>
defineProps(['doc'])
</script>