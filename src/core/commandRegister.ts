import testCommand from "./commands/test/testCommand";
import { CommandType } from "./command";
import { historyCommand } from "./commands/terminal/historyCommand";
import { clearCommand } from "./commands/terminal/clearCommand";
import { shortcutCommand } from "./commands/terminal/shortcut/shortcutCommand";
import { helpCommand } from "./commands/terminal/help/helpCommand";
import { resetCommand } from "./commands/terminal/config/resetCommand";
import { backgroundCommand } from "./commands/terminal/config/backgroundCommand";
import { hintCommand } from "./commands/terminal/config/hintCommand";
import { timingCommand } from "./commands/timing/timingCommand";
import { musicCommand } from "./commands/relax/music/musicCommand";
import { todoCommand } from "./commands/todo/todoCommand";

const commandList :CommandType[] = [
    testCommand,
    historyCommand,
    clearCommand,
    shortcutCommand,
    helpCommand,
    resetCommand,
    backgroundCommand,
    hintCommand,
    timingCommand,
    musicCommand,
    todoCommand
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