import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const divStyle = {
    width: "30%"
}
class UserRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            notice: ''
        }
       this.handleSubmit = this.handleSubmit.bind(this)
       this.handleChange = this.handleChange.bind(this) 
    }
    
    handleSubmit(e){
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
axios.post('/users/register', formData)
        .then(()=>{
            this.setState(()=>({
                username: '', email: '', password: '', notice: 'Successfully registered, taking you to login screen !'
            }))
            setTimeout(()=>{
                this.props.history.push('/users/login')
            },3000)
        })
        .catch(err => {
            window.alert(err)
            console.log('/register error', err)})
    }
    handleChange(e) {
        e.persist()
        console.log('e.target', e.target)
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    render(){
        return(
            <div className = "container" style = {divStyle}>
              {
                  this.state.notice ? <div><h3>{this.state.notice}</h3><br/></div> : <div className = "mt-3"> <h2><center> Register</center> </h2></div>
              }  
                 
        <div className = "">
            <form onSubmit = {this.handleSubmit}>
                
        <div className="form-group">

          <label >Username</label>
          <input type="text" className="form-control" value = {this.state.username} name = "username" onChange={this.handleChange}  aria-describedby="emailHelp" placeholder="Enter username"/>
         
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="email" name = "email" value = {this.state.email} onChange = {this.handleChange} className="form-control" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name = "password" value = {this.state.password} onChange = {this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
        </div>
    
                <label><br/>
                    Already have an account ? <Link to = "/users/login"> Login Now</Link>
                </label>
            </div>
        )
    }
}

export default UserRegister