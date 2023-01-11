const Header = ({ course }) => <h1>{course}</h1>

const Total = ({sum}) => <strong>total of {sum} exercises</strong>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part, i) =>
      <Part key={parts[i].id} part={parts[i]}/>)}    
  </>

const Course = ({course}) => {
  const total = course.parts.reduce((previous,current)=>previous+current.exercises,0)
  return (<>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={total}/>
  </>)
}

export default Course