export const api = "https://sistemagestaocondominio.herokuapp.com";

export const requestConfig = (method = null, data = null, token = null) => {
    let config;

    if (method === "DELETE" || data === null) {
        config = {
            method: method,
            headers: {},
        };
    } else if (method === "POST" ){
        config = {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
    } else if (method === "PUT" ){
        config = {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
    } else {
        config = {     
            
            headers: {
                "Content-Type": "application/json",
            },
        };

    }

    if (token) {
        config.headers.Authorization = `${token}`;
    }

    return config;
};

