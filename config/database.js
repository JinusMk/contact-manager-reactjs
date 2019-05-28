const mongoose = require('mongoose')
mongoose.Promise = global.Promise //global is the main object (global promise)
//const database_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/contact-manager-jan'
//console.log(process.env.MONGODB_URI)
mongoose.connect('mongodb://localhost:27017/contact-manager-jan', { useNewUrlParser: true})
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(err){
        console.log('OOPS! something went wrong with the db connection',err)
    })

    module.exports = {
        mongoose
    }