<template>
    <div style="margin: 8px 0; max-width: 1000px">

        <a-modal v-model:visible="visible" title="添加网址到收录" centered @ok="handleOk">
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    label="网址名称"
                    name="webName"
                    :rules="[{ required: true, message: 'Please input your 名称!' }]"
                    >
                    <a-input v-model:value="formState.webName" />
                </a-form-item>

                <a-form-item
                    label="网址地址"
                    name="webUrl"
                    :rules="[{ required: true, message: 'Please input your 网址地址!' }]"
                    >
                    <a-input v-model:value="formState.webUrl" />
                </a-form-item>

                <a-form-item
                    label="网址图标"
                    name="imgUrl"
                    >
                    <a-input v-model:value="formState.imgUrl" />
                    </a-form-item>
                    <a-form-item
                    label="网站描述"
                    name="desc"
                >
                    <a-input v-model:value="formState.desc" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 17, span: 16 }">
                    <a-button type="primary" html-type="submit">添加</a-button>
                </a-form-item>
            </a-form>

            <template #footer>
            </template>

        </a-modal>

      <a-card :body-style="{'padding':'0 20px'}" title="网址收录" class="card-outer">

        <template #extra>
            <span class="add" @click="showModal">新增网址收录</span>
        </template>
        
        <a-list  :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, xxxl: 2 }" :data-source="websiteList">

          <template #renderItem="{ item, index }">

            <a-list-item class="item-outer" >
                <a-card hoverable >
                    <a-list-item-meta
                        :description="item.desc || '暂未添加介绍'"
                    >
                        <template #title>
                            <a :href="item.webUrl" target="_blank" ><span>{{item.webName}}</span></a>
                        </template>

                        <template #avatar>
                            <a-avatar :src="item.imgUrl"  :size="45"/>
                        </template>
                        
                    </a-list-item-meta>

                    <template #actions>
                        <span style="display: block;" @click="()=>{deleteItem(index)}">删除</span>
                    </template>
                </a-card>

            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </div>
</template>
<script setup lang="ts">
import {ref } from 'vue'
import {useWebsiteStore} from './websiteStore'

import websiteItem = websiteType.websiteItem
interface websiteList {
    websiteList : websiteItem[]
}
let  {websiteList} =  defineProps<websiteList>()

// 表单输入
interface FormState {
    webName: string;
    webUrl: string;
    imgUrl?: string;
    desc ?: string
}

const formState = ref<FormState>({
    webName: '',
    webUrl: '',
    imgUrl:"",
    desc:""
});
const initFormState  = ()=>{
    formState.value.webName = ""
    formState.value.webUrl = ""
    formState.value.imgUrl = ""
    formState.value.desc = ""
}

// model展示与隐藏
const visible = ref<boolean>(false);
const showModal = () => {
    visible.value = true;
};



const onFinish = (values: FormState) => {
    addItem(values)
    handleOk()
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const handleOk = () => {
    visible.value = false;
};


let {removeWebsiteItem , addWebsiteItem} = useWebsiteStore()
const deleteItem = (index :number)=>{
    if(confirm("确定删除吗")){
        removeWebsiteItem(index)
    }
}
const addItem = (value : FormState)=>{
    let {webName , webUrl , imgUrl="" , desc} = value

    if(!imgUrl.trim()){
        imgUrl = 'https://joeschmoe.io/api/v1/random'
    }

    let item = {
        webName,
        webUrl , 
        imgUrl , 
        desc
    }
    addWebsiteItem(item)
    initFormState()
}
</script>
<style scoped>
.add{
    color: blue;
    cursor: pointer;
    transition: color 0.2s linear;
}
.add:hover{
    color: rgb(68, 163, 235);
}

</style>