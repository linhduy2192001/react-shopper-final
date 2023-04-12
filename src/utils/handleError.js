import { message } from "antd"

export const handleError = (error) =>{
    console.log('error')
    if(error.response?.data?.message){
      message.error(error.response.data.message)
    }
}