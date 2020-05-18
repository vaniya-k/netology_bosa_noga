import {useState, useEffect} from 'react';

export default function useJsonFetch(url, offset = ``) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(setLoading(true))
      .then(response => {
        if(response.ok){
          return response.json()
        }
        throw new Error(response.status);
      })
      .then(apiReturn => {setData(apiReturn); setLoading(false)})
      .catch(error => {setError(error.message); setLoading(false)})
  }, [url]);

  useEffect(() => {
    if(offset !== ``) {
      fetch(url + offset)
      .then(setLoading(true))
      .then(response => {
        if(response.ok){
          return response.json()
        }
        throw new Error(response.status);
      })
      .then(apiReturn => {setData(data.concat(apiReturn)); setLoading(false)})
      .catch(error => {setError(error.message); setLoading(false)})
    }
  }, [offset])

  return [loading, data, error];
};