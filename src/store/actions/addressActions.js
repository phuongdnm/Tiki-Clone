import {message} from 'antd'

export const SET_LOCATION = 'SET_LOCATION'
// export const SET_USER_CURRENT_ADDR = "SET_USER_CURRENT_ADDR"
export const GET_LOCATION = 'GET_LOCATION'

export const setAddress = location=>{
    return{
        type: SET_LOCATION,
        location: location
    }
}
export const getAddress = ()=>{
    let location = {}
    try{
        location = JSON.parse(localStorage.getItem('userAddress'))
    } catch(e){
        console.log(e)
    }

    return{
        type: GET_LOCATION,
        location: location
    }
}