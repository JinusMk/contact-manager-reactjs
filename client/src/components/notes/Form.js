import React from 'react'

class NotesForm extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            body: '',
            tags: []
        }
    }
    componentWillReceiveProps(nextProps){
      //  console.log(nextProps)
      const {title, body, tags} = nextProps.note
        this.setState(()=>({title,body,tags}))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            body: this.state.body,
            tags: this.state.tags
        }
       // console.log('1st',formData)
        this.props.handleSubmit(formData)
        this.setState(()=>({title: '', body: '', tags: []}))
    }
handleTitleChange = (e)=>{
const title = e.target.value
this.setState(()=>({title}))
}
handleBodyChange = (e) => {
    const body = e.target.value
    this.setState(()=>({body}))
}
handleTagsChange = (e) => {
 let tags = e.target.value
 //tags = tags.split(',')
 //console.log(tags)
 this.setState(()=>({tags}))

}


    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                <label>
                    Title 
                    <input type= "text" value ={this.state.title} onChange = {this.handleTitleChange}></input>
                </label><br/>
                <label>
                    Body
                    <textarea value={this.state.body} onChange = {this.handleBodyChange}></textarea>
                </label><br/>
                <label>
                    Tags
                    <input type = "text" value = {this.state.tags} onChange = {this.handleTagsChange}/>
                </label><br/>
                <input type = "submit"/>
                </form>
            </div>
        )
    }
}

export default NotesForm