import axios from 'axios';


const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// eslint-disable-next-line
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Basic '+ window.btoa('username:password')
        //'Authorization': `token ${GITHUB_TOKEN}`
    }
});


 // Get Search result
 export const searchUsers = async (text) =>{


    //==== Normal way of API calling ==== //

    // const params = new URLSearchParams({
    //     q: text,
    // })

    // const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
    //     method: 'GET',
    //     headers: {
    //         'Content-type': 'application/json',
    //         'Authorization': 'Basic '+ window.btoa('username:password')
    //         //'Authorization': `token ${GITHUB_TOKEN}`
    //     }
    // })
    

    // const {items} = await response.json();

    //return items;

    //==== AXIOS way of API calling ==== //
    const params = new URLSearchParams({
            q: text,
    })

    const response = await github.get(`/search/users?${params}`)


    return response.data.items;
}


/*
*
* Below two API will be called at a time through AXIOS
*
* Do follow the below AXIOS code - 
*
*
*/

 // Get a Single user result
//  export const getUser = async (login) =>{

//     const response = await fetch(`${GITHUB_URL}/users/${login}`,{
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json',
//             'Authorization': 'Basic '+ window.btoa('username:password')
//             //'Authorization': `token ${GITHUB_TOKEN}`
//         }
//     })

//     if(response.status === 400) {
//         window.location = '/notfound' // react-router redirect to not found page
//     } else {
//         const data = await response.json();
//         return data;
//     }
// }

 // Get user repos result
//  export const getUserRepos = async (login) =>{

//     const response = await fetch(`${GITHUB_URL}/users/${login}/repos`,{
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json',
//             'Authorization': 'Basic '+ window.btoa('username:password')
//             //'Authorization': `token ${GITHUB_TOKEN}`
//         }
//     })

//     if(response.status === 400) {
//         window.location = '/notfound' // react-router redirect to not found page
//     } else {
//         const data = await response.json();
//         return data;
//     }
// }


// Get user and repos
export const getUserAndRepos = async (login) => {

    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return { user: user.data, repos: repos.data };

}