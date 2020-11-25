
import axios from "axios";
const setAuthToken = (token:string) =>{
    if(token){
        // token存在设置header,因为后续每个请求都需要
        axios.defaults.headers.common['Authorization'] = token ;
    }else{
        // 没有token就移除
        delete axios.defaults.headers.common['Authorization'];
    }
}


export default setAuthToken ;