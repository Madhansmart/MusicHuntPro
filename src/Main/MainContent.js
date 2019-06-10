import React , { Component } from 'react';
import './MainContent.css'
import 'react-toastify/dist/ReactToastify.css';

import { login } from './UserFunctions'
import {register} from './UserFunctions';
import { toast } from 'react-toastify';

import Section from '../Components/Section/Section'



class MainContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      isUserActive : false,
      isLogin : true,
      firstName : "",
      lastName : "",
      userName : "",
      password : "",
      email : ""
    }
  }

  toggleActive = (val)=> {
    if(val === "login"){
      this.setState({isLogin : true});
    }
    else{
      this.setState({isLogin : false});
    }
  }


  userRegister = (e)=> {
      e.preventDefault();
      const user = {
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        userName : this.state.userName,
        email : this.state.email,
        password : this.state.password
      }

      register(user).then((res)=> {
        this.setState({isUserActive : true});
        if(res.data.error!==undefined){
          toast.error("Username Already Exists", {
              position: toast.POSITION.TOP_RIGHT
          });
        }
        if(res.data.status!==undefined){
            toast.success("Registered Successfully Login To Continue", {
                position: toast.POSITION.TOP_RIGHT
            });
            this.setState({isLogin : true});
        }
      })
  }

  updateValue = (e)=> {
    this.setState({[e.target.name] : e.target.value});
  }

  userLogin = (e)=>{
    e.preventDefault();

    const userDet = {
      userName : this.state.userName,
      password : this.state.password
    }

    login(userDet).then(res => {
      if(res.userData===undefined){
        this.notifyError();
      }
      else{
          this.setState({isUserActive : true});
      }
    })
  }

  notifyError = ()=> {
    toast.error("Invalid Login", {
        position: toast.POSITION.TOP_RIGHT
    });
  }
  render(){
    if(this.state.isUserActive){
        return(
            <Section />
        )
    }
    else{
        return(
          <div>
            <div className="app-main container-fluid">
              <div className="log-reg-main mx-auto">
                    <div className="row">
                         <div className="col-md-12">
                           <div className="row text-center log-reg-btn">
                               <div className="col" onClick={()=>{this.toggleActive('login')}}>
                                 Login
                               </div>
                               <div className="col" onClick={()=>{this.toggleActive('register')}}>
                                 SignUp
                               </div>
                           </div>
                           <hr/>
                         </div>
                         {this.state.isLogin ?
                           <div className="login-main mx-auto">
                             <form onSubmit={this.userLogin}>
                                   <div className="form-group form-inline">
                                       <label htmlFor="uname">Username</label>
                                       <input type="text" className="form-control" id="uname" placeholder="Enter username" onChange={this.updateValue} name="userName" autoComplete="current-username" required />
                                   </div>
                                   <div className="form-group form-inline">
                                       <label htmlFor="pwd">Password</label>
                                       <input type="password" className="form-control" id="pwd" placeholder="Enter password" onChange={this.updateValue} name="password" autoComplete="current-password" required />
                                   </div>
                                   <div className="form-group form-check form-inline">
                                       <label className="form-check-label">
                                         <input className="form-check-input" type="checkbox" name="remember"/> Lazy to remember password
                                       </label>
                                   </div>
                                   <div className="form-group text-center">
                                     <button type="submit" className="btn btn-primary">Submit</button>
                                   </div>
                             </form>
                           </div>:
                           <div className="signup-main mx-auto">
                             <form onSubmit={this.userRegister}>
                                   <div className="form-group form-inline">
                                       <label htmlFor="fname">First Name</label>
                                       <input type="text" className="form-control ml-auto" id="fname" placeholder="Enter FirstName" onChange={this.updateValue} name="firstName" required/>
                                   </div>
                                   <div className="form-group form-inline">
                                       <label htmlFor="lname">LastName</label>
                                       <input type="text" className="form-control ml-auto" id="lname" placeholder="Enter LastName" onChange={this.updateValue} name="lastName" required/>
                                   </div>
                                   <div className="form-group form-inline">
                                       <label htmlFor="uname">Username</label>
                                       <input type="text" className="form-control ml-auto" id="uname" placeholder="Enter username" onChange={this.updateValue} name="userName" required/>
                                   </div>
                                   <div className="form-group form-inline">
                                       <label htmlFor="email">Email</label>
                                       <input type="email" className="form-control ml-auto" id="email" placeholder="Enter Email" onChange={this.updateValue} name="email" required/>
                                   </div>
                                   <div className="form-group form-inline">
                                       <label htmlFor="pwd">Password</label>
                                       <input type="password" className="form-control ml-auto" id="pwd" placeholder="Enter password" onChange={this.updateValue} name="password" required/>
                                   </div>
                                   <div className="form-group form-inline">
                                       <label htmlFor="rpwd">Confirm Password</label>
                                       <input type="password" className="form-control ml-auto" id="rpwd" placeholder="Re enter password" name="pswd" required/>
                                   </div>
                                   <div className="form-group form-check form-inline">
                                       <label className="form-check-label">
                                         <input className="form-check-input" type="checkbox" name="remember"/> Lazy to remember password
                                       </label>
                                   </div>
                                   <div className="form-group text-center">
                                     <button type="submit" className="btn btn-primary">Submit</button>
                                   </div>
                             </form>
                           </div>
                         }
                    </div>
                </div>
              </div>
          </div>
        )
      }
  }
}

export default MainContent;
