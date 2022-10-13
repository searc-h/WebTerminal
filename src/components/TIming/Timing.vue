<template>
    {{currenTime}}
</template>
<script setup lang="ts">
import Dayjs from '../../utils/myDayjs'
import {onMounted , onUnmounted , ref} from 'vue'

let currenTime = ref<any>("") 
let timer:any = null
let changeTime = ()=>{
    console.log("changeTime")
    currenTime.value =  Dayjs(new Date()).format("MM-DD HH : mm")
    timer =  setTimeout( changeTime ,10000)
}
onMounted(()=>{
    changeTime()
})

onUnmounted(()=>{
    clearTimeout(timer)
})

</script>
<style>
    
</style>