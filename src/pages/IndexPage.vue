<template>
    <div class="index-page">

        <Timing/>
        
        <Terminal 
            ref="terminalRef"
            full-screen
            :onSubmitCommand="onSubmitCommand"
        />
    </div>
</template>
<script lang="ts" setup>
import TerminalType = Terminal.TerminalType
import Terminal from '../components/Terminal/Terminal.vue';
import { doCommandExecute } from '../core/commandExecutor';
import { ref , onMounted } from 'vue';

const terminalRef = ref()

let onSubmitCommand =async (text :string )=>{
    console.log(text)
    if(!text || !text.trim()){
        return
    }
    await doCommandExecute(text , terminalRef.value.terminal)
}


</script>
<style >
    .index-page{
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
    }
    
</style>