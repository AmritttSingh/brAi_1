import axios from "axios"
const axiosClient=axios.create({
    baseURL:'http://192.168.100.127:1337/api',
    headers:{
        'Authorization':'Bearer '+process.env.EXPO_PUBLIC_STRAPI_API_KEY
    }
})

const GetuserInfo=()=>axiosClient.get('user-lists?filters[userEmail][$eq]='+email)

const CreateNewUser=(data)=>axiosClient.post('/user-lists',{data:data})

export default{
    GetuserInfo,
    CreateNewUser
}