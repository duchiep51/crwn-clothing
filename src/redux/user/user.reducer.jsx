import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: UserActionTypes.SET_CURRENT_USER
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;