import React from 'react';

const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
);

const Part = (props) => (
  <div>
    <p>
      {props.part} {props.exercises}
    </p>
  </div>
)

const Content = (props) => {
  return (
    <div>
      <Part part={props.partlist[0]} exercises={props.exslist[0]} />
      <Part part={props.partlist[1]} exercises={props.exslist[1]} />
      <Part part={props.partlist[2]} exercises={props.exslist[2]} />
    </div>
  );
}

const Total = (props) => (
  <div>
    <p>Number of exercises {props.exercises}</p>
  </div>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content partlist={[parts[0].name, parts[1].name, parts[2].name]} exslist={[parts[0].exercises, parts[1].exercises, parts[2].exercises]}/>
      <Total exercises={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  );
}

export default App;