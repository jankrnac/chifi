<template>

    <template v-if="posts.length">

    <div class="w-full max-w-app mt-6 lg:mt-12">

        <div class="mx-auto lg:mb-32 mb-16 lg:mt-16 grid grid-cols-1 gap-x-8 gap-y-8 md:gap-y-20 md:grid-cols-2 lg:grid-cols-3 lg:mx-0 lg:max-w-none xl:grid-cols-4">

            <template v-for="post in posts">
                <ArticleBox v-if="post.type == 'article'" :post="post" />
                <ReviewBox v-else :post="post"/>
            </template>
        </div>

    </div>

    </template>

    <template v-else>
        <AddPage />
    </template>

</template>

<script setup>


useSeoMeta({
    title: 'Chi-fi news and user reviews',
    description: `Collection of Chi-fi audio news and user reviews all created by users, for users. Explore reviews, comparisons, and user insights to find the perfect audio companion for your 
    unique preferences. In the ever-changing world of Chi-Fi, one can easily become lost. But fear not, Rechifi is all you need to stay informed and make the best decisions to fully satisfy 
    your audiophile needs.`
})

const { data:posts } = await useFetch('/api/posts')


</script>