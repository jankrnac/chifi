<template>

<div>
    <div v-if="element.data.images.length" class="text-sm mb-2">Click on the image to change it. Drag to rearrange.</div>

    <draggable
        class="list-group flex gap-2 mb-2"
        :list="element.data.images"
  
        item-key="id"

        >
        <template #item="{ element, index }">
            <div class="inline-block relative group">
                <nuxt-img :src="element" class="inline-block rounded-lg" width="80" densities="x1" format="webp"/>
                <UploadSingle @uploaded="imageChanged" class="group-hover:flex hidden absolute inset-0 flex-col flex-1 justify-center items-center">
                    <div class="absolute inset-0" @click="currentIndex = index"></div>
                </UploadSingle>	
            </div>
        </template>

    </draggable>

    <UploadMulti @uploaded="imagesAdded">
        <Button color="blue">Add images</Button>
    </UploadMulti>

</div>

</template>
    
<script setup>
import draggable from "vuedraggable";

const props = defineProps(['element','options'])

const emits = defineEmits(['change'])

const currentIndex = ref()

const imageChanged = (data) => {
		props.element.data.images[currentIndex.value] = data.blob
        props.element.data.uploads = []
		props.element.data.uploads.push({
            [currentIndex.value]: data.form
        })
	}

const imagesAdded = (data) => {
    props.element.data.uploads = []

    let i = 1
    data.form.forEach(upload => {
        
        props.element.data.uploads.push({
            [props.element.data.images.length-1 + i]: upload
        })
        i++
    });

    props.element.data.images.push(...data.blobs)

}
</script>