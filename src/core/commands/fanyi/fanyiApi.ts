import myAxios from "../../../utils/myAxios";

export const fanyiApi = async (keyword:String , config:Record<string, string>)=>{
    if(!keyword.trim()){
        return null
    }

    return await myAxios({
        url:"/fanyi",
        method:"post",
        data:{
            keywords:keyword,
            config
        }
    })
    
}