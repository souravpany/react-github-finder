
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


 // Get Search result
 export const searchUsers = async (text) =>{

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

    return items;
}