import { CommandType } from "../../command";
import bilibiliCommand from "./bilibili/bilibiliCommand";
import baiduCommand  from './baiduCommand'
import githubCommand from "./githubCommand";


const searchMap : Record<string , CommandType> = {
    bilibili: bilibiliCommand,
    baidu: baiduCommand,
    github: githubCommand
}

export const searchCommand : CommandType = {
    func : "search",
    desc : "搜索",
    name : "搜索",
    options : [
        {
            key:"from",
            alias :["f"],
            desc :"指定搜索结果",
            type :"string",
            defaultValue:"baidu"
        },
        {
            key:"self",
            alias :["s"],
            desc :"是否打开新页面",
            type :"boolean",
            defaultValue:false
        }
    ],
    params : [
        {
            key : "keyword",
            desc : "关键词",
            required : true
        }
    ],
    subCommand : {},
    action : (options , terminal)=>{
        let {_} = options
        if(_.length<1){
            terminal.writeTextErrorResult("缺少必要参数")
            return
        }

        let {from = "baidu"} = options
        
        let target = searchMap[from]

        if(!target){
            terminal.writeTextErrorResult("没有找到相关搜索源")
            return
        }
        target.action(options , terminal)
    }
}

export default [searchCommand , ...Object.values(searchMap)]