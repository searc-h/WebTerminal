import { CommandType } from "../../../command"
import { TerminalStore as useTerminalStore } from "./terminalConfigStore"
import myAxios from "../../../../utils/myAxios"

export const backgroundCommand :CommandType = {
    func : "background",
    name : "背景",
    desc : "切换背景图片（不再支持）",
    alias : ["bg","back"],
    options : [],
    params :[
        {
            key:"url",
            desc: "图片地址（不填则随机）",
            required: false,
        }
    ],
    subCommand : {
        
    },
    action : async (options , terminal)=>{

        let TerminalStore = useTerminalStore()

        let {_} = options
        if(_.length > 0){
            TerminalStore.setBackground(_[0])
            return
        }
        if(_.length<1){
            // let result:any = await myAxios.get("/backgroundRandom")
            // if(result.error==0)
            //     TerminalStore.setBackground(result.data)
            // else
                terminal.writeTextResult("由于存在安全隐患，现已不支持随机获取图片", "info")
                terminal.writeTextResult("你可以通过点击右上角抽屉进行本地图片选择或者输入在线图片地址", "info")
                
        }
    }
}