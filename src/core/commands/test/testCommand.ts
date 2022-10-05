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
        }
    ],
    options:[
        {
            key:"from",
            alias:["f"],
            type:"string"
        },
        {
            key:"to",
            alias:["t"],
            type:"string"
        },
        {
            key:"self",
            alias:["s"],
            type:"boolean",
            defaultValue:true
        },
        
    ],
    action(options , terminal){

        const { _ , from, to , self } = options;

        console.log("_ is" , _)
        terminal.setCommandCollapsible(true)
        const output: ComponentOutputType = {
            type: "component",
            component: shallowRef(defineAsyncComponent(() => import("./Test.vue"))) ,
            props: {from , to , self},
          };
        terminal.writeResult(output);
    }
}
export default testCommand