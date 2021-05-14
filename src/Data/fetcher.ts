const serverUrl = "http://127.0.0.1:8000/api";
const fetcher = async (url:string) => {
  const res = await fetch(
      serverUrl + url,
      {
        method: 'GET',
        headers:{
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }
    )

  // 如果状态码不在 200-299 的范围内，
  // 我们仍然尝试解析并抛出它。
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as any;
    // 将额外的信息附加到错误对象上。
    error.message = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export {fetcher, serverUrl};