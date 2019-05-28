const express = require('express')
const router = express.Router() // express has total 76 functions but we need only 6 functions(CRUD),so we are exporting only                                       router package 

const {Contact} = require('../models/Contact')
const {authenticateUser} = require('../middleware/authentication')
// router.get('/',function(req, res){
//     res.send('Welcome to web page')
// })

//localhost:3005/contacts

router.get('/', authenticateUser, function(req, res){
    //will return all the information in the collection
    Contact.find({ user: req.user._id })
    .then(function(contacts){
        res.send(contacts)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:id', authenticateUser, function(req, res){
    const id = req.params.id
    //find operation
    Contact.findOne({user: req.user._id,
                _id: id})   //static method -> called using the Contact model
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })
    
})

//to find and remove from database

router.delete('/:id', authenticateUser, function(req, res){
    const id = req.params.id

      Contact.findOneAndDelete({
          user: req.user._id,
          _id: id
      })
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
router.put('/:id', authenticateUser, function(req, res){
    const id = req.params.id
    const body = req.body
    
    Contact.findOneAndUpdate({
        user: req.user._id,
        _id: id}, {$set: body}, {runValidators: true}
    )
    .then(function(contact){
        res.send(contact)
    })
    .catch(function(err){
        res.send(err)
    })

})

router.post('/',authenticateUser, function(req, res){
    const body = req.body
    const contact = new Contact(body)
    contact.user = req.user._id
    //_id, name, email, mobile -> body is passed as an arguement 
    contact.save()                  //instance method
    .then(function(contact){ //savedContact
        res.send(contact)
    })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = {
    contactRouter : router
}
