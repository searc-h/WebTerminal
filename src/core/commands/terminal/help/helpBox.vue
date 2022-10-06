<template>
    <div>
        <div class="tiltle"> 命令列表：</div>
        <li v-for="(item , index) in commandMap" :key="index">
            <a-row :gutter="16">
                <a-col :span="4">{{item.func}}</a-col>
                <a-col >--</a-col>
                <a-col :span="14">{{item.desc}}</a-col>
            </a-row>
        </li>
    </div>
</template>
<script lang="ts" setup>
import { commandMap } from '../../../commandRegister';
console.log("commandMap is " ,commandMap)
</script>
<style lang="">
    
</style>