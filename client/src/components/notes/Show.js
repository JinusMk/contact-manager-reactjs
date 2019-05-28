import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
class NoteShow extends React.Component{
    constructor(){
        super()
        this.state = {
            note: {}
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`)
            .then(response => {
                this.setState(()=>({note: response.data}))

            })
            .catch(err => {
                window.alert(err)
            })
    }
    handleDelete = ()=>{
        const confirm = window.confirm('Are you sure.?')
        if(confirm){
            axios.delete(`/notes/${this.state.note._id}`)
            .then(()=>{this.props.history.push('/notes')})
            .catch((err) => { console.log(err)})
        }  
    }
    render(){
        return(
            <div>
                 <h2>{this.state.note.title}</h2>
                 <p>{this.state.note.body}</p>
                 <p>{this.state.note.tags}</p>
                <Link to={`/notes/edit/${this.state.note._id}`}>edit</Link>
            <button onClick = {this.handleDelete}>delete</button>
            <Link to="/notes">Go back</Link>
            </div>
        )
    }
}

export default NoteShow