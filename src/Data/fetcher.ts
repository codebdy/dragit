const fetcher = (url:string) => fetch(url).then(r => r.json())
const serverUrl = "http://127.0.0.1:8000/api";
export {fetcher, serverUrl};