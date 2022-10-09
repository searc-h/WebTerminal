<template>
    <div style="margin: 8px 0; max-width: 600px">
    <a-card :body-style="{'padding':'0 12px'}">
      <a-list item-layout="horizontal" :data-source="todoList">

        <template #renderItem="{ item, index }">

          <a-list-item>
            <template #actions>
              <a-button type="text" danger @click="doDelete(index)"
                >删除
              </a-button>
            </template>

            <a-list-item-meta>

              <template #title>
                {{ item.todoName }}
              </template>

              <template #description>
                创建时间：{{
                  MyDayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")
                }}
              </template>
              
              <template #avatar>
                <a-checkbox v-model:checked="item.isFinished" />
              </template>

            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import MyDayjs from '../../../utils/myDayjs'
import {useTodoStore} from './todoStore' 
import todoItem = TodoType.todoItem
interface todoList {
    todoList : todoItem[]
}
const {todoList} = defineProps<todoList>()
let {deleteTask} = useTodoStore()
let doDelete  = (index:number)=>{
    deleteTask(index)
}
</script>
<style scoped>

</style>