import { CommandType } from "../../command";
import { defineAsyncComponent ,shallowRef} from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

const testCommand :CommandType= {
    func : "test", 
    name : "测试",  
    desc : "测试",  
    collapsible:true, // 是否可伸缩隐藏
    params:[
        {
            key:"who",
            desc :"人物",
            required : true
        }
    ],
    subCommand : {
        
    },
    options:[
        {
            key:"from",
            desc:"从哪个开始",
            alias:["f"],
            type:"string"
        },
        {
            key:"to",
            desc:"去哪里",
            alias:["t"],
            type:"string"
        },
        {
            key:"self",
            alias:["s"],
            desc:"是否自身打开",
            type:"boolean",
            defaultValue: false
        },
        
    ],
    action(options , terminal){

        const { _ , from, to , self } = options;

        terminal.setCommandCollapsible(true)
        const output: ComponentOutputType[] =[
            {
                type: "component",
                component: shallowRef(defineAsyncComponent(() => import("./Test.vue"))) ,
                props: {from , to , self},
            }
        ]
        terminal.writeResult(output);
    }
}
export default testCommand