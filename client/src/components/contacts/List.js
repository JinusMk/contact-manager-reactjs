import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
class ContactList extends React.Component{
    constructor(){
        super()
        this.state = {
            contacts: []
        }
    }
    componentDidMount(){
        axios.get('/contacts')
            .then(response => {
                this.setState(()=>({contacts: response.data}))
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return(
            <div>
                {
                    this.state.contacts.length === 0 ? ( (<center><p> No contacts found..! Add your first contact <Link to = "/contacts/new" >here</Link></p></center>)) : (  
                    <div>
                        <ul>
                     {
                        this.state.contacts.map((contact)=>{
                            return(
                               <li key = {contact._id}><Link to={`/contacts/${contact._id}`}>{contact.name}</Link></li>
                            )
                        })
                    }
                               
                        </ul>
                        </div>) 

                }

                <Link to="/contacts/new">Add Contact</Link>
            </div>
          
        )
    }
}

export default ContactList