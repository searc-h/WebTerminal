import { CommandType  } from "../../command";
import OutputType  = Terminal.OutputType

export const clearCommand :CommandType= {
    func : "clear",
    desc : "清除终端显示结果",
    options :[],
    alias : ["cl"],
    name : "clear",
    action : (options , terminal)=>{
        terminal.clear()
    }
}