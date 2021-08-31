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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content partlist={[part1.name, part2.name, part3.name]} exslist={[part1.exercises, part2.exercises, part3.exercises]}/>
      <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
}

export default App;