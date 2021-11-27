import React, { useState, useEffect } from 'react'
import noteServise from './services/notes'
import Form from './components/form'
import PhoneNumberList from './components/phonenumberlist'
import ErrorMessage from './components/errormessage'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    noteServise
      .getAll()
      .then(response => {
        setPersons(response)
    })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const handleChangingErrorMessage = (messageText, messageColor) => {
    const newErrorObject = {
      text:messageText,
      color:messageColor
    }
    setErrorMessage(newErrorObject)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  const addPerson = (event) => {
    event.preventDefault()
    if ( persons.filter( person => person.name === newName ).length > 0 ) {
      const currentPerson = persons.find(person => person.name === newName)
      if (window.confirm(`${currentPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const nameObject = {
          name: currentPerson.name,
          number: newPhone
        }
        noteServise
          .update(currentPerson.id, nameObject)
          .then(response => {
            handleChangingErrorMessage(`${response.name}'s phonenumber successfully changed to ${response.number}`, "green")
            setPersons( persons.map(person => person.id === response.id ? response : person))
          })
          .catch(response => {
            handleChangingErrorMessage(`${nameObject.name} seems to have been deleted elsewhere...`, "red")
            setPersons( persons.filter(person => person.id !== currentPerson.id))
          })
      }
      return
    }
    const nameObject = {
      name: newName,
      number: newPhone
    }
    noteServise
      .create(nameObject)
      .then(response => {
        /* console.log("post promise fulfilled") */
        handleChangingErrorMessage(`${nameObject.name} added successfully`, "green")
        setPersons(persons.concat(response))
        setNewName('')
        setNewPhone('')
    })
  }

  const onDeleteButtonClick = (id) => {
    const personToBeDeleted = persons.find(n => n.id === id)

    if (window.confirm(`Do you really want to delete ${personToBeDeleted.name}?`)) {
      noteServise
        .del(id)
        .then(response => {
          /* console.log("delete promise fulfilled") */
          handleChangingErrorMessage(`${personToBeDeleted.name} deleted successfully`, "green")
          setPersons( persons.filter(person => person.id !== id))
          /* console.log(persons) */
        })
        .catch(response => {
          handleChangingErrorMessage(`${personToBeDeleted.name} seems to have been deleted elsewhere...`, "red")
          setPersons( persons.filter(person => person.id !== personToBeDeleted.id))
        })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage errorObject={errorMessage} />
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <Form formSubmit={addPerson} newName={newName} newPhone={newPhone} nameHandler={handleNameChange} phoneHandler={handlePhoneChange} />
      <PhoneNumberList persons={persons} newFilter={newFilter} onDeleteButtonClick={onDeleteButtonClick} />
    </div>
  )

}

export default App
