<template>
    <div class="timing" 
    
        :style="{
        overflow: 'hidden',
        border: '1px solid #ebedf0',
        borderRadius: '2px',
        padding: '20px',
        }">
            
        <div class="timeCurrent" @click="showDrawer">
            {{currenTime}}
        </div>

        <a-drawer
            placement="right"
            :closable="false"
            :visible="visible"
            :get-container="false"
            :style="{ 
                position: 'absolute',
            }"
            @close="onClose"
            width="220px"
        >
            <div class="functions">
                <input @change="changeImg" type="file" :style="{width:'100px' }">
                <a-button type="primary" @click="onClose">
                    <template #icon>
                        <CloseOutlined />
                    </template>
                </a-button>
            </div>
        </a-drawer>
        </div>
</template>
<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue';
import Dayjs from '../../utils/myDayjs'
import {onMounted , onUnmounted , ref} from 'vue'
import {TerminalStore as useTerminalStore} from '../../core/commands/terminal/config/terminalConfigStore'

const visible = ref(false);

const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

let terminalStore = useTerminalStore()

let changeImg = (event:any)=>{
    let fileObj = event.srcElement.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(fileObj)

    fr.onloadend = function(){
        if((fr.result as string).length / 1024 / 1024 > 3){
            alert("选择的图片不能大于3M")
            return
        }
        // console.log(fr.result)
        // // 把base64数据存放到localStorage中
        // localStorage.setItem("imgBase",fr.result as string)

        terminalStore.setBackground(fr.result as string)

        onClose()
    }
}


let currenTime = ref<any>("") 

let timer:any = null

let changeTime = ()=>{
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
    .timing{
        width: 290px;
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