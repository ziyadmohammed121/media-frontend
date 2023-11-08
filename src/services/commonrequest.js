// import axios library packages

import axios from "axios";

// create a function for common api request
export const commonRequest = async (method, url, body) => {

    // request configuration ---------- add like object
    let reqConfig = {
        method,
// method means get,put,post,delete
        url,
        // http://localhost:4000
        data: body,
        headers: {
            "Content-type": "application/json"
        }

    }

    // create axios instance
    // axios library
    return await axios(reqConfig).then((response) => {
        return response
    }).catch((error) => {
        return error
    })

    

}