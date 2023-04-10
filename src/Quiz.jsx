import React, { useState } from 'react';
import Profile from './Profile';

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null)
  );

  const handleAnswer = (index, answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleSubmit = () => {
    Profile.setAnswers(questions, answers);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div>
        <p>Quiz completed!</p>
        <button onClick={handleSubmit}>Submit Answers</button>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  window.currentQuestionData = currentQuestionData;

  return (
    <div className="quiz-question">
      <h2>{currentQuestionData.prompt}</h2>
      <ul className="quiz-question__options">
        {currentQuestionData.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(currentQuestion, index)}>
              <p>{option.text}</p>
              <ul className="tags">
                {Object.entries(option.aspects).map(([key, value]) => (
                  <li
                    key={key}
                    className={`tag tag--${
                      value > 0 ? 'positive' : 'negative'
                    }`}
                  >
                    <span>{value}</span>
                    <span>{key}</span>
                  </li>
                ))}
                {option.flags &&
                  Object.entries(option.flags).map(([key, value]) => (
                    <li key={key} className="tag tag--flag">
                      <span>{value}</span>
                      <span>{key}</span>
                    </li>
                  ))}
              </ul>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;
