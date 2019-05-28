import React from 'react'

class ContactForm extends React.Component {
    constructor(props){
        console.log('constructor- form component')
        super()
        this.state = {
            name: '',
            mobile: '',
            email: ''
        }
        this.handleMobileChange = this.handleMobileChange.bind(this)
    }
//es6- arrow function
    handleNameChange = (e) => {
 const name = e.target.value
 this.setState(()=>({name}))
    }
//es6- function bind in the constructor
handleMobileChange (e){
    const mobile = e.target.value
    this.setState(()=>({mobile}))
}
//es6- bind when calling the function
handleEmailChange(e){
    const email = e.target.value
    this.setState(()=>({email}))
}

handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
        name: this.state.name,
        mobile: this.state.mobile,
        email: this.state.email
    }
    console.log(formData)
    this.props.handleSubmit(formData)

    this.setState(()=>({name: '',mobile: '', email: ''}))
}
componentWillReceiveProps(nextProps){
    console.log('FORM - nextProps',nextProps)
    const {name, mobile, email} = nextProps.contact
    this.setState(()=>({
        name,mobile,email
    }))
}
    render(){
        console.log('render- FORM component')
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Name
                    <input type = "text" value = {this.state.name} onChange = {this.handleNameChange}></input>
                    </label><br/>
                    <label>
                        Mobile
                    <input type = "text" value = {this.state.mobile} onChange = {this.handleMobileChange}/>
                    </label><br/>
                    <label>
                        Email
                    <input type = "text" value = {this.state.email} onChange = {this.handleEmailChange.bind(this)}/>
                    </label><br/>
                    <input type = "submit"></input>
                </form>
            </div>
        )
    }
}

export default ContactForm