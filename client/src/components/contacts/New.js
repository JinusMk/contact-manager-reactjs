import React from 'react'
import axios from '../../config/axios'
import ContactForm from './Form'

class ContactNew extends React.Component{
    constructor(){
       super() 
    }
    handleSubmit = (formData)=>{
        axios.post('/contacts', formData)
            .then(()=> {
                this.props.history.push('/contacts')
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    render(){
        return(
            <div>
                <ContactForm handleSubmit = {this.handleSubmit}/>
            </div>
        )
    }
}
export default ContactNew