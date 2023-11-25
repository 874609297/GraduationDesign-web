import request from "../network/request";

export function login(data){
    return request({
        url:'/api/login',
        method:'POST',
        data
    })
}


export function reguser(data){
    return request({
        url:'',
        method:'POST',
        data
    })
}