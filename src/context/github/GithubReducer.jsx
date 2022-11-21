const githubReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload, // payload can be named as anything
                loading: false
        }
        case 'GET_USER': // This can  be removed becoz of the case GET_USER_AND_REPOS
            return {
                ...state,
                user: action.payload, // payload can be named as anything
                loading: false
        }
        case 'GET_USER_REPOS': // This can  be removed becoz of the case GET_USER_AND_REPOS
            return {
                ...state,
                repos: action.payload, // payload can be named as anything
                loading: false
        }
        case 'GET_USER_AND_REPOS':
            return{
                ...state,
                user: action.payload.user,
                repos: action.payload.repos,
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