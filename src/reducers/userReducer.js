const initialState = {
    emailId:'',
    password:'',


}
export default (state = initialState, action) =>{
    switch(action.type){
        case 'SET_USER':
        return {...state, emailId: action.payload.emailId, }
    default:
    return state;
    }
}