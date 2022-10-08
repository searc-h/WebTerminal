
import { ref } from "vue";
import { commandMap } from "../core/commandRegister";
import { useDebounce } from "../utils/debounce";

import { TerminalStore } from "../core/commands/terminal/config/terminalConfigStore";

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
        hint.value = text
    }

    let debouncesetHint = useDebounce(setHint)

    const debounceSetHint = (text :string)=>{
        let commands = commandMap
        let command = commands[text]
        if(!text){
            setHint("")
            return
        }
        if(command){
            debouncesetHint(command.func)
        }else{
            setHint("请继续输入")
        }

    }

    return {
        hint,
        setHint,
        debounceSetHint
    }
}
