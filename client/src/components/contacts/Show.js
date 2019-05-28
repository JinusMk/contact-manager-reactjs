import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

class ContactShow extends React.Component{
    constructor(){
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
    handleDelete = ()=>{
        const confirm = window.confirm('Are you sure ?')
        if(confirm){
            axios.delete(`/contacts/${this.state.contact._id}`)
                .then(() => {this.props.history.push('/contacts')})
                .catch((err) => {window.alert(err)})
        }
    }
    render(){
        return(
            <div>
                <h2>{this.state.contact.name}</h2>
                <p>{this.state.contact.mobile}</p>
                <p>{this.state.contact.email}</p>
                <button onClick = {this.handleDelete}>delete</button><br/><br/>
                <Link to={`/contacts/edit/${this.state.contact._id}`}>edit</Link><br/><br/>
            <Link to="/contacts">Go back</Link>
            </div>
        )
    }
}
export default ContactShow