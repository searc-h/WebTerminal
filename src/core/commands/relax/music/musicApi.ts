import myAxios from "../../../../utils/myAxios";

export const musicApi = async (url:string)=>{
    if(!url){
        return
    }
    return await myAxios.get(`/music?keywords=${url}`)
}

