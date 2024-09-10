import React, { useState } from "react";
import './sala.css';
import { questions } from '../data/questions.jsx';
import App from "../App.jsx";

function Sala({ setHasCollided }) {
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Função para obter uma pergunta aleatória
  function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  // Função para lidar com a resposta do jogador
  function handleAnswer(optionIndex) {
    if (optionIndex === currentQuestion.answer) {
      // Resposta correta: adiciona pontos e passa para a próxima pergunta
      setScore(score + 100);
      handleNewQuestion();
    } else {
      // Resposta errada: adiciona uma tentativa e verifica o game over
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setGameOver(true); // Fim de jogo após 3 tentativas erradas
      } else {
        handleNewQuestion();
      }
    }
  }

  // Função para puxar uma nova pergunta
  function handleNewQuestion() {
    setCurrentQuestion(getRandomQuestion());
  }

  // Função para fechar a sala e voltar ao App
  const handleClose = () => {
    setHasCollided(false);
  };

  // Quando o jogo termina, mostra uma mensagem de Game Over
  if (gameOver) {
    return (
      <App/>
    );
  }

  return (
    <>
      <div id="avatarContainer">
        <img src="images/avatar.webp" alt="" className="avatar" />
      </div>

      <div id="voltarContainer">
        <span className="voltar" onClick={handleClose}>Voltar</span>
      </div>

      <div id="bubbleSpeechContainer">
        <p className="perguntaMsg">Pergunta: {currentQuestion.question}</p>
      </div>
      <div id="jogoContainer">
        <div id="respostasContainer">
          <div className="score">
            <p>Score: {score}</p>
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
