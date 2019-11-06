import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Header from '../layout/Header'
import { Button, TextField, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
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
            notice: '',
            error: {},
            loader: false,
            showPassword: false
        }
       this.handleSubmit = this.handleSubmit.bind(this)
       this.handleChange = this.handleChange.bind(this) 
    }
    handleSubmit(e){
        e.preventDefault()
        const { email, username, password } = this.state
        this.setState({
            loader: true
          });
        const validateNewInput = {
            username: username.trim() ? '' : 'Please enter Username',
            email: email.trim() ? '' : 'Please enter Email Address',
            password: password.trim() ? '' : 'Please enter Password'
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            const formData = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            console.log(formData)
            axios.post('/users/register', formData)
            .then((response) => {
                this.setState(()=>({
                    username: '', email: '', password: '', notice: 'Successfully registered, taking you to login screen !', loader: false
                }))
                setTimeout(()=>{
                    this.props.history.push('/users/login')
                },3000)
            })
            .catch(err => {
                this.setState({loader: false})
                window.alert(err)
                console.log('/register error', err)
            })
        }else{
            this.setState({
                error: validateNewInput,
                loader: false
            })
        }
    }
    handleChange(key, value) {
        this.setState(prevState => ({
            ...prevState,
            [key] : value,
            error: {
                ...prevState.error,
                [key]: ''
            }
        }))
    }
    togglePasswordMask = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }))
    }
    render(){
        const { error, email, password, username } = this.state
        return(
            <React.Fragment>
                <Header />
                <div className="auth-form-wrapper">
                        <form onSubmit = {this.handleSubmit} className="auth-form">
                            <div className="form-title">
                                <h3>Register</h3>
                            </div>
                            <div className="form-group-field">
                                <TextField
                                    id="username"
                                    error={error.username ? true : false}
                                    label="Username"
                                    fullWidth={true}
                                    margin="dense"
                                    value={username}
                                    inputProps={{autoComplete: 'random-string', autofill:'off' }}
                                    onChange={(e) => this.handleChange('username', e.target.value)}
                                />
                                <h6 className="error-msg">{this.state.error.username}</h6>
                            </div>
                            <div className="form-group-field">
                                <TextField
                                    id="email"
                                    error={error.email ? true : false}
                                    label="Email Address"
                                    type="email"
                                    fullWidth={true}
                                    margin="dense"
                                    value={email}
                                    inputProps={{autoComplete: 'random-string', autofill:'off' }}
                                    onChange={(e) => this.handleChange('email', e.target.value)}
                                />
                                <h6 className="error-msg">{this.state.error.email}</h6>
                            </div>
                            <div className="form-group-field">
                                <TextField
                                    id="password"
                                    error={error.password ? true : false}
                                    label="Password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    name="Password"
                                    margin="dense"
                                    fullWidth={true}
                                    value={password}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end" style={{cursor: 'pointer'}}>
                                        {this.state.showPassword ?  <Visibility
                                            style={{color: '#555555'}}
                                            onClick={this.togglePasswordMask}
                                            /> : <VisibilityOff style={{color: '#555555'}} onClick={this.togglePasswordMask} />}
                                        </InputAdornment>
                                        ),
                                        'aria-label': 'password'
                                    }}
                                    onChange={(e) => this.handleChange('password', e.target.value)}
                                />
                                <h6 className="error-msg">{this.state.error.password}</h6>
                            </div>
                        <Button type="submit" variant="contained" color="primary" disabled={this.state.loader} className="submit" onClick={this.handleSubmit} >{this.state.loader ? "Processing..." : "Register"}</Button>
                        <p className="account-link-option">Already have an account? <Link to="login">LOGIN NOW</Link></p>
                        </form>
                </div>
            </React.Fragment>
        )
    }
}

export default UserRegister