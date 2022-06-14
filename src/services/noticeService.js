import { api, requestConfig } from "../Utils/Config";

// Get all notice details
const notice = async () => {
    const token = localStorage.getItem("token").replace(/"/g, '');
    const header = { "Authorization": `${token}` }

    try {
        const res = await fetch(api + "/comunicados", {
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

// Update user details
const updateNotice = async (data) => {
    const token = localStorage.getItem("token").replace(/"/g, '');
    const header = { 'Content-Type': 'application/json', "Authorization": `${token}` };
    const id = localStorage.getItem("ID").replace(/"/g, '');


    try {
        const res = await fetch(api + "/comunicados/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: header,
        })
            .then((res) => res.json())
            .catch((err) => err);

        console.log(data);
        console.log(data.titulo);
        console.log(data.mensagem);
        localStorage.setItem("Titulo", data.titulo)
        localStorage.setItem("Mensagem", data.mensagem);


        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get user details
const getNoticeDetails = async () => {
    const token = localStorage.getItem("token").replace(/"/g, '');
    const header = { "Authorization": `${token}` };
    const id = localStorage.getItem("ID").replace(/"/g, '');

    console.log("Estou passando por aqui");

    try {
        const res = await fetch(api + "/comunicados/" + id, {
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

const createNotice = async (data) => {
    const token = localStorage.getItem("token").replace(/"/g, '');
    const header = { 'Content-Type': 'application/json', "Authorization": `${token}` }

    try {
        const res = await fetch(api + "/comunicados", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: header,
        })
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get user details
const deleteNotice = async (id) => {
    const token = localStorage.getItem("token").replace(/"/g, '');
    const header = { "Authorization": `${token}` }

    try {
        const res = await fetch(api + "/comunicados/" + id, {
            method: 'DELETE',
            headers: header,
        })
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const noticeService = {
    notice,
    updateNotice,
    getNoticeDetails,
    createNotice,
    deleteNotice,
};

export default noticeService;