<template>

    <div class="flex flex-col flex-grow justify-center items-center mb-24">

        <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-24">
            <span class="font-bold">Post </span> 
            <span class="font-playfair">new</span>
        </h1>

        <div class="md:flex md:space-x-12">
            <nuxt-link to="/blog/new" class="mb-6 md:mb-0 font-light flex flex-col items-center gap-5 dark:border-gray-600 border rounded-xl px-16 py-10 md:px-20 md:py-12 hover:border-blue-400 transition-all hover:text-blue-800 hover:font-bold">
                <UIcon name="i-ph-newspaper-light" size="80px" />
                <div class="text-4xl w-32 text-center">Article</div>
            </nuxt-link>
            <nuxt-link to="/reviews/new" class="font-light flex flex-col items-center gap-5 border dark:border-gray-600 rounded-xl px-16 py-10 md:px-20 md:py-12 hover:border-green-400 transition-all hover:text-green-800 hover:font-bold">
                <UIcon name="i-ph-star-light" size="80px" />
                <div class="text-4xl w-36 text-center">Review</div>
            </nuxt-link>
        </div>

    </div>
</template>
