import testCommand from "./commands/test/testCommand";
import { CommandType } from "./command";
import { historyCommand } from "./commands/terminal/historyCommand";
import { clearCommand } from "./commands/terminal/clearCommand";
import { shortcutCommand } from "./commands/terminal/shortcut/shortcutCommand";

const commandList :CommandType[] = [
    testCommand,
    historyCommand,
    clearCommand,
    shortcutCommand
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