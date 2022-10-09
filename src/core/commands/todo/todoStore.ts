import { defineStore } from "pinia";
import todoItem = TodoType.todoItem

export const useTodoStore = defineStore("useTodoStore",{
    state : ()=>({
        todoList:[
            {
                todoName:"打卡",
                createTime :new Date(),
                finished : false
            }
        ] as todoItem[]
    }),

    getters: {},
    // 持久化
    persist: {
      key: "todo-store",
      storage: window.localStorage,
      beforeRestore: (context) => {
        console.log("load todoStore data start");
      },
      afterRestore: (context) => {
        console.log("load todoStore data end");
      },
    },

    actions:{
        /**
         * 创建任务
         * @param task
         */
        addTask(task: todoItem) {
            if (!task || !task.todoName) {
            return false;
            }
            task.finished = false;
            task.createTime = new Date();
            this.todoList.push(task);
            return true;
        },

        /**
         * 删除任务
         * @param index
         */
        deleteTask(index: number) {
            if (index < 0 || index >= this.todoList.length) {
            return false;
            }
            this.todoList.splice(index, 1);
            return true;
        },
    }


})