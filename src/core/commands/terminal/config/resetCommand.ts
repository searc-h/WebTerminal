import { CommandType } from "../../../command";
import { TerminalStore as useTerminalStore } from "./terminalConfigStore";
export const resetCommand :CommandType= {
    func : "reset",
    name : "重置",
    desc : "重置终端配置",
    options :[],
    params : [],
    action :  (options , terminal)=>{
        let TerminalStore = useTerminalStore()
        let result = TerminalStore.reset()
        result?
            terminal.writeTextSuccessResult("重置成功"):
            terminal.writeTextErrorResult("重置失败")
    }
}