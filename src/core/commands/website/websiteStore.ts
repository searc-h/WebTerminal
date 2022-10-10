import { defineStore } from 'pinia'
import websiteItem = websiteType.websiteItem
export const useWebsiteStore = defineStore("useWebsiteStore" , {
    state : ()=>({
        websiteList :[
            {
                webUrl : "https://www.modb.pro/db/252099",
            } 
        ] as websiteItem[]
    }),

    getters : {},

    persist:{
        key : "website-list",
        storage : window.localStorage,
    },


    actions : {
        addWebsiteItem(addWebsiteItem:websiteItem){
            this.websiteList.push(addWebsiteItem)
        },

        removeWebsiteItem(index :number){
            this.websiteList.splice(index , 1)
        }
    }
})