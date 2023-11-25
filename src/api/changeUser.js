import request from "../network/request";

export function editUser(data){
    return request({
        url:'/my/changeUserInfo',
        method:'post',
        data
    })
}


export function deleteUser(data){
    return request({
        url:'/my/deleteUserInfo',
        method:'post',
        data
    })
}