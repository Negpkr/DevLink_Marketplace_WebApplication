const UserReducer = (state, action) =>
{
    const {type, payload} = action;
    const {currentUser} = state
    switch (type){
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser : payload
            }
        default:
            throw new Error ('unhandeled type ${type}')    
    }
}

export default UserReducer