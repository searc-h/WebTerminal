import { defineStore } from "pinia";

export const TerminalStore = defineStore("TerminalStore" , {
    state : ()=>{
        return {
            // 背景图片
            background : "black",
            // 输入提示
            showHint :true
        }
    },
    getters:{},

    persist :{
        key : "terminal-config",
        storage :window.localStorage,
        beforeRestore: (context) => {
            console.log("load terminalConfigStore data start");
          },
          afterRestore: (context) => {
            console.log("load terminalConfigStore data end");
          },
    },

    actions:{
        setBackground(url: string) {
            if (!url) {
                return;
            }
            this.background = url;
        },

        setOrToggleShowHint(hint?: string): boolean {
            // 什么也不传，就反转
            if (!hint) {
              this.showHint = !this.showHint;
              return this.showHint;
            }
            
            // 设置提示
            this.showHint= hint==="on"?true:false

            return this.showHint;
        },

        reset() {
            this.$reset();
        },
    }

})