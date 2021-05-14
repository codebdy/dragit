const serverUrl = "http://127.0.0.1:8000/api";
const fetcher = (url:string) => fetch(
    serverUrl + url, 
    {
      method: 'GET',
      headers:{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  ).then(r => r.json())

export {fetcher, serverUrl};