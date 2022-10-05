// 使用命名空间
declare namespace Terminal{

    /**
     * 输出状态
     */
    type OutputStatusType = "info" | "success" | "warning" | "error" | "system"

    // outputList 用于在终端中展示
    interface OutputType{
        type : 'command' | "text" | "component",
        text? : string,
        resultList? : OutputType[],
        component? : any,
        status?:OutputStatusType,
        props?:any // 需要传的参数,
        collapsible? :boolean
    }

    /**
     * 因此输出类型一共三种：command类型 , text类型 , component类型
     */

    // 命令输出类型
    interface CommandOutputType extends OutputType{
        type: "command",
        text:string,
        resultList:OutputType[];
    }

    //文字输出类型
    interface TextOuputType extends OutputType{
        type: "text",
        text:string,
    }


    // 组件输出类型
    interface ComponentOutputType extends OutputType{
        type: "component",
        component:any,
        props? : any
    }

    /**
     * 命令输入类型
     */
    interface CommandInputType {
        text : string ,
        placeholder? : string 
    }

    // 终端类型---终端功能集合
    interface TerminalType {
        // 清屏
        clear : ()=> void,
        // 直接输出
        immediatelyWriteOuput : (output : OutputType) => void
        // 直接输出文本
        immediatelyWriteText : (text:string , status?:OutputStatusType)=>void

        // 输出命令结果--文本类型(状态未知)
        writeTextResult?: (text:string , status?:OutputStatusType)=>void

        // 输出命令结果--错误文本类型
        writeTextErrorResult : (text :string) => void
        
        // 输出命令结果--成功文本类型
        writeTextSuccessResult : (text:string )=>void

        // 输出命令结果--command或者component类型
        writeResult :(output:OutputType | ComponentOutputType)=>void

        // 输入框聚焦
        focusInput : () => void

        // 查看下一条命令 -- 历史记录
        showNextCommand:()=>void
        // 查看上一条命令 -- 历史记录
        showPrevCommand: () => void;
        // 查看历史记录
        showCommandList : ()=>void

        // 折叠 / 展开 或有可折叠块
        toggleAllCollapse: () => void;
        // 设置命令是否可折叠
        setCommandCollapsible: (collapsible: boolean) => void;

        // 提交命令
        doSubmitCommand: () => void;
    }
}