import { CommandType  } from "../../../command";
import { defineAsyncComponent , shallowRef } from "vue";
import OutputType  = Terminal.OutputType

export const helpCommand :CommandType = {
    func : "help",
    name : "查看所有命令",
    options : [],
    params : [],
    desc : "查看所有命令",
    action : (options , terminal)=>{
        terminal.setCommandCollapsible(true)
        let output :OutputType[] = [
            {
                type : "component",
                component : shallowRef(defineAsyncComponent(()=>import('./helpBox.vue')))
            }
        ] 
        terminal.writeResult(output)
    }
}