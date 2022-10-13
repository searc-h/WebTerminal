<template>
    <div class="index-page">
        <div class="timing">
            <Timing/>
        </div>
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
    .timing{
        width: 200px;
        text-align: center;
        border-radius: 10px;
        position: absolute;
        top: 20px;
        right: 40px;
        font-size: 25px;
        font-weight: 999;
        color: #fff;
        z-index: 999;
        background-color: rgba(215, 214, 214, 0.5);
        cursor: pointer;
        line-height: 40px;
        transition: all 0.3s linear;
    }
    .timing:hover{
        font-size: 26px;
        font-weight: 9;
    }
</style>