// 第一次会进行等待，而不是立即执行你
export const useThrottle = (func:any)=>{
    let timer:any = null

    return (text :string)=>{
        // 如果有任务，则等待
        if(timer){
            return
        }
        // 如果无任务，则计时执行
        timer = setTimeout(() => {
            func(text)
            timer = null
        }, 1000);
    }
}

// 解决第一次等待的情况，立即执行
export const useThrottleDate = (func:any)=>{
    let pre  = 0

    return ()=>{
        let now = new Date()
        if(+now - pre > 1000){
            func() //执行就记录当前执行的时间点
            pre = +now
        }
    }
}