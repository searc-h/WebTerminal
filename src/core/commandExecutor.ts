import getopts, { ParsedOptions } from "getopts";

import { commandMap } from "./commandRegister";
import { CommandOptionType, CommandType } from "./command";
import TerminalType = Terminal.TerminalType;

/**
 * 
 * @param text 
 * @param terminal 
 */
export const doCommandExecute = async(text:string , terminal:TerminalType , parentCommand?:CommandType)=>{

    let commandFunc:string = text.split(" ")[0]
    let command : CommandType = getCommand(commandFunc)
    // 如果有父命令，说明是在执行子命令
    if(parentCommand){
        command = parentCommand.subCommand?.[commandFunc]
    }

    if(!command){
        terminal.writeTextErrorResult("找不到命令");
        return
    }

    const parsedOptions = doParse(text, command.options as CommandOptionType[]);
    const { _ } = parsedOptions;

    // 如果有子命令 并且 第一个参数刚好是其中一个子命令 ，说明需要执行子命令 ，而非父命令
    if(Object.keys(command.subCommand).length>0 && Object.keys(command.subCommand).includes(_[0])){
        let subText = text.slice(text.indexOf(" ")+1) //截取子命令及其参数
        await doCommandExecute(subText , terminal  , command)
        return
    }

    // 执行命令
    await doAction(command, parsedOptions, terminal);
}


const getCommand = (func:string ) :CommandType=>{
    return commandMap[func];
}

const doParse = (text:string, commandOptions:CommandOptionType[]): getopts.ParsedOptions =>{
    // 过滤掉关键词
    const args: string[] = text.split(" ").slice(1);
    
    // 转换
    const options: getopts.Options = {
        alias: {},
        default: {},
        string: [],
        boolean: [],
    };
    // fanyi hello -f en -t zh   ---->  {from:en , -f:en , to: zh , -t:zh , _:[hello]}
    // search Js -f baidu -s true  ----> {from:baidu , -f :baidu , self:true , -s :true , _:[Js]}
    /**
     * fanyiCommand{
     *      
     *    option:[
     *      {
     *         key:"from",
     *         alias: ["f"],
    *          type:"string",
    *          defaultValue:"auto",
     *      },
     *      {
     *          key:"to",
     *          alias: ["t"],
    *           type:"string",
    *           defaultValue:"auto",
     *      }
     * 
     *     ]
     */

    /**
     *   searchCommand{
     *  options: [
            {
                // 来源
                key: "from",
                alias: ["f"],
                type: "string",
                defaultValue: "baidu",
            },
            {
                key: "self",
                desc: "是否当前页面打开",
                alias: ["s"],
                type: "boolean",
                defaultValue: false,
            },
        ],
     * 
     *      }
     */

    
        console.log("正在解析参数,commandOption is: ",commandOptions)

    commandOptions.forEach((commandOption) => {
        console.log("commandOption in forEach : ",commandOption)
        const { alias, key, type, defaultValue } = commandOption;
        // 解决别名
        if (alias && options.alias) {
          options.alias[key] = alias;    
        }
        // 解决类型
        options[type]?.push(key);

        // 解决默认值  (注意这里的defaultValue如果是True那么就会出问题，因为这个条件一定会走；所以我们最好把默认值设置为false,才有意义)
        if (defaultValue && options.default) {
          options.default[key] = defaultValue;
        }
    });

    console.log("options is : ",options , "args is : ", args)
     
    const parsedOptions = getopts(args, options);
    
    console.log("解析参数后：", parsedOptions);

    return parsedOptions
}

const doAction = async (command:CommandType , parsedOptions:ParsedOptions , terminal:TerminalType)=>{
    await command.action(parsedOptions, terminal);
}

