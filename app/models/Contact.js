const mongoose = require('mongoose')

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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})

//create a model based on the schema
const Contact = mongoose.model('Contact',contactSchema)

module.exports = {
    Contact
}
