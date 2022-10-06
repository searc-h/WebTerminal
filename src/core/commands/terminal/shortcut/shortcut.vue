<template>
    <div class="shortcuts">
        <div class="tiltle"> 快捷键列表：</div>
        <a-row :gutter="16">
                <a-col :span="4">{{'按键:'}}</a-col>
                <a-col >--</a-col>
                <a-col :span="14">{{"作用描述:"}}</a-col>
            </a-row>
        <li v-for="(item , index) in shortcutArr" :key="index">
            <a-row :gutter="16">
                <a-col :span="4">{{item.keyDesc}}</a-col>
                <a-col >--</a-col>
                <a-col :span="14">{{item.desc}}</a-col>
            </a-row>
        </li>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { shortcutsList } from "../../../../components/shortcuts";
interface showCut {
    keyDesc: string,
    desc: string,
}
let shortcutArr = ref<showCut[]>([])

shortcutArr.value = shortcutsList.map((item)=>{
    return {keyDesc :item.keyDesc , desc : item.desc}
})

</script>
<style lang="">
    
</style>