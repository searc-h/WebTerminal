import { CommandType  } from "../../../command";
import { defineAsyncComponent , shallowRef } from "vue";
import { commandMap } from "../../../commandRegister";
import OutputType  = Terminal.OutputType

export const helpCommand :CommandType = {
    func : "help",
    name : "查看所有命令",
    alias:["he"],
    options : [],
    params : [
        {
            key:"commandName",
            desc:"命令名称",
        }
    ],
    desc : "查看所有命令",
    subCommand : {
        
    },
    action : (options , terminal)=>{

        terminal.setCommandCollapsible(true)

        let {_} = options

        if(_.length < 1){
            let output :OutputType[] = [
                {
                    type : "component",
                    component : shallowRef(defineAsyncComponent(()=>import('./helpBox.vue')))
                }
            ] 
            terminal.writeResult(output)
            return
        }

        let command = commandMap[_[0]]

        if (!command) {
            terminal.writeTextErrorResult("找不到指定命令");
            return;
        }

        let output :OutputType[] = [
            {
                type : "component",
                component : shallowRef(defineAsyncComponent(()=>import('./commandHelp.vue'))),
                props:{
                    command
                }
            }
        ] 
        terminal.writeResult(output)

       
    }
}