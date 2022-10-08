import myAxios from "../../../../utils/myAxios";

export const musicApi = async (url:string)=>{
    if(!url){
        return
    }
    return await myAxios({
        url:"/music/get",
        method:"post",
        data:{
            keywords:url
        }
    })
}

