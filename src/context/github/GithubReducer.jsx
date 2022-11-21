const githubReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload, // payload can be named as anything
                loading: false
        }
        case 'GET_USER':
            return {
                ...state,
                user: action.payload, // payload can be named as anything
                loading: false
        }
        case 'GET_USER_REPOS':
            return {
                ...state,
                repos: action.payload, // payload can be named as anything
                loading: false
        }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
        }
        case 'CLEAR_USERS':
            return {
                ...state,
                users: []
            }
       default: 
       return state;
    }
}

export default githubReducer;