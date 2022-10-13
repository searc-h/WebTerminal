import { CommandType } from "../../command";
import OutputType = Terminal.OutputType
import { fanyiApi } from "./fanyiApi";

export const fanyiCommand : CommandType = {
    func : "fanyi",
    name : "翻译",
    desc : "百度翻译",
    alias:["fy"],
    params :[
        {
            key : "keyword",
            desc : "关键词",
            required : true
        }
    ],
    options : [
        {
            key :"from",
            type:"string",
            alias:["f"],
            desc:"源语言",
            defaultValue:"zn"
        },
        {
            key :"to",
            type:"string",
            alias:["t"],
            desc:"目标语言"
        }
    ],
    subCommand:{},

    action:async (options , terminal)=>{
        let {from  ,to , _} = options

        let keyword = _[0]?_[0]:""

        if(!keyword){
            terminal.writeTextErrorResult("缺少必要参数")
            return
        }

        let config = {from , to}

        const res: any = await fanyiApi(keyword, config);
        
        if (res?.code === 0) {
            terminal.writeTextSuccessResult(
              `翻译结果：${res.data.trans_result[0].dst}`
            );
        } else {
            terminal.writeTextErrorResult(res?.message ?? "翻译失败");
        }
        
    }
}
