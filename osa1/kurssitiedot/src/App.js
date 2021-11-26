import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  
  <>
    {props.obj.map(object => (
      <Part text={object.name} amount={object.exercises} />
    ))}
  </>
  
)

const Total = (props) => {
  let sum = props.obj.map(item => item.exercises).reduce((prev, next) => prev + next)
  return (
    <p>
      Number of exercises {sum}
    </p>
  )
}

const Part = (props) => (
  <p>
    {props.text} {props.amount}
  </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name}/>
      <Content obj={course.parts} />
      <Total obj={course.parts} />
    </div>
  )
}

export default App