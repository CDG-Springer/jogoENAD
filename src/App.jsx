import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Sala from './components/sala.jsx';

function App() {
  // Estado para a posição do player
  const [position, setPosition] = useState({ top: '60vh', left: '75vw' });

  // Estado para determinar se o jogador colidiu com o quadrado verde
  const [hasCollided, setHasCollided] = useState(false);

  const playerRef = useRef(null);
  const barreiraRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Tamanho do player e do quadrado verde (em porcentagem da tela)
  const playerSize = 20; // Em porcentagem da altura (vh)
  const greenBoxSize = 10; // Em porcentagem da altura (vh)

  // Posições iniciais do quadrado verde
  const greenBoxPosition = { top: '40vh', left: '30vw' };

  // Função para mover o player com base na tecla pressionada
  const handleKeyDown = (event) => {
    setPosition((prevPosition) => {
      // Calcula as novas posições em porcentagem
      let newTop = parseFloat(prevPosition.top);
      let newLeft = parseFloat(prevPosition.left);

      switch (event.key) {
        case 'ArrowUp':
          newTop -= 2; // Move o jogador 2% para cima
          break;
        case 'ArrowDown':
          newTop += 2;
          break;
        case 'ArrowLeft':
          setScale(1);
          newLeft -= 2;
          break;
        case 'ArrowRight':
          setScale(-1);
          newLeft += 2;
          break;
        default:
          break;
      }

      // Verifica se o player está dentro dos limites da tela e da barreira
      const barreiraBottom = barreiraRef.current.getBoundingClientRect().bottom / window.innerHeight * 100;
      const maxBottom = 90; // Limite inferior em % da altura da viewport
      const maxLeft = 0; // Limite esquerdo
      const maxRight = 90; // Limite direito em % da largura da viewport

      return {
        top: `${Math.min(Math.max(newTop, barreiraBottom), maxBottom)}vh`, // Impede de ultrapassar a barreira
        left: `${Math.min(Math.max(newLeft, maxLeft), maxRight)}vw`,
      };
    });
  };

  // Verifica colisão entre o player e o quadrado verde
  useEffect(() => {
    const playerElement = playerRef.current;
    const playerRect = playerElement.getBoundingClientRect();
    const greenBoxElement = document.querySelector('.greenBox'); // Obtém o elemento do quadrado verde
    const greenBoxRect = greenBoxElement.getBoundingClientRect();

    // Verifica se há colisão entre os elementos
    if (
      playerRect.left < greenBoxRect.left + greenBoxRect.width &&
      playerRect.left + playerRect.width > greenBoxRect.left &&
      playerRect.top < greenBoxRect.top + greenBoxRect.height &&
      playerRect.top + playerRect.height > greenBoxRect.top
    ) {
      setHasCollided(true); // Troca para o componente Sala quando colidir
    }
  }, [position]);

  useEffect(() => {
    if (hasCollided) return;
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasCollided]);

  // Renderiza o componente Sala ao detectar colisão
  if (hasCollided) {
    return <Sala />;
  }

  return (
    <>
      <div className="roomContainer">
        {/* Barreira que impede o jogador de ir para cima */}
        <div className="barreira" ref={barreiraRef}></div>

        {/* Player */}
        <div
          className="player"
          ref={playerRef}
          style={{
            top: position.top,
            left: position.left,
            width: ``,
            height: `${playerSize}vh`,
            position: 'absolute',
            transform: `scaleX(${scale})`,
          }}
        ></div>

        {/* Quadrado verde */}
        <div
          className="greenBox"
          style={{
            top: greenBoxPosition.top,
            left: greenBoxPosition.left,
            width: `${greenBoxSize}vw`,
            height: `${greenBoxSize}vh`,
            position: 'absolute',
            background: 'green'
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
