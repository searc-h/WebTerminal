import testCommand from "./commands/test/testCommand";
import { CommandType } from "./command";



const commandList :CommandType[] = [
    testCommand
]

const commandMap : Record<string , CommandType> = {}
commandList.map((command)=>{
    commandMap[command.func] = command;
    // 别名也要添加进map里面
    command.alias?.forEach((name) => {
        commandMap[name] = command;
    });
})



export {
    commandList,
    commandMap
}