import {CommandType} from '../../command'
import OutputType =  Terminal.OutputType
import { useTodoStore } from './todoStore'
import { defineAsyncComponent , shallowRef , ref } from 'vue'
import { addCommand } from './subCommands/addCommand'

export const todoCommand : CommandType = {
    func : "todo",
    alias : ["td"],
    name : "记事本",
    desc : "记事本",
    options :[],
    params :[],
    subCommand : {
        add : addCommand
    },
    action :(options , terminal)=>{
        terminal.setCommandCollapsible(true)
        let {todoList} = useTodoStore()

        let output : OutputType[] = [{
            type :"component",
            component:shallowRef(defineAsyncComponent(()=>import('./todoBox.vue'))),
            props:{
                todoList
            }
        }]


        terminal.writeResult(output)
    }
}

