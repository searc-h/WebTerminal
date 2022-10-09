import { CommandType } from "../../../command"
import OutputType = Terminal.OutputType
import { defineAsyncComponent ,shallowRef } from "vue"


export const musicCommand:CommandType = {
    func : "music",
    alias : ["mus"],
    name : "音乐",
    desc : "播放音乐",
    options :[],
    params : [
        {
            key:"musicName",
            desc :"音乐名称",
        }
    ],
    subCommand : {
        
    },
    collapsible: true,
    action : async (options , terminal)=>{
        let {_} = options

        if(_.length<1){
            terminal.writeTextErrorResult("参数不足")
            return
        }

        let output : OutputType[] = [
            {
                type:"component",
                component:shallowRef(defineAsyncComponent(()=>import('./musicBox.vue'))),
                props:{
                    musicName:_[0]
                }
            }
        ]
        terminal.writeResult(output)
    }
}