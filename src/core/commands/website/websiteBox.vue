<template>
    <div v-for="(item , index) in  websiteList" :key="index">
        {{item.webUrl}} -- {{index}}
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import websiteItem = websiteType.websiteItem
interface websiteList {
    websiteList : websiteItem[]
}
let  {websiteList} =  defineProps<websiteList>()
console.log("list is",websiteList)
</script>
<style >
    
</style>