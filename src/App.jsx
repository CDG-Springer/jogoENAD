import React, { useState, useEffect } from 'react';
import './App.css';
import Sala from './components/sala.jsx';

function App() {
  // Estado para a posição do player
  const [position, setPosition] = useState({ top: 350, left: 750 });

  // Estado para determinar se o jogador colidiu com o quadrado verde
  const [hasCollided, setHasCollided] = useState(false);

  // Tamanho do player e do quadrado verde
  const playerSize = 50;
  const greenBoxSize = 50;

  // Posições iniciais do quadrado verde
  const greenBoxPosition = { top: 200, left: 500 };

  // Função para mover o player com base na tecla pressionada
  const handleKeyDown = (event) => {
    setPosition((prevPosition) => {
      // Calcula as novas posições
      let newTop = prevPosition.top;
      let newLeft = prevPosition.left;

      switch (event.key) {
        case 'ArrowUp':
          newTop = prevPosition.top - 10;
          break;
        case 'ArrowDown':
          newTop = prevPosition.top + 10;
          break;
        case 'ArrowLeft':
          newLeft = prevPosition.left - 10;
          break;
        case 'ArrowRight':
          newLeft = prevPosition.left + 10;
          break;
        default:
          break;
      }

      // Verifica se o player está dentro dos limites da tela
      const maxTop = 0;
      const maxBottom = window.innerHeight - playerSize;
      const maxLeft = 0;
      const maxRight = window.innerWidth - playerSize;

      return {
        top: Math.min(Math.max(newTop, maxTop), maxBottom),
        left: Math.min(Math.max(newLeft, maxLeft), maxRight),
      };
    });
  };

  // Verifica colisão entre o player e o quadrado verde
  useEffect(() => {
    if (
      position.left < greenBoxPosition.left + greenBoxSize &&
      position.left + playerSize > greenBoxPosition.left &&
      position.top < greenBoxPosition.top + greenBoxSize &&
      position.top + playerSize > greenBoxPosition.top
    ) {
      setHasCollided(true); // Troca para o componente Sala quando colidir
    }
  }, [position]);

  // Adiciona o listener de evento para o keydown
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Renderiza o componente Sala ao detectar colisão
  if (hasCollided) {
    return <Sala />;
  }

  return (
    <>
      <div className="roomContainer">
        <div
          className="player"
          style={{ top: `${position.top}px`, left: `${position.left}px`, position: 'absolute' }}
        ></div>

        {/* Quadrado verde */}
        <div
          className="greenBox"
          style={{
            top: `${greenBoxPosition.top}px`,
            left: `${greenBoxPosition.left}px`,
            width: `${greenBoxSize}px`,
            height: `${greenBoxSize}px`,
            backgroundColor: 'green',
            position: 'absolute'
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
