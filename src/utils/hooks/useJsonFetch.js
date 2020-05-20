import {useState, useEffect} from 'react';

export default function useJsonFetch(url, offset = ``) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [showingLoadMore, setShowingLoadMore] = useState(true);

  const checkLoadMore = (apiReturn) => {
    if(apiReturn.length <= 5){
      setShowingLoadMore(false)
    }
  }

  const resetData = () => {
    setData([]);
  }

  useEffect(() => {
    fetch(url + offset)
      .then(setLoading(true))
      .then(setShowingLoadMore(true))
      .then(response => {
        if(response.ok){
          return response.json()
        }
        throw new Error(response.status);
      })
      .then(apiReturn => {setData(data.concat(apiReturn)); checkLoadMore(apiReturn); setLoading(false)})
      .catch(error => {setError(error.message); setLoading(false)})
  }, [url, offset]);

  return [loading, data, showingLoadMore, resetData, error];
};