import { useEffect, useState } from "react";
import intl from "react-intl-universal";


//获取浏览器语言环境，截取lang的前2位字符，是因为浏览器语言返回值可能是：
//zh-cn Chinese(PRC) 
//zh-tw Chinese(Taiwan Region)
//zh-hk Chinese(Hong Kong SAR, PRC) 
//zh-sg Chinese(Singapore) 
//en-us English(United States) 
//en English
function getDefaultLang(){
  let lang = navigator.language || 'zh-CN'
  //lang = lang.substr(0, 2)
  //目前只实现两个语言版本
  if(lang !== 'zh-CN'){
    lang = 'en-US'
  }
  return lang
}

export function useIntl():[boolean, boolean]{
  const lang = getDefaultLang()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [intlData, setIntlData] = useState();
  useEffect(()=>{
    setLoading(true);
    fetch(`/locales/${lang}.json`, {
      method:'GET',
      headers: {
        'Content-Type':'application/json'
      }})
    .then(response=>response.json())
    .then(data=>{
      setIntlData(data)      
      setLoading(false);
    })
    .catch(e=>{
      setLoading(false);
      setError(true);
      console.log("error", e)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    if(intlData){
      intl.init({
        currentLocale:lang,
        locales: {
          [lang]: intlData
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[intlData])

  return [loading || !intlData, error];
}