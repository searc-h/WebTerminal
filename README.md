# webTerminal
- Vue3 + Ts + vite +antD-V + pinia
- 实现你想实现的指令
- 回车即可执行

## 灵感来源
- [鱼皮程序员](https://github.com/liyupi/yuindex)
- [我的实现](https://github.com/searc-h/webTerminal)

## 学习心得
### 0.env.d.ts
```bash

    /// <reference types="vite/client" />

    // 为Vue文件生命类型模块，记住就行，这样在import vue组件时vscode不报错
    declare module '*.vue' {
        import type { DefineComponent } from 'vue'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
        const component: DefineComponent<{}, {}, any>
        export default component
    }
```

### 1.Ts命名空间实现类型说明模块化 

### 2.antD-V的基本使用

### 3.防抖与节流实现

### 4.getopt库的基本使用
- option配置
- 参数配置
- 获取解析后的参数

### 5.页面组件与指令分离的设计模式
- defineAsyncComponent的使用
- 指令的设计
- 父子指令的调用关系

### 6.store持久化

### 7.StyleValue类型的使用

### 8.自定义hooks
- useHint
- useHistory
- useDebounce

### 9.Porps参数的接受与默认值

### 10.website命令的设计模式
- Vue组件完成负责数据操作
- Command命令完成数据展示

### 11.初次体验讲前端项目Chorme插件化
- 取消路由使用
- 打包项目
- dist文件下新增manifest.json文件
- 配置manifest.json






