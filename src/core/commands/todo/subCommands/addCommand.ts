import { CommandType } from "../../../command";
import OutputType = Terminal.OutputType
import { useTodoStore } from "../todoStore";
export const addCommand : CommandType = {
    func : "add",
    name : "添加",
    desc : "添加todo",
    options : [],
    params : [
        {
            key : "name",
            desc : "名称",
            required : true
        }
    ],
    subCommand : {
        
    },
    action : (options , terminal)=>{
        let {_} = options
        if(_.length < 1){
            terminal.writeTextErrorResult("请在add指令后输入事件名称")
            return
        }

        let todoName = _[0]

        let {addTask} = useTodoStore()
        addTask({
            createTime : new Date(),
            todoName : todoName,
            finished : false
        })

        terminal.writeTextSuccessResult("添加成功")

    }
}