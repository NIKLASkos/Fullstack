//includes all of the subcomponents of the component Course.

const Header = (props) => (
    <h2>{props.name}</h2>
  )
  
  const Part = (props) => (
    <p>{props.name} {props.exercises}</p>
  )
  
  const Content = ({parts}) => {
    const exercises = parts.map(part => part.exercises)
    console.log('exercises in array ', exercises)
    const sumOfExercises = exercises.reduce
    ((previousValue, currentValue) => 
      previousValue + currentValue
    )
    console.log('sum',sumOfExercises)
  
    return(  
    <div>
      {parts.map(part => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <b>Total number of exercises: {sumOfExercises}</b>
    </div>
  )}
  
  const Course = ({course}) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )

  export default Course