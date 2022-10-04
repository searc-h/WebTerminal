<template >
    <div class="terminal-outer">
        <ContentOutput />
    </div>
</template>
<script lang="ts" setup>
import ContentOutput from '@/components/Content/ContentOutput.vue'

</script>
<style scoped>
    .terminal-outer{
        width: 100vw;
        height: 100vh;
        background-color: black;
    }
</style>