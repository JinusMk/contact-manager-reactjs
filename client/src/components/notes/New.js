import React from 'react'
import axios from '../../config/axios'
import NotesForm from './Form'

class NewNote extends React.Component{
    constructor(){
        super()
    }
    handleSubmit=(formData)=>{
        axios.post('/notes',formData)
            .then(()=>{
                this.props.history.push('/notes')
            })
            .catch(err =>{
                console.log(err)
            })
    }
    render(){
        return(
            <div>
                <NotesForm handleSubmit = {this.handleSubmit}/>
            </div>
        )
    }
}

export default NewNote