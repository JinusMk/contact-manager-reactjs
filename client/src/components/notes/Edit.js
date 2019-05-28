import React from 'react'
import axios from '../../config/axios'
import NotesForm from './Form'
class NoteEdit extends React.Component{
constructor(){
    super()
    this.state = {
        note: {}
    }
}
componentDidMount(){
    const id = this.props.match.params.id 
    axios.get(`/notes/${id}`)
        .then((response)=>{
            this.setState(()=>({note: response.data}))
        })
}
handleSubmit = (formData) => {
    const id = this.state.note._id
    axios.put(`/notes/${id}`, formData)
        .then(()=>{
            this.props.history.push(`/notes/${id}`)
        })
        .catch((err)=>{
            window.alert(err)
        })
}
render(){
    return(
        <div>
            <h2>Edit Note</h2>
            <NotesForm handleSubmit = {this.handleSubmit} note = {this.state.note}/>
        </div>
    )
}
}

export default NoteEdit