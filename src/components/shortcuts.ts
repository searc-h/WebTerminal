import TerminalType = Terminal.TerminalType


interface ShortcutType {
    code: string; // 按键码  ctrl + o
    desc: string; // 功能描述  折叠
    keyDesc: string; // 按键描述  
    ctrlKey?: boolean; //是否需要ctrl
    metaKey?: boolean;
    shiftKey?: boolean;
    action: (e: Event, terminal: TerminalType) => void;  //执行操作
}

export const shortcutsList: ShortcutType[] = [
    {
        code: "KeyL",
        desc: "清屏",
        keyDesc: "Ctrl + L",
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault();
            terminal.clear();
        },
    },
    {
        code: "KeyO",
        desc: "折叠",
        keyDesc: "Ctrl + O",
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault();
            terminal.toggleAllCollapse()
        },
    },
    {
        code: "KeyV",
        desc: "粘贴",
        keyDesc: "Ctrl + V",
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault();
            terminal.focusInput();
        },
    },
    {
        code: "Tab",
        desc: "输入框聚焦",
        keyDesc: "Tab",
        action(e, terminal) {
            e.preventDefault();
            terminal.focusInput();
        },
    },
    {
        code: "Enter",
        desc: "执行命令",
        keyDesc: "Tab",
        action(e, terminal) {
          terminal.focusInput();
          terminal.doSubmitCommand()
        },
    },
    {
        code: "ArrowUp",
        desc: "查看上一条命令",
        keyDesc: "↑",
        action(e, terminal) {
            e.preventDefault();
            terminal.showPrevCommand();
        },
    },
    {
        code: "ArrowDown",
        desc: "查看下一条命令",
        keyDesc: "↓",
        action(e, terminal) {
            e.preventDefault();
            terminal.showNextCommand();
        },
    },
]

export const registerShortcuts = (terminal:TerminalType)=>{
    // 注意这里必须用onkeydown否则很有可能阻止不了默认事件
    // 问题：如何比配Ctrl?
    document.onkeydown = (e)=>{

        let key = e.key;
        
        // 自动聚焦输入框 -- 人性化设计
        if (key >= "a" && key <= "z" && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
            // terminal.focusInput();
            console.log(key)
            return;
        }

        let code = e.code
        shortcutsList.map((shortcut)=>{
            if (
                code === shortcut.code &&
                e.ctrlKey == !!shortcut.ctrlKey &&    // !!true = true
                e.metaKey == !!shortcut.metaKey &&    // !!false = false
                e.shiftKey == !!shortcut.shiftKey     // !!undefine = false
            ) {
                shortcut.action(e, terminal);
            }
        })
    }
}
