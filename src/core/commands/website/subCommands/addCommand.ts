import { CommandType } from "../../../command";
import websiteItem = websiteType.websiteItem

import { useWebsiteStore } from "../websiteStore";
export const addCommand :CommandType = {
    func : "add",
    name : "添加",
    desc :"添加网址",
    options : [
        {
            key : "weburl",
            alias : ["w"],
            type :"string",
        },
        {
            key : "imgurl",
            alias : ["i"],
            type :"string",
            defaultValue :""
        }
    ],
    params : [],
    
    subCommand :{

    },

    action : (options , terminal)=>{
        let {weburl ,imgurl} = options
        if(!weburl){
            terminal.writeTextErrorResult("缺少网址参数")
            return
        }

        let  {addWebsiteItem} = useWebsiteStore()
        let newItem :websiteItem = {
            webUrl : weburl,
            imgUrl : imgurl
        }

        addWebsiteItem(newItem)
        terminal.writeTextSuccessResult("添加成功")

    }
}