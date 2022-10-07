import { CommandType } from "../../../command";
import { TerminalStore as useTerminalStore } from "./terminalConfigStore";

export const hintCommand : CommandType = {
    func : "hint",
    name : "提示",
    desc : "开启/关闭提示 on:开启  off:关闭  默认反转",
    alias:["hin"],
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

        if(["on" , "off"].includes(_[0])){
            TerminalStore.setOrToggleShowHint(_[0])
            terminal.writeTextSuccessResult(`已经${_[0]==='on'?"开启":"关闭"}提示，刷新页面后查看效果`)
        }else{
            let tag = TerminalStore.setOrToggleShowHint()
            terminal.writeTextSuccessResult(`已经${tag?"开启":"关闭"}提示，刷新页面后查看效果`)
        }
    }
}