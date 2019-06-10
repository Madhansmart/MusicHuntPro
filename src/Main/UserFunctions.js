import axios from 'axios'

const localhost = "http://localhost:5000";

export const login = (userLogin) => {
  return axios.post(localhost+'/users/login',{
      userName : userLogin.userName,
      password : userLogin.password
  }).then(response => {
      if(response.data.userData!==undefined){
        localStorage.setItem("musicHunt", response.data.userData);
      }
      return response.data
  }).catch(err=>{
      return err
  })
}

export const register = (user) => {
  return axios.post(localhost+'/users/register', {
    firstName : user.firstName,
    lastName : user.lastName,
    userName  : user.userName,
    email : user.email,
    password : user.password
  }).then((response)=>{
     return response
  })
}
