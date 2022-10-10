import { CommandType } from "../../command";
import OutputType = Terminal.OutputType
import { defineAsyncComponent , shallowRef } from "vue";
import { useWebsiteStore } from "./websiteStore";
import { addCommand } from "./subCommands/addCommand";

export const websiteCommand :CommandType = {
    func : "website",
    name : "网址",
    desc : "网址收录与快捷方式",
    subCommand : {
        add : addCommand
    },
    options :[],
    params : [],

    action : (options ,terminal)=>{

        let { websiteList } = useWebsiteStore()

        let output :OutputType[] = [{
            type :"component",
            component:shallowRef(defineAsyncComponent(()=>import("./websiteBox.vue"))),
            props:{
                websiteList
            }
        }]

        terminal.writeResult(output)
    }
    
}