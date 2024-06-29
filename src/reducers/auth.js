export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload.user, isAuthenticated: true };
        case 'REGISTER':
            return { ...state, user: action.payload.user }
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false }

        default:
            break;
    }
}