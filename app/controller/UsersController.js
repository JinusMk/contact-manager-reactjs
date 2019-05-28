const express = require('express')
const router = express.Router()
const {User} = require('../models/User')
const {authenticateUser} = require('../middleware/authentication')
// const bcryptjs = require('bcryptjs')
//localhost:3000/users/register

router.post('/register',function(req,res){
    console.log('Inside register controller')
    const body = req.body
    console.log(body)
    const user = new User(body)
    user.save()
    .then(function(user){
        res.send(user)
    })
    .catch(function(err){
        res.send(err)
    })
   // res.send('Registration successful')
})

router.get('/',function(req,res){
    User.find()
    .then(function(users){
        res.send(users)
    })
    .catch(function(err){
        res.send(err)
    })
})


//localhost:3000/users/login

router.post('/login',function(req, res){
    const body = req.body
    console.log(req.body)
    User.findByCredentials(body.email, body.password) //it returns a promise as it's a db operation
        .then(function(user){
            return user.generateToken() //instance method
        })
        .then(function(token){
            res.send({token}) 
        })
        
        .catch(function(err){ //when email or password is wrong
            res.status(404).send(err)
        })
     
})
router.get('/account',authenticateUser,function(req,res){
   
    const {user} = req
    res.send(user)

})

router.delete('/logout',authenticateUser,function(req,res){
    const {user,token} = req
    User.findByIdAndUpdate(user._id, { $pull: {tokens:{token:token}}}) // $pull -> to remove an element from an array//tokens array -> token property -> token incoming token info:(matching)
            .then(function(){
                res.send('Successfully logged out!')
            })
            .catch(function(err){
                res.send(err)
            })
})


module.exports = {
    usersRouter: router
}




