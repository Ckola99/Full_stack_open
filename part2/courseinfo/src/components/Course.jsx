import React from "react";

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Total = ({ sum }) => (
	<p>
		<strong>total of {sum} exercises</strong>
	</p>
);

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</>
	);
};

const Course = ({ course }) => {
	const totalExercises = course.parts.reduce(
		(sum, part) => sum + part.exercises,
		0
	);

	return (
		<>
			<Header courseName={course.name} />
			<Content parts={course.parts} />
			<Total sum={totalExercises} />
		</>
	);
};

export default Course;
