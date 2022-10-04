import { Ref, ref } from "vue";
import CommandOutputType = Terminal.CommandOutputType;
import CommandInputType = Terminal.CommandInputType;


// 查看历史记录
/**
 * @param commandList 
 * @param inputingCommand 
 */
const useHistory = (
    commandList: CommandOutputType[],
    inputingCommand : Ref<CommandInputType>
)=>{

    const currentCommandPos = ref(commandList.length)

    const showCommandList = ()=>{
        return commandList;
    }

    const showNextCommand = ()=>{
        // 当前下标等于总长度时，就不能继续查找，并显示正在输入的命令
        /**
         * [
         *   0..
         *   1..
         *   2..
         *   3..  --长度为4
         *   正在输入
         * ]
         */
        currentCommandPos.value++
        
        if(currentCommandPos.value === commandList.length){

        }
    }

    const showPrevCommand = ()=>{

    }


    return {
        currentCommandPos,
        showCommandList,
        showNextCommand,
        showPrevCommand
    }

}

export default useHistory