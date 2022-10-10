import { CommandType } from "../../../command";
import websiteItem = websiteType.websiteItem

import { useWebsiteStore } from "../websiteStore";
export const addCommand :CommandType = {
    func : "add",
    name : "添加",
    desc :"添加网址",
    options : [
        {
            key : "webname",
            alias : ["n"],
            type :"string",
            required:true
        },
        {
            key : "weburl",
            alias : ["w"],
            type :"string",
            required:true
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
        let {weburl ,imgurl , webname} = options
        if(!weburl ){
            terminal.writeTextErrorResult("缺少网址参数")
            return
        }
        if(!webname){
            terminal.writeTextErrorResult("缺少网址名称")
            return
        }
        if(!imgurl.trim()){
            imgurl = 'https://joeschmoe.io/api/v1/random'
        }

        let  {addWebsiteItem} = useWebsiteStore()
        let newItem :websiteItem = {
            webName : webname,
            webUrl : weburl,
            imgUrl : imgurl
        }

        addWebsiteItem(newItem)
        terminal.writeTextSuccessResult("添加成功")

    }
}