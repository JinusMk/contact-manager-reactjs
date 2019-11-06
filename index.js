
const express = require('express')
const app = express()
const {connection} = require('./config/database') //connecting with the database
const {contactRouter} = require('./app/controller/ContactsController') 

const {noteRouter} = require('./app/controller/NotesController')

const {usersRouter} = require('./app/controller/UsersController')

const cors = require('cors')

app.use(cors())

const port = process.env.PORT || 3001
app.use(express.json())
// app.use('/',function(req,res){
//     res.send('welcome')
// })


app.use('/users',usersRouter)

app.use('/contacts',contactRouter)

app.use('/notes',noteRouter) 



app.listen(port,function(){
    console.log('Listenig on port :',port)
})











