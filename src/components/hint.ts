
import { ref } from "vue";
import { commandMap } from "../core/commandRegister";
import { useDebounce } from "../utils/debounce";

export const useHint = ()=>{
    let hint = ref<string>("")

    const setHint = (text:string):void=>{
        hint.value = text
    }

    let debouncesetHint = useDebounce(setHint)

    const debounceSetHint = (text :string)=>{
        let commands = commandMap
        let command = commands[text]
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
