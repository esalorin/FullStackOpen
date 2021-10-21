import React, { useState } from 'react';

const StatisticLine = ({text, value}) => {
	if (text === 'positive')
	{
		return (
			<tr>
				<td>{text}</td>
				<td>{value} %</td>
			</tr>)
	}
	return(
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const all = good + neutral + bad
	if (all === 0) {
		return (
			<div>No feedback given</div>
		)
	}
	const average = (good - bad) / all
	const positive = good / all * 100
	return(
		<div>
			<table>
				<tbody>
					<StatisticLine text='good' value={good}/>
					<StatisticLine text='neutral' value={neutral}/>
					<StatisticLine text='bad' value={bad}/>
					<StatisticLine text='all' value={all}/>
					<StatisticLine text='average' value={average}/>
					<StatisticLine text='positive' value={positive}/>
				</tbody>
			</table>
		</div>
	)
}

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const Header = (props) => <h1>{props.header}</h1>

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const setToGood = () => setGood(good + 1)
	const setToNeutral = () => setNeutral(neutral + 1)
	const setToBad = () => setBad(bad + 1)

	return (
		<div>
			<Header header='Give your feedback here!'/>
			<Button handleClick={setToGood} text='good'/>
			<Button handleClick={setToNeutral} text='neutral'/>
			<Button handleClick={setToBad} text='bad'/>
			<Header header='Statistics'/>
			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
	)
}

export default App;
