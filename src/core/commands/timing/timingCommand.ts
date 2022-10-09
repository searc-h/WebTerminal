import { CommandType } from "../../command";
import { defineAsyncComponent  ,  shallowRef} from "vue";
import OutputType = Terminal.OutputType

export const timingCommand :CommandType= {
    func : "timing",
    alias : ["timi"],
    name : "倒计时",
    desc : "以s为单位进行倒计时",
    options :[
        {
            key:"seconds",
            alias:["s"],
            type :"string"
        }
    ],
    subCommand : {
        
    },
    params : [],
    action : (options , terminal)=>{
        
        console.log("options ..",options)
        let {seconds} = options
        if(!seconds){
            terminal.writeTextErrorResult("参数不足")
            return
        }
        let output :OutputType[] =[
            {
                type :"component",
                component : shallowRef(defineAsyncComponent(()=>import('./TimingBox.vue'))),
                props : {
                    seconds:seconds
                }

            }
        ]
        terminal.writeResult(output)
    }
}
