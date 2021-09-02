import React from 'react';

const Header = ({ course }) => (
  <div>
    <h1>{course.name}</h1>
  </div>
);

const Part = ({ name, exercises }) => (
  <div>
    <p>
      {name} {exercises}
    </p>
  </div>
)

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  );
}

const Total = ({ course }) => (
  <div>
    <p>Number of exercises {course.parts.map(el => el.exercises).reduce((a, b) => a + b, 0)}</p>
  </div>
)

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Paul Otlet and his Visions of Xanadu',
        exercises: 1,
        id: 4,
      }
    ]
  }

  return (
    <Course course={course} />
  );
}

export default App;