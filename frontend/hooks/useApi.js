import { useState, useCallback } from "react";
import { AppDetails } from "../config/AppConfig";

const useApi = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = useCallback(
    async (endpoint, method = "GET", body = null, token = null) => {
      const url = AppDetails.ApiURL + endpoint;
      setError(null);
      setData(null);

      try {
        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const config = {
          method,
          headers,
          ...(body && { body: JSON.stringify(body) }),
        };

        const response = await fetch(url, config);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || `HTTP error: ${response.status}`);
        }

        setData(json);
        return json;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  return { error, data, request };
};

export default useApi;
