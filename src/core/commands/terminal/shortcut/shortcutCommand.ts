import { CommandType } from "../../../command";
import OutputType = Terminal.OutputType
import { defineAsyncComponent , shallowRef } from "vue";


export const shortcutCommand :CommandType= {
    func : "shortcut",
    name : "快捷键",
    desc : "查看所有快捷键",
    alias : ["stct","sh"],
    options :[],
    params:[],
    subCommand : {
        
    },
    action : (options , terminal)=>{
        terminal.setCommandCollapsible(true)

        let output :OutputType[] = [
            {
                type:"component",
                component : shallowRef(defineAsyncComponent(()=>import("./shortcut.vue"))),
            },
        ]
        terminal.writeResult(output)
    }
}