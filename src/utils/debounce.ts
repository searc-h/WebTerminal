/**
 * 
 * @param func 
 * @returns 
 */
export const useDebounce = function debounce(func:any){
    let timer :any = null 
    //闭包---保留这里的作用域，timer就可以做到每次执行时都能访问到
    return (text:string)=>{
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(text)
        }, 500);
    }
}