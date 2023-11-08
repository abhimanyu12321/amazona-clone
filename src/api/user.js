import axios from "axios"
import { baseURL } from "../baseAPI"


export const login1 = async ({ loginEmail, loginPassword }) => {
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const { data } = await axios.post(`${baseURL}/api/v1/loginuser`,
        { email: loginEmail, password: loginPassword },
        config)
    return data

}
// Initial load user on rendering App
export const loadUser1 = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/me`, { withCredentials: true })
    return data
}

// Register user
export const register1 = async (myForm) => {
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const { data } = await axios.post(`${baseURL}/api/v1/register`,
        myForm,
        config)
    return data

}


//logout user
export const logout1 = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/logout`, { withCredentials: true })
    return data
}

// update profile
export const updateProfile1 = async (myForm) => {
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const { data } = await axios.put(`${baseURL}/api/v1/me/update`,
        myForm,
        config)
    return data
}


// update password
export const updatePassword1 = async (myForm) => {
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const { data } = await axios.put(`${baseURL}/api/v1/password/update`,
        myForm,
        config)
    return data

}

//forgot password

export const forgotPassword1 = async (myForm) => {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${baseURL}/api/v1/password/forgot`,
        myForm,
        config)
    return data
}

// Reset password
export const resetPassword1 = async ({ token, myForm }) => {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`${baseURL}/api/v1/password/reset/${token}`,
        myForm,
        config)
    return data
}

//  getting all user for  Admin
export const getAllUsers1 = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/admin/users`, { withCredentials: true })
    return data.users

}

// deleting a user for ADMIN

export const deleteUser1 = async (id) => {

    const { data } = await axios.delete(`${baseURL}/api/v1/admin/user/${id}`,
        { withCredentials: true })
    return data

}

//getting user detail for Admin
export const getUserDetails1 = async (id) => {
    const { data } = await axios.get(`${baseURL}/api/v1/admin/user/${id}`, { withCredentials: true })
    return data.user
}

//  updating a user for ADMIN
export const updateUser1 = async ({ id, myForm }) => {
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const { data } = await axios.put(`${baseURL}/api/v1/admin/user/${id}`,
        myForm,
        config)
    return data.success
}
