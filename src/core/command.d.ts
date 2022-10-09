// 经过解析之后的option类型
import { ParsedOption } from 'getopts'
import { type } from 'os';

// 引入终端类型
import TerminalType = Terminal.TerminalType

interface CommandType {
    func : string,  //英文命令  --- 用于action执行
    name : string,  // 中文名称 --- 用于help查看
    desc : string,  // 中文描述 --- 用于help查看
    alias? : string[] // 英文别名 --- 用于action执行
    options : CommandOptionType[],
    params : CommandParamsType[],
    // subCommands : Record<string, CommandType>,
    collapsible?:boolean // 是否可伸缩隐藏
    subCommand : Record<string, CommandType>  //是否有子命令
    action:(
        options:ParsedOption,
        terminal:TerminalType,
    )=>void;
}

interface CommandParamsType {
    key :string,  // 参数名
    desc?: string, // 参数描述 --- 用于--help
    defaultValue? : string | boolean | number,  // 默认值
    required?:boolean //是否必填
}

interface CommandOptionType {
    key : string 
    alias? : string[]
    desc?: string, // 参数描述 --- 用于--help
    type : "string" | 'boolean';
    defaultValue? : string | boolean | number,  // 默认值
    required?:boolean //是否必填
}
