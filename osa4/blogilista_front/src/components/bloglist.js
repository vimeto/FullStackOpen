import React from "react"

const PhoneNumberList = ({ persons, newFilter, onDeleteButtonClick }) => (
    <>
      <h2>Numbers</h2>
      {persons.map( (person) => {
        if (person.name.toLowerCase().includes(newFilter.toLowerCase()) ) {
          return <Person person={person} onDeleteButtonClick={onDeleteButtonClick} key={person.id}/>
        }
        return <></>
      })}
    </>
  )
  
  const Person = ({ person, onDeleteButtonClick }) => (
    <div>
      {person.name} {person.number} <button onClick={() => onDeleteButtonClick(person.id)}>delete</button>
    </div>
  )

  export default PhoneNumberList