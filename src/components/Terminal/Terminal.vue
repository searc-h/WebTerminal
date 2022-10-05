<template >
    <div class="terminal-outer">
        <ContentOutput />
    </div>
</template>
<script lang="ts" setup>
import TerminalType = Terminal.TerminalType
import ContentOutput from '@/components/Content/ContentOutput.vue'
import { registerShortcuts } from '../shortcuts';
import { onMounted } from 'vue';

const terminal  = {}

onMounted(()=>{
    registerShortcuts(terminal as TerminalType)
})
</script>
<style scoped>
    .terminal-outer{
        width: 100vw;
        height: 100vh;
        background-color: black;
    }
</style>