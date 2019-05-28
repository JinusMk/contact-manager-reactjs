import React from 'react'
import axios from '../../config/axios'
import { Link, Redirect} from 'react-router-dom'

const divStyle = {
    width: "30%"
}

class UserLogin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            notice: '',
            redirect: false,
            show: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
handleSubmit(e){
    e.preventDefault()
    const formData = {
        email: this.state.email,
        password: this.state.password
    }
   // console.log(formData)
    axios.post('/users/login',formData)
        .then((response) => {
            console.log(response.data)
            axios.defaults.headers["x-auth"] = response.data.token
            localStorage.setItem('token', response.data.token)
             this.props.handleIsAuthenticated(true)
            this.setState(() => ({
                redirect: true
            }))
        })
        .catch(err => {
            window.alert('Invalid email / password')
            console.log(err)
             this.setState(() => ({
                 password: '',
                notice: err
             }))
        })
}
handleChange(e){
    e.persist()
    this.setState(()=>({
        [e.target.name]: e.target.value
    }))
}
handleShow = () => {
    this.setState((prevState) => ({
        show: !prevState.show
    }))
}

render(){
    if(this.state.redirect){
        return <Redirect to="/contacts"/>
    }
    return(
        
        <div className = "container"  style = {divStyle}>

        <div className = "mt-3" >
     <h2><center> Login</center> </h2>
            <form onSubmit = {this.handleSubmit}>
              
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name = "email" value = {this.state.email} onChange = {this.handleChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type={this.state.show ? "text" : "password"} name = "password" value = {this.state.password} onChange = {this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" name = "checkbox" onChange = {this.handleShow}/>
          <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <label><br/>
                    Don't have an account ? <Link to = "/users/register"> Register Now</Link>
                </label>
        </div>
        </div>
    )
}

}

export default UserLogin

// if(this.state.notice){
//     return <div><h3> Invalid email / password </h3><Redirect to="/users/login"/></div>
// }

