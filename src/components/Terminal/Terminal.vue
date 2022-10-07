<template >
    <div class="terminal-outer">
        <div class="terminalInner" ref="terminalRef">
            <a-collapse v-model:activeKey="activeKeys" :bordered="false" expand-icon-position="right">
                <template v-for="(output, index) in outputList" :key="index">
                    <!-- 可折叠 -->
                    <!-- 只有Component组件类型的输出需要折叠 -->
                    <a-collapse-panel v-if="output.collapsible" :key="index" class="terminal-row"
                        style="border-bottom: 1px solid pink">
                        <template #header>
                            <span style="user-select: none; margin-right: 20px; ">
                                [---]
                            </span>
                            <span>{{ output.text }}</span>
                        </template>

                        <!-- 折叠内容 -->
                        <div v-for="(result, idx) in output.resultList" :key="idx" class="terminal-row">
                            <ContentOutput :output="result" />
                        </div>
                    </a-collapse-panel>

                    <!-- 不可以折叠  要区分是commnad还是其他类型，因为command类型的输入在第一行，其他类型的输出在ContentOutput中 -->
                    <template v-else>
                        <!-- 是否是command命令类型 -->
                        <template v-if="output.type === 'command'">
                            <div class="terminal-row" >
                                <span style="user-select: none; margin-right: 10px">
                                    [---]
                                </span>
                                <span>{{ output.text }}</span>
                            </div>
                            <div v-for="(result, idx) in output?.resultList" :key="idx" class="terminal-row">
                                <ContentOutput :output="result" />
                            </div>
                        </template>

                        <!-- 其他类型  其实也就只有type = "text" 类型的output能够出现在这里 -->
                        <template v-else>
                            <div class="terminal-row">
                                <ContentOutput :output="output" />
                            </div>
                        </template>

                    </template>
                </template>

            </a-collapse>


            <!-- 输入栏 -->
            <div class="terminal-row">
                <a-input ref="commandInputRef" 
                v-model:value="inputingCommand.text" 
                class="command-input terminal-row"
                :placeholder="inputingCommand.placeholder" 
                :bordered="false" autofocus
                >
                    <template #addonBefore>
                        <span class="terminal-row">
                            [---]
                        </span>
                    </template>
                </a-input>
            </div>

            <!-- 输入提示-->
            <div v-if="true" class="terminal-row" style="color: #bbb;margin-left: 5px;">
                hint：{{ "提示" }}
            </div>

            <!-- 底部间距 -->
            <div style="margin-bottom: 16px" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import TerminalType = Terminal.TerminalType  //终端类型
import CommandInputType = Terminal.CommandInputType   //命令输入类型
import CommandOutputType = Terminal.CommandOutputType //命令输出类型
import OutputStatusType = Terminal.OutputStatusType    //输出状态类型
import OutputType = Terminal.OutputType        // 展示输出类型
import ComponentOutputType = Terminal.ComponentOutputType

import ContentOutput from '@/components/Content/ContentOutput.vue'

import { registerShortcuts } from '../shortcuts';
import useHistory from '../history';

import { ref, Ref, onMounted, watchEffect } from 'vue';

interface TerminalProps {
    height?: string | number;
    fullScreen?: boolean;
    //   user?: UserType;
    // eslint-disable-next-line vue/require-default-prop
    onSubmitCommand: (inputText: string) => void;
}

// 为Props设置默认值
const { onSubmitCommand } = withDefaults(defineProps<TerminalProps>(), {
    height: "400px",
    fullScreen: false,
    onSubmitCommand: () => {
        alert("不可以不传入终端提交函数给Terminal")
    }
});

let initInput: CommandInputType = {
    text: "",
    placeholder: ""
}
const inputingCommand = ref<CommandInputType>({
    ...initInput,
});
// 输出列表 -- 直接回车也要加入到outputList中，因为要展示
const outputList = ref<OutputType[]>([]);
// 命令列表 -- 直接回车不加入到commandList中，不加入到历史记录
const commandList = ref<CommandOutputType[]>([]);

let currenCommand: OutputType

let {
    currentCommandPos,
    showCommandList,
    showNextCommand,
    showPrevCommand,
    clearCommandList
     } = useHistory(commandList.value, inputingCommand)


let activeKeys = ref<number[]>([1, 2])
let toggleAllCollapse = () => {
    // 展开 -- 只有全部折叠的状态下才考虑展开
    if (activeKeys.value.length === 0) {
        activeKeys.value = outputList.value.map((_, index) => {
            return index;
        });
    } else {
        // 折叠
        activeKeys.value = [];
    }
}

let commandInputRef = ref()
let focusInput = () => {
    commandInputRef.value.focus();
}

let terminalRef = ref()
let doSubmitCommand = () => {
    let output: OutputType = {
        type: "command",
        text: inputingCommand.value.text,
        resultList: []
    }
    currenCommand = output

    outputList.value.push(output)

    onSubmitCommand(inputingCommand.value.text)

    // 空串 或者 history -c都不计入历史记录中
    if (inputingCommand.value.text.trim() && inputingCommand.value.text.toLocaleLowerCase().trim()!="history -c") {
        commandList.value.push(output as CommandOutputType)
        // 重置当前要查看的命令位置 --- 在这里修改长度
        currentCommandPos.value = commandList.value.length;
    }
    console.log("commandList", commandList.value)
    console.log("outputList", outputList.value)

    inputingCommand.value = { ...initInput };

    activeKeys.value.push(outputList.value.length - 1);
    // 自动滚到底部
    setTimeout(() => {
        terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }, 50);

}

let clear = () => {
    outputList.value = []
}
let immediatelyWriteOuput = () => {

}
let immediatelyWriteText = () => {

}
let writeTextResult = (text:string , status?:OutputStatusType) => {
    let newCommand :OutputType = {
        type:"text",
        text,
        status
    }

    currenCommand.resultList?.push(newCommand)

}
let writeTextErrorResult = (text :string ) => {
    writeTextResult(text , "error")
}
let writeTextSuccessResult = (text :string) => {
    writeTextResult(text , "success")
}
let writeResult = (output: OutputType[] | ComponentOutputType[]) => {
    output.map((item)=>{
        currenCommand.resultList?.push(item)
    })
}
const setCommandCollapsible = (collapsible: boolean) => {
    currenCommand.collapsible = collapsible;
};

const terminal: TerminalType = {
    clear,
    toggleAllCollapse,
    focusInput,
    doSubmitCommand,
    showCommandList,
    showNextCommand,
    showPrevCommand,
    immediatelyWriteOuput,
    immediatelyWriteText,
    writeTextResult,
    writeTextErrorResult,
    writeTextSuccessResult,
    writeResult,
    setCommandCollapsible,
    clearCommandList
}


onMounted(() => {
    registerShortcuts(terminal as TerminalType)
})

// 向父组件暴露方法或属性
defineExpose({
    terminal,
});
</script>
<style scoped>
.terminal-outer {
    width: 100vw;
    height: 100vh;
    background-color: rgb(8, 8, 8);
    background: url("https://tva2.sinaimg.cn/large/9bd9b167gy1g4lhiletmbj21hc0xcndu.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.terminalInner {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    padding: 20px;
    overflow: scroll;
}

.terminalInner::-webkit-scrollbar {
    display: none;
}

.terminalInner :deep(.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header) {
    color: white;
    padding: 0;
}

.terminalInner :deep(.ant-collapse) {
    background: none;
}

.terminalInner :deep(.ant-collapse-borderless > .ant-collapse-item) {
    border: none;
}

.terminalInner:deep(.ant-collapse-content > .ant-collapse-content-box) {
    padding: 0;
}

.command-input {
    caret-color: white;
}
.command-input :deep(.ant-input){
    padding-left: 20px;
}

.command-input :deep(input) {
    color: white !important;
    font-size: 16px;
    padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
    background: none;
    border: none;
    padding: 0;
}

.command-input-prompt {
    color: white;
    background: transparent;
}

.terminal-row {
    color: white;
    font-size: 16px;
    font-family: courier-new, courier, monospace;
}
</style>