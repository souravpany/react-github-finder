import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => { 

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)


    // Get inital users (testing purposes) 
    const fectUsers = async () =>{
        setLoading();

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

    // Get Search result
    const searchUsers = async (text) =>{
        setLoading();

        const params = new URLSearchParams({
            q: text,
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Basic '+ window.btoa('username:password')
                //'Authorization': `token ${GITHUB_TOKEN}`
            }
        })

        const {items} = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    // Get a Single user result
    const getUser = async (login) =>{
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Basic '+ window.btoa('username:password')
                //'Authorization': `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status === 400) {
            window.location = '/notfound' // react-router redirect to not found page
        } else {
            const data = await response.json();
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }

    // Get user repos result
    const getUserRepos = async (login) =>{
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Basic '+ window.btoa('username:password')
                //'Authorization': `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status === 400) {
            window.location = '/notfound' // react-router redirect to not found page
        } else {
            const data = await response.json();
            dispatch({
                type: 'GET_USER_REPOS',
                payload: data
            })
        }
    }

    //Clear users from state
    const clearUserFromState = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }

    // set loading 
    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }


    return (
        <GithubContext.Provider value={{
            users: state.users,
            loading: state.loading,
            user: state.user,
            repos: state.repos,
            getUser,
            searchUsers,
            clearUserFromState,
            getUserRepos
        }}>
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext;