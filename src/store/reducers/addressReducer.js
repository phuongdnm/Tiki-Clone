import {SET_LOCATION, GET_LOCATION } from '../actions/addressActions'
import isEmpty from '../../validation/is-empty'
import Address from '../../models/Address'

const initState = {
    location: {}
}

export default (state = initState, action)=>{
    switch(action.type){
        case SET_LOCATION:
            const setAddr = action.location
            const name = setAddr.name
            const companyName = setAddr.companyName
            const city = setAddr.city
            const district = setAddr.district
            const ward = setAddr.ward
            const phoneNo = setAddr.phoneNo
            const user_address = setAddr.address

            let setOrUpdateAddr = new Address(
                name, companyName, city, district, ward, phoneNo, user_address
            )
            console.log('set or update addr: ', setOrUpdateAddr)
            let st = {
                ...state,
                location: setOrUpdateAddr
            }
            localStorage.setItem('user_address', JSON.stringify(st))
            return st
            
        case GET_LOCATION:
            if(action.address != null){
                return{
                    ...state,
                    location: action.user_address.location
                }
            }
            else {
                return{
                    ...state
                }
            }

        default: 
            return{
                ...state
            }
    }
}