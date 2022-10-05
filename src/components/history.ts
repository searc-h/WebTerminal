import { Ref, ref } from "vue";
import CommandOutputType = Terminal.CommandOutputType;
import CommandInputType = Terminal.CommandInputType;


// 查看历史记录
/**
 * @param commandList 
 * @param inputingCommand  注意这里传的是Ref类型，因为这里也是可以直接改变输入框的值的
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
        console.log("查看下一条")
        // 当前下标等于总长度时，就不能继续查找，并显示正在输入的命令
        /**
         * [
         *   0..
         *   1..
         *   2..
         *   3..  --长度为4
         *     4.正在输入
         * ]
         */

        // 当前处于正在输入
        if(currentCommandPos.value === commandList.length){
            return
        }

        // 当前处于最后一条命令记录
        else if(currentCommandPos.value === commandList.length - 1){
            currentCommandPos.value++
            inputingCommand.value.text = ""
        }
        else{
            currentCommandPos.value++
            inputingCommand.value.text = commandList[currentCommandPos.value].text
        }
    }

    const showPrevCommand = ()=>{
        console.log( currentCommandPos.value , inputingCommand.value.text)
        // 当前处于第一条命令记录 
        if(currentCommandPos.value === 0){
            inputingCommand.value.text = commandList[0] ? commandList[0].text:""  // 解决第一个元素为undefine时的初始状态bug
            return
        }else{
            currentCommandPos.value--
            inputingCommand.value.text = commandList[currentCommandPos.value].text
        }
    }


    return {
        currentCommandPos,
        showCommandList,
        showNextCommand,
        showPrevCommand
    }

}

export default useHistory