import React from 'react';

const Header = ({ course }) => (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
  
  const Part = ({ name, exercises }) => (
    <div>
      <p>
        {name} {'->'} {exercises} exercises
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
      <strong>
        Exercises for this course -{'>'} {course.parts.map(el => el.exercises).reduce((a, b) => a + b, 0)}
      </strong>
    </div>
  )
  
  const Course = ({ course }) => (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );

export default Course;