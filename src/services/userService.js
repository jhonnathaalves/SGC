import { api, requestConfig } from "../Utils/Config";

// Get user details
const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);

    try {
        const res = await fetch(api + "/users", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// Update user details
const updateProfile = async (data, token, id) => {    
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + "/users/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get user details
const getUserDetails = async (id) => {
    const token = localStorage.getItem("token").replace(/"/g, '');   
    //console.log(token) 
    //const config = requestConfig("GET",null,token);

    //const id_user = localStorage.getItem("id").replace(/"/g, '');

    //console.log(id_user);

    const header = {"Authorization": `${token}` }

    try {
        const res = await fetch(api + "/users/"+ id,{
            method: 'GET',
            headers: header,
          })
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const userService = {
    profile,
    updateProfile,
    getUserDetails,
};

export default userService;