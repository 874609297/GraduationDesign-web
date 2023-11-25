import request from "../network/request";

export function addPhoto(data){
    return request({
        url:'/photo/addPhoto',
        method:'post',
        data    
    })
}