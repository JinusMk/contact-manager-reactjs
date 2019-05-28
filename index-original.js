//npm install --save express
const express = require('express')
//npm install --save mongoose
const mongoose = require('mongoose')
const port = 3005
const app = express()

app.use(express.json())


mongoose.Promise = global.Promise //global is the main object (global promise)

mongoose.connect('mongodb://localhost:27017/contact-manager-jan', { useNewUrlParser: true})
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(){
        console.log('OOPS! something went wrong with the db connection')
    })

//NOSQL Terminologies
//DataBase - contact-manager-jan
//collection - [] = [ {}, {}, {}, {}] (table)
//document - {} = { id:1, name: 'arun', email: 'arun@gamil.com, mobile: '1234567890'}
//field - property of an object = id, name, email, mobile ( Coloumn)

//Create a schema

const Schema = mongoose.Schema

const contactSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type : String
    },
    mobile:{
        type: String,
        required:true,
        minlength:10,
        maxlength:10
    }
})

//create a model based on the schema
const Contact = mongoose.model('Contact',contactSchema)
//contact becomes our object constructor function -//no need of manually assignment, it will be t



app.get('/',function(req, res){
    res.send('Welcome to web page')
})

//localhost:3005/contacts

app.get('/contacts', function(req, res){
    //will return all the information in the collection
    Contact.find()
    .then(function(contacts){
        res.send(contacts)
    })
    .catch(function(err){
        res.send(err)
    })
})

app.get('/contacts/:id',function(req, res){
    const id = req.params.id
    //find operation
    Contact.findById(id)   //static method -> called using the Contact model
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })
    
})

//to find and remove from database

app.delete('/contacts/:id',function(req, res){
    const id = req.params.id

      Contact.findByIdAndDelete(id)
             .then(function(contact){
            //it wont return error even if the record doesn't exist but it returns empty
        
               if(contact){
            res.send(contact)
                 }  else{
                 res.send('{}')
             }  
    })
    .catch(function(err){
        res.send(err)
    })
})

//to update a record 
app.put('/contacts/:id',function(req, res){
    const id = req.params.id
    const body = req.body
    // findByIdAndUpdate -- by default will not run the validations 
    // new -- to return the newly updated record , runValidators -- to run validations while updating
    Contact.findByIdAndUpdate(id,{ $set: body }, { new: true, runValidators: true})
    .then(function(contact){
        res.send(contact)
    })
    .catch(function(err){
        res.send(err)
    })

})

app.post('/contacts',function(req, res){
    const body = req.body
    //console.log(body)
    const contact = new Contact(body)
    //_id, name, email, mobile -> body is passed as an arguement 
    contact.save()                  //instance method
    .then(function(contact){
        res.send(contact)
    })
    .catch(function(err){
        res.send(err)
    })
})

// Note taking manager
// beginning with the schema-model level 


const noteSchema = new Schema({
    title :{
        type: String,
        required: true
    },
    body :{
        type: String
    },
    tags : {
        type : [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model('Note', noteSchema)

app.get('/notes',function(req, res){
    Note.find()
        .then(function(notes){
            res.send(notes)
        })
        .catch(function(err){
            res.send(err)
        })
    })
app.get('/notes/:id',function(req, res){
    const id = req.params.id
    Note.findById(id)
    .then(function(note){
        res.send(note)
    })
    .catch(function(err){
        res.send(err)
    })
})

app.post('/notes',function(req, res){
   // const id = req.params.id
    const body = req.body
    const note = new Note(body)
    note.save()
    .then(function(note){
        res.send(note)
    })
    .catch(function(err){
        res.send(err)
    })
})

app.put('/notes/:id',function(req, res){
    const id = req.params.id
    const body = req.body
    Note.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true})
    .then(function(note){
        res.send(note)
    })
    .catch(function(err){
        res.send(err)
    })
})

app.delete('/notes/:id',function(req, res){
    const id = req.params.id

    Note.findByIdAndDelete(id)
    .then(function(note){
        if(note){
            res.send(note)
        }
        else{
            res.send('{}')
        }
       
    })
    .catch(function(err){
        res.send(err)
    })
})


app.listen(port,function(){
    console.log('Listenig on port :',port)
})