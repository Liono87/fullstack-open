const Course = ({ course }) => {
  const { name, parts } = course;

  // Header component displaying the course name
  const Header = () => {
    return <h1>{name}</h1>;
  };

  //
  // Content component containing multiple Part components
  const Content = ({ parts }) => {
    return (
      <div>
        {/* Mapping over parts to render Part components */}
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };

  // Part component displaying a single course part
  const Part = ({ part }) => {
    return (
      <p key={part.id}>
        {part.name} - Exercises: {part.exercises}
      </p>
    );
  };

  // TotalExercises component to calculate and display the total exercises
  const TotalExercises = ({ parts }) => {
    /* let totalExercises = 0;

    for (let i = 0; i < parts.length; i++) {
      totalExercises += parts[i].exercises;
    }
 */

    const totalExercises = parts.reduce(
      (total, part) => total + part.exercises,
      0,
    );
    return <p>total of {totalExercises} exercises</p>;
  };

  // Rendering Course, including Header and Content
  return (
    <div>
      <Header />
      <Content parts={parts} />
      <TotalExercises parts={parts} />
    </div>
  );
};

// App component displaying a Course
const App = () => {
  // Sample course data
  const course = {
    id: 1,
    name: 'Half stack application development',
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
      },
    ],
  };

  // Rendering the Course component with the provided course data
  return <Course course={course} />;
};

export default App;
