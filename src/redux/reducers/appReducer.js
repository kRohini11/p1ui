import { init } from "../utils/init"

export const appReducer = (state = init, action) => {
    switch (action.type) {
        case 'TOASTER':
            return {
                ...state,
                toaster: {
                    ...state.toaster,
                    ...action.payload
                }
            }
        case 'LOADER':
            return {
                ...state,
                isShowLoader: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                user: action?.payload?.user,
                isLoggedIn: action.payload?.isLoggedIn

            }
        case 'LOGOUT':
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }
    }
    return state;

}