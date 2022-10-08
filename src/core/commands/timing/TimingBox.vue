<template>
    <div style="margin-bottom:10px; ">
        {{title}}  
        <div style="margin: 5px 0px;">
            剩余：{{ leaveSeconds.toFixed(2) }} 秒
            <template v-if="leaveSeconds > 0">
                <a-button v-if="counting" size="small" ghost danger @click="toggleCounting">
                    暂停
                </a-button>
                <a-button v-else size="small" ghost @click="toggleCounting">继续</a-button>
            </template>
        </div>
        <hr>
    </div>
</template>
<script setup lang="ts">
import { ref  , onMounted , onUnmounted , computed} from 'vue';
interface TimingProps {
    seconds :string
}
const props = defineProps<TimingProps>()

let timeTotal = ref(Number(props.seconds))
timeTotal.value = Math.floor(timeTotal.value) //规整为整数
let leaveSeconds = ref<number>(timeTotal.value)
let timer:any = null
let counting = ref<boolean>(true)

let title = computed(()=>{
  return `倒计时：${ timeTotal.value } 秒`
})

// 暂停 / 启动
let toggleCounting  = ()=>{
    counting.value = !counting.value
}

onMounted(() => {
    if(!leaveSeconds.value){
        return
    }
    timer = setInterval(()=>{
        if(counting.value){
            leaveSeconds.value--
        }
        if (leaveSeconds.value <= 0) {
            alert(`${timeTotal.value} 秒倒计时结束`);
            if (timer) {
                clearInterval(timer);
            }
        }
    },1000)

})

onUnmounted(()=>{
    if (timer) {
        clearInterval(timer);
    }
})

</script>
<style>
    
</style>