import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

// eslint-disable-next-line
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// eslint-disable-next-line
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => { 

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)


    // Get initial users (testing purposes) 
    // eslint-disable-next-line
    const fectUsers = async () =>{
        const response = await fetch(`${GITHUB_URL}/users`,{
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    return (
        <GithubContext.Provider value={{
            users: state.users,
            loading: state.loading,
            user: state.user,
            repos: state.repos,
            dispatch,
        }}>
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext;