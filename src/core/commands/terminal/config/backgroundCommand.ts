import { CommandType } from "../../../command"
import { TerminalStore as useTerminalStore } from "./terminalConfigStore"
import myAxios from "../../../../utils/myAxios"

export const backgroundCommand :CommandType = {
    func : "background",
    name : "背景",
    desc : "切换背景图片",
    alias : ["bg","back"],
    options : [],
    params :[
        {
            key:"url",
            desc: "图片地址（不填则随机）",
            required: false,
        }
    ],
    action : async (options , terminal)=>{

        let TerminalStore = useTerminalStore()

        let {_} = options
        // if(_.length > 0){
        //     TerminalStore.setBackground(_[0])
        // }
        // if(_.length<1){
            
        //     let result = await myAxios({

        //     })
            
        //     TerminalStore.setBackground(result.data.imgurl)
        // }
    }
}