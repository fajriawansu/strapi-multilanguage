import Apiservice from "../../utils/axiosInstance";

const URL = process.env.STRAPI_URL
const BASE_URL = URL ? URL : "http://localhost:1337"

export async function fetchAllText(){
    console.log(URL)
    const result = await fetch(BASE_URL + "/api/all-texts")

    return result.json();
}

export async function postNewData(data){
    return await Apiservice.invokePost(BASE_URL + "/api/find-title", data);
}

export async function updateAllText(data){
    return await Apiservice.invokePost(BASE_URL + "/api/updata-all-text", data);
}