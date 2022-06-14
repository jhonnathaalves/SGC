import { useEffect, useState } from "react";
//import { Alert } from '@mui/material';

export const useFetch = (url, headers) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [itemId, setItemId] = useState(null);

  function refreshPage() {
    window.location.reload();
  }

  const httpConfig = (method, data) => {
    const token = localStorage.getItem("token").replace(/"/g, '');     
    const header = {"Authorization": `${token}` }
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: header,
        body: JSON.stringify(data),
      });

      setMethod("POST");

    } else if (method === "DELETE") {
      const token = localStorage.getItem("token").replace(/"/g, '');     
      const header = {"Authorization": `${token}` }
      setConfig({
        method: "DELETE",
        headers: header,
      });

      setMethod("DELETE");
      setItemId(data);

    } else if (method === "PUT") {
      const token = localStorage.getItem("token").replace(/"/g, '');     
      const header = {"Authorization": `${token}` }
      setConfig({
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
      });

      setMethod("PUT");
    
      
    }
    if (token) {
      config.headers.Authorization = `${token}`;
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, headers);

        const json = await res.json();

        setData(json);

        setMethod(null);

        setError(null);
      } catch (error) {
        console.log(error.message);
        setError("Houve um erro ao carregar os dados!");
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        setLoading(true);
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        refreshPage();

      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`;
        const res = await fetch(deleteUrl, config);
        refreshPage();
      } else if (method === "PUT") {
        setLoading(true);
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
      }
    };

    httpRequest();
  }, [config]);

  return { data, httpConfig, loading, error };
};