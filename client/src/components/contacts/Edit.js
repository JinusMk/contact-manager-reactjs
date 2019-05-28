import React from 'react'
import axios from '../../config/axios'
import ContactForm from './Form'

class ContactEdit extends React.Component{
    constructor(){
        console.log('constructor- Edit component')
        super()
        this.state = {
            contact: {}
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/contacts/${id}`)
            .then(response => {
                this.setState(()=>({contact: response.data}))
            })
    }
    handleSubmit = (formData)=>{
        axios.put(`/contacts/${this.state.contact._id}`,formData)
            .then(() => {
                this.props.history.push(`/contacts/${this.state.contact._id}`)
            })
            .catch(err => {
                console.log(err)
            })
    } 
    render(){
        console.log('render- Edit component')
        return(
            <div>
                <h2>Edit Contact</h2>
               <ContactForm handleSubmit = {this.handleSubmit} contact = {this.state.contact}/>
            
            </div>
        )
    }
}

export default ContactEdit