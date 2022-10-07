import { CommandType } from "../../../command";
import { TerminalStore as useTerminalStore } from "./terminalConfigStore";

export const hintCommand : CommandType = {
    func : "hint",
    name : "提示",
    desc : "开启/关闭提示 on:开启  off:关闭  默认反转",
    params : [
        {
            key:"choice",
            desc:"选择开启on或者关闭off",
            defaultValue :"on"
        }
    ],

    options :[],

    action: (options , terminal)=>{
        let TerminalStore =  useTerminalStore()
        let {_} = options
        if(_.length > 0){
            if(_[0]==='on'){
                TerminalStore.setOrToggleShowHint("on")
                terminal.writeTextSuccessResult("已经开启提示，刷新页面后查看效果")
            }else{
                TerminalStore.setOrToggleShowHint("off")
                terminal.writeTextSuccessResult("已经关闭提示，刷新页面后查看效果")
            }
        }else{
            if(TerminalStore.setOrToggleShowHint()){
                terminal.writeTextSuccessResult("已经开启提示，刷新页面后查看效果")
            }
            else{
                terminal.writeTextSuccessResult("已经关闭提示，刷新页面后查看效果")
            }
        }
    }
}