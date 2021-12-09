const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://vimetoivonen:${password}@fullstackopen.frgjg.mongodb.net/phoneNumberDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
  })
  
const Person = mongoose.model('Person', personSchema)

if (process.argv.length != 5) {

    console.log("Phonebook:")

    Person.find({}).then(result => {
        result.forEach(note => {
          console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
        process.exit(1)
    })
}

else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        date: new Date()
      })
      
      person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
      })
      
}


