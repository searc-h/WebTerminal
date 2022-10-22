<template>
    <div>
        <iframe
        v-if="musicPath"
        frameborder="no"
        marginwidth="0"
        marginheight="0"
        width="330"
        height="86"
        :src="musicPath"
        />

        <div v-if="errorHint">{{ errorHint }}</div>
    </div>
</template>
<script setup lang="ts">
import {ref , onMounted ,toRefs} from 'vue'

import { musicApi } from "./musicApi"
interface musicBoxProps {
    musicName:string
}
const props = defineProps<musicBoxProps>()
let {musicName} = toRefs(props)
let musicPath = ref<string>("")
let errorHint = ref<string>("")
onMounted(async ()=>{
    let result:any = await musicApi(musicName.value)
    if(result.error == 0){
        musicPath.value = `//music.163.com/outchain/player?type=2&id=${result.data.id}&auto=1&height=66`;
    }else{
        errorHint.value = "未找到音乐";
    }
})

</script>
<style lang="">
    
</style>