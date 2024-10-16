import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function sendRequest(endpoint: string, method: string, data: any){
    return await axios({
        baseURL: "http://localhost:8080/api/v1",
        url: endpoint,
        method,
        data
    })
}