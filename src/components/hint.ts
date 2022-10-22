
import { ref } from "vue";
import { commandMap } from "../core/commandRegister";
import { useDebounce } from "../utils/debounce";

import { TerminalStore } from "../core/commands/terminal/config/terminalConfigStore";
import { CommandType } from "../core/command";

export const useHint = ()=>{
    let hint = ref<string>("")
    let {showHint} = TerminalStore()

    const setHint = (text:string):void=>{
        if(!showHint){
            return
        }
        if(!text){
            hint.value = ""
            return
        }
        let textArr = text.split(" ")
        let [parentText , childrenText] = textArr
        let commands = commandMap
        let command = commands[parentText]
        
        if(!command){
            hint.value = "没有找到相关命令"
            return
        }

        // 有可能执行子命令
        if(Object.keys(command.subCommand).length>0){
            let childrenStrArr = Object.keys(command.subCommand)
            if(textArr.length <= 1)
                hint.value = `${command.func} [可选子命令: ${childrenStrArr.join(", ")}]`
            else{
                command = command.subCommand[childrenText]
                if(!command) return
                hint.value = parentText + " " +collateOptionAndParams(command)
            }
        }

        // 没有子命令
        else{
            hint.value = collateOptionAndParams(command)
        }

    }

    let debouncesetHint = useDebounce(setHint)

    const debounceSetHint = (text :string)=>{
        if(!text){
            setHint("")
            return
        }
        debouncesetHint(text)
    }

    return {
        hint,
        setHint,
        debounceSetHint
    }
}


const collateOptionAndParams = (command :CommandType) : string=>{
    let str = ""
    let func = command.func
    str += func+" "

    let options = command.options || []
    let params = command.params || []

    let optionStr = options.map((item)=>{
        if(item.required){
            return `<-${item.alias[0]} ${item.desc}>`
        }else{
            return `[-${item.alias[0]} ${item.desc}]`
        }
    })

    let paramsStr = params.map((item)=>{
        if(item.required){
            return `<${item.key} ${item.desc}>`
        }else{
            return `[${item.key} ${item.desc}]`
        }
    })

    str += paramsStr.join(" ") +" "+ optionStr.join(" ")

    return str

    
}