import request from "../network/request";

export function deleteImgByid(data){
    return request({
        url:'/photo/deletePhoto',
        method:'post',
        data
    })
}