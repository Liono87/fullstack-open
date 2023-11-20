import { useState } from 'react';

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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
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

export default App;
