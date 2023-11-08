import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonrequest";

// Add videos

export const addVideos = async (body) => {

    return await commonRequest("POST", `${BASE_URL}/videos`, body)

}

// get videos

export const getVideos = async () => {

    return await commonRequest("GET", `${BASE_URL}/videos`, "")

}

// delete videos

export const deleteVideos = async (id) => {

    return await commonRequest("DELETE", `${BASE_URL}/videos/${id}`, {})

}

// add categories

export const addCategories = async (body) => {

    return await commonRequest("POST", `${BASE_URL}/category`, body)

}

// get all categories

export const getallCategory = async () => {

    return await commonRequest("GET", `${BASE_URL}/category`, "")


}

// delete category 

export const deleteCategory = async (id) => {

    return await commonRequest("DELETE", `${BASE_URL}/category/${id}`, {})

}

//get history

export const getHistory = async () => {

    return await commonRequest("GET", `${BASE_URL}/watchhistory`, "")


}

// add history 
export const Addhistory = async (body) => {

    return await commonRequest("POST", `${BASE_URL}/watchhistory`, body)

}


// get  single videos

export const getvideos = async (id) => {

    return await commonRequest("GET", `${BASE_URL}/videos/${id}`, "")

}
// update category

export const updateCategory=async(id,body)=>{

    commonRequest("PUT",`${BASE_URL}/category/${id}`,body)

}