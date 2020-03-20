export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'

export const updateAddress = address=>{
    return{
        type: UPDATE_ADDRESS,
        address: address
    }
}