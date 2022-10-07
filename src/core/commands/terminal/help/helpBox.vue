<template>
    <div>
        <div class="tiltle"> 命令列表：</div>
        <li v-for="(item , index) in commandList" :key="index">
            <a-row :gutter="16">
                <a-col :span="4">{{item.func}}</a-col>
                <a-col >--</a-col>
                <a-col :span="6">{{item.desc}}</a-col>
                <template v-if="item.alias?.length">
                    <a-col >指令缩写：{{item.alias}}</a-col>
                </template>
            </a-row>
        </li>
    </div>
</template>
<script lang="ts" setup>
import { commandList } from '../../../commandRegister';

</script>
<style lang="">
    
</style>