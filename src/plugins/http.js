import axios from 'axios'
var MyHttpServer={}
MyHttpServer.install=function(Vue){
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
    Vue.prototype.$http=axios
}
export default MyHttpServer
