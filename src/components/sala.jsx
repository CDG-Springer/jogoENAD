import React, { useState } from "react";
import './sala.css';
import { questions } from '../data/questions.jsx';

function Sala({ setHasCollided }) {
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  function handleAnswer(optionIndex) {
    if (optionIndex === currentQuestion.answer) {
      setScore(score + 100);
      handleNewQuestion();
    } else {
      handleNewQuestion();
      setAttempts(attempts + 1);
      if (attempts + 1 >= 3) {
        setGameOver(true);
      }
    }
  }

  function handleNewQuestion() {
    setCurrentQuestion(getRandomQuestion());
  }

  const handleClose = () => {
    setHasCollided(false); // Atualiza o estado para voltar ao componente App
  };

  if (gameOver) {
    return <App />;
  }

  return (
    <>
      <div id="avatarContainer">
        <img src="images/avatar.webp" alt="" className="avatar" />
      </div>

      <div id="voltarContainer">
        <span className="voltar" onClick={handleClose}>voltar</span>
      </div>

      <div id="bubbleSpeechContainer">
        <p className="perguntaMsg">Pergunta: {currentQuestion.question}</p>
      </div>
      <div id="jogoContainer">
        <div id="respostasContainer">
          <div className="score">
            <p className="">Score: {score}</p>
            <p className="errors">Erros: {attempts}</p>
          </div>
          <div id="containerRespostas">
            {currentQuestion.options.map((option, index) => (
              <span
                key={index}
                className="opcao"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sala;
