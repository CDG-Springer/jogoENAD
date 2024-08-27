import { useState } from "react";
import './sala.css';
import { questions } from '../data/questions.jsx';
import App from "../App.jsx";

function Sala() {
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion())
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length)
    return questions[randomIndex]
  }

  function handleAnswer(optionIndex) {
    if (optionIndex === currentQuestion.answer) {
      setScore(score + 100)
      handleNewQuestion()
    } else {
      handleNewQuestion()
      setAttempts(attempts + 1)
      if (attempts + 1 >= 3) {
        handleNewQuestion()
        setGameOver(true)
      }
    }
  }

  function handleNewQuestion() {
    setCurrentQuestion(getRandomQuestion())
  }

  if(gameOver) {
    return <App />
  }

  return (
    <>
      <div id="bubbleSpeechContainer">
        <p className="perguntaMsg">Pergunta: {currentQuestion.question}</p>
      </div>

      <div id="avatarContainer">
        <img src="/images/avatar.webp" alt="" className="avatar" />
      </div>

      <div id="jogoContainer">
        <div id="perguntasContainer">
          <p className="score">Score: {score}</p>
          <p className="errors">Erros: {attempts}</p>
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
  )
}

export default Sala;