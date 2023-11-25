import request from "../network/request";

export function getUser(){
    return request({
        url:'/my/alluserinfo',
        method:'GET'
    })
}


export function getUserInfo(id){
    return request({
        url:'/my/oneuserinfo/',
        method:'get',
    })
}