import request from "../network/request";


// export function getUserPhoto(){
//     return request({
//         url:'/photo/getAllphoto',
//         method:'GET',
//     })
// }

export function getPhoto(){
    return request({
        url:'/photo/getAllphoto',
        method:'GET'
    })
}