import { useState } from 'react';

// Button component to handle feedback submission
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

// StatisticLine component to display individual statistic
const StatisticLine = ({ text, value, isPercentage }) => (
  <p>
    {text} {isPercentage ? `${value} %` : value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalClicks = good + neutral + bad;
  const average =
    totalClicks !== 0 ? (good * 1 + neutral * 0 + bad * -1) / totalClicks : 0;
  const positivePercentage = totalClicks !== 0 ? (good / totalClicks) * 100 : 0;

  if (totalClicks !== 0) {
    return (
      <div>
        <h2>statistics</h2>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={totalClicks} />
        <StatisticLine text='average' value={average} />
        <StatisticLine
          text='positive'
          value={positivePercentage}
          isPercentage
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;

/* import { useState } from 'react';

const Statistics = (props) => {
  if (props.totalClicks !== 0) {
    const { good, neutral, bad, totalClicks, average, positivePercentage } =
      props;
    return (
      <div>
        <h2>statistics</h2>
        <p>good {good} </p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {totalClicks}</p>
        <p>average {average}</p>
        <p>positive {positivePercentage} %</p>
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Calculate the total button clicks by summing 'good', 'neutral', and 'bad' counts
  const totalClicks = good + neutral + bad;

  // Calculate the average
  const average =
    totalClicks !== 0 ? (good * 1 + neutral * 0 + bad * -1) / totalClicks : 0;

  // Calculate the positive percentage
  const positivePercentage = totalClicks !== 0 ? (good / totalClicks) * 100 : 0;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalClicks={totalClicks}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
}

export default App;
 */
