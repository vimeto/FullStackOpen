import React from "react"

const Course = ({ course }) => {
    return (
        <div>
            <Header text={course.name}/>
            <Content course={course} />
        </div>
    )
}

const Header = ({ text }) => (
    <h2>{text}</h2>
  )
  
const Content = ({ course }) => (
    <div>
        {course.parts.map(obj => (
        <Part text={obj.name} amount={obj.exercises} key={obj.id} />
        ))}
        <Total course={course} />
    </div>
)
  
const Total = ({ course }) => {
    let sum = course.parts.reduce( (s, n) => n.exercises + s, 0)
    return (
        <p>
            <b>total of {sum} exercises</b>
        </p>
    )
}
  
  const Part = (props) => (
    <p>
      {props.text} {props.amount}
    </p>
  )

  export default Course