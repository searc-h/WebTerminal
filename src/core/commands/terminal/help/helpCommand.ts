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
        // 直接展示helpBox
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

        // 展示commandHelp
        let command = commandMap[_[0]]

        if (!command) {
            terminal.writeTextErrorResult("找不到指定命令");
            return;
        }

        // 有可能有子命令
        if(Object.keys(command.subCommand).length>=1 && Object.keys(command.subCommand).includes(_[1])){
            command = command.subCommand[_[1]]
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