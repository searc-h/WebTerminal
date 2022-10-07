<template>
    <div>
        <a-row :gutter="16">
            <a-col :span="20">指令：{{command.func}}</a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="20">命名：{{command.name}}</a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="20">功能：{{command.desc}}</a-col>
        </a-row>

        <template v-if="command.params && command.params.length > 0">
            <div>参数：</div>
            <ul style="margin-bottom: 0 ;margin-left: 40px;">
                <li v-for="(param, index) in command.params" :key="index">
                {{ param.key }}
                {{ param.required ? "必填" : "可选" }}
                {{ param.defaultValue ? `默认：${param.defaultValue}` : "" }}
                {{ param.desc }}
                </li>
            </ul>
        </template>

        <template v-if="command.options?.length > 0">
            <div>选项：</div>
            <ul style="margin-bottom: 0 ;margin-left: 40px;">
                <li v-for="(option, index) in command.options" :key="index">
                    {{option.key}}
                    {{ option.required ? "必填" : "可选" }}
                    {{ option.defaultValue ? `默认：${option.defaultValue}` : "" }}
                    {{ option.desc }}
                </li>
            </ul>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { CommandType } from '../../../command'; 
interface Props {
    command : CommandType
}
let {command} = defineProps<Props>()
</script>
<style lang="">
    
</style>