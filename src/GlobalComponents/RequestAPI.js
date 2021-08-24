import axios from "axios"
import { baseURL } from "./BaseURL"

// post API
export const postAxios = (requestedPath, data, headers) => {

    let response = axios.post(baseURL + requestedPath, data, headers)
        .then(response => {
            console.log(requestedPath, 'postAxios Response', response.data)
            return response.data
        })
        .catch(error => {
            console.log(requestedPath, 'postAxios ERROR', error)
            return { status: 'error', 'error': error };
        });

    return response;
}