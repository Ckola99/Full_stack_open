import { useState } from "react";

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ average, positive, good, bad, neutral, all }) => {
	return (
		<>
			<StatisticLine text="Good" value={good} />
			<StatisticLine text="Neutral" value={neutral} />
			<StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all}/>
			<StatisticLine text="Average" value={average} />
			<StatisticLine
				text="Positive"
				value={`${isNaN(positive) ? 0 : positive}%`}
			/>
		</>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>: {value}</td>
		</tr>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const totalFeedback = good + bad + neutral;

	const handleGoodClick = () => {
		setGood((prev) => prev + 1);
	};

	const handleNeutralClick = () => {
		setNeutral((prev) => prev + 1);
	};

	const handleBadClick = () => {
		setBad((prev) => prev + 1);
	};

	const average = () => {
		const total = good + bad + neutral;
		return total === 0 ? 0 : ((good - bad) / total).toFixed(2);
	};

	const positive = () => {
		const totalPositive = good;
		const total = good + bad + neutral;
		return ((totalPositive / total) * 100).toFixed(2);
	};

	return (
		<div>
			<h1>Give Feedback</h1>
			<Button text="Good" handleClick={handleGoodClick} />
			<Button
				text="Neutral"
				handleClick={handleNeutralClick}
			/>
			<Button text="Bad" handleClick={handleBadClick} />
			<h1>Statistics</h1>
			{totalFeedback === 0 ? (
				<p>No Feedback given.</p>
			) : (
				<Statistics
					positive={positive()}
					average={average()}
					good={good}
					bad={bad}
					neutral={neutral}
          all={totalFeedback}
				/>
			)}
		</div>
	);
};

export default App;
