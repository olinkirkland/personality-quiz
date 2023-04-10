import { useState } from 'react';
import Quiz from './Quiz';
import questions from './assets/questions.json';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="main">
      <Quiz questions={questions} />
    </div>
  );
}

export default App;
