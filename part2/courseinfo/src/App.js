import React from 'react';
import Course from './components/Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4,
        }
      ]
    },
    {
      name: 'Foundations of Hypermedia',
      id: 2,
      parts: [
        {
          name: 'Paul Otlet and his Visions of Xanadu',
          exercises: 15,
          id: 1
        },
        {
          name: 'Douglas Engelbart and the Mother of All Demos',
          exercises: 3,
          id: 2,
        },
        {
          name: 'Ted Nelson and the Curse of Xanadu',
          exercises: 12,
          id: 3,
        },
      ]
    },
    {
      name: 'Node.js',
      id: 3,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
  ];

  return (
    <div>
      {courses.map(course => <Course key ={course.id} course={course} />)}
      <h3>Total Number of Exercises: {courses.map(course => course.parts)
        .reduce((a, b) => Array.prototype.concat(a, b), []).map(module => module.exercises)
        .reduce((a, b) => a + b, 0)}
      </h3>
    </div>
  );
} // added a functional sausage that returns the total number of exercises

export default App;