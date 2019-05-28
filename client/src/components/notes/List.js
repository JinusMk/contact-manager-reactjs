import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class NotesList extends React.Component{
    constructor(){
        super()
        this.state = {
            notes: []
        }
    }
    componentDidMount(){
        axios.get('/notes')
            .then(response => {
                this.setState(()=>({notes: response.data}))
            })
            .catch(err =>{console.log(err)})
    }
    render(){
        return(
            <div>
                {
                    this.state.notes.length === 0 ? (<center><p> No notes found! Add your first note <Link to = "/notes/new" >here</Link></p></center>) : (
                        <div>
                            <ul>{
                                this.state.notes.map(note=>{
                                    return(
                                        <li key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link></li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    )
                }
                <Link to='/notes/new'>Add Note</Link>
            </div>
        )
    }
}

export default NotesList