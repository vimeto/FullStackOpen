const mongoose = require('mongoose')
/* const config = require('../utils/config') */
const uniqueValidator = require('mongoose-unique-validator')


const blogSchema = new mongoose.Schema({
  author: { type: String, required: true, minlength: 5 },
  title: { type: String, required: true, minlength: 5 },
  url: { type: String, required: true, minlength: 8 },
  likes: { type: Number, required: true },
  comments: { type: Array, required: true },
  date: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)