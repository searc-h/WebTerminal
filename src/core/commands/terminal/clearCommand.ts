import { CommandType  } from "../../command";
import OutputType  = Terminal.OutputType

export const clearCommand :CommandType= {
    func : "clear",
    name : "清除",
    desc : "清除终端显示结果",
    options :[],
    params:[],
    alias : ["cl"],
    action : (options , terminal)=>{
        terminal.clear()
    }
}