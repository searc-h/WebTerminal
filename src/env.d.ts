/// <reference types="vite/client" />

// 为Vue文件生命类型模块，记住就行，这样在import vue组件时vscode不报错
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}