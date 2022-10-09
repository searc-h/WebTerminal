import { CommandType  } from "../../command";
import OutputType  = Terminal.OutputType
export const historyCommand :CommandType = {
    func : "history",
    name : "历史记录",
    desc : "查看历史记录",
    alias:["his"],
    options : [
        {
            key:"clear",
            desc:"是否删除历史记录",
            alias:["c"],
            type:"boolean",
            defaultValue:false
        }
    ],
    params : [],
    subCommand : {
        
    },
    action: (options, terminal)=>{
        let {clear} = options
        if(clear){
            terminal.clearCommandList()
            terminal.writeTextSuccessResult("成功删除历史记录")
            return
        }
        
        terminal.setCommandCollapsible(true) //设置可以折叠

        // 显示历史记录
        let commandList:OutputType[] = terminal.showCommandList()

        commandList.forEach((command, index)=>{
            terminal.writeTextResult(`${index+1} ${command.text}`)
        })

    }

}
