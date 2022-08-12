import axios from "axios";

export const api = axios.create({
    baseURL: 'https://sistemagestaocondominio.herokuapp.com',
    //baseURL: 'http://localhost:8080',
});

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export const createSession = async(data) => {
    return api.post("/login", data,axiosConfig);
}

export const recuperarDados = async(url, header) => {
    return api.get(url, header);
}

export const atualizarDados = async(url,header,data) => {
    return api.put(url, data, header);
}