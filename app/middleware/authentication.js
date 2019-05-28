const {User} = require('../models/User')

const authenticateUser = function(req, res, next){
   // console.log('request -query :',req.query)
   // console.log('req- body', req.body)
   //const token = req.header('x-auth')
   //const token = req.body.token
  // console.log("token-", token)
  const token = req.header('x-auth')
    User.findByToken(token)
        .then(function(user){
            if(user){
                req.user = user
                req.token = token
                next()
            }else{
                res.status('401').send({notice: 'token not available'})
            }
            
        })
        .catch(function(err){
            res.status('401').send(err)
        })
}

module.exports = {
    authenticateUser
}