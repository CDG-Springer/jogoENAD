import { useState } from "react";
import './sala.css';
import { questions } from '../data/questions.jsx';
import App from "../App.jsx";

function Sala() {

  // define a pergunta atual, pegando uma aleatória
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion())

  // define o score atual
  const [score, setScore] = useState(0)

  // define quantas tentativas ainda se tem
  const [attempts, setAttempts] = useState(0)

  // define se é game over ou não
  const [gameOver, setGameOver] = useState(false)

  // função para puxar uma pergunta aleatória
  function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length)
    return questions[randomIndex]
  }

  // função por trás da lógica das tentativas pontuação e game over
  function handleAnswer(optionIndex) {

    // se o index da opção escolhida for IGUAL a index da pergunta atual, adicionar 100 pontos e mostrar uma nova pergunta
    if (optionIndex === currentQuestion.answer) {
      setScore(score + 100)
      handleNewQuestion()
    } else {

      // caso contrario, jogar uma nova pergunta e adicinoar +1 para a quantidade de erros permitidos
      handleNewQuestion()
      setAttempts(attempts + 1)
      if (attempts + 1 >= 3) {

        // se attempts +1 for maior que 3, game over
        handleNewQuestion()
        setGameOver(true)
      }
    }
  }

  // função para dar uma nova pergunta
  function handleNewQuestion() {
    setCurrentQuestion(getRandomQuestion())
  }

  // se game over == tre, voltar para a tela principal
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
  )
}

export default Sala;