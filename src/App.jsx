import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Sala from './components/sala.jsx';

function App() {
  const [position, setPosition] = useState({ top: '60vh', left: '75vw' });
  const [hasCollided, setHasCollided] = useState(false);

  const playerRef = useRef(null);
  const barreiraRef = useRef(null);
  const [scale, setScale] = useState(1);

  const playerSize = 20; // Em porcentagem da altura (vh)
  const greenBoxSize = 10; // Em porcentagem da altura (vh)
  const greenBoxPosition = { top: '40vh', left: '30vw' };

  const handleKeyDown = (event) => {
    setPosition((prevPosition) => {
      let newTop = parseFloat(prevPosition.top);
      let newLeft = parseFloat(prevPosition.left);

      switch (event.key) {
        case 'ArrowUp':
          newTop -= 0.8;
          break;
        case 'ArrowDown':
          newTop += 0.8;
          break;
        case 'ArrowLeft':
          setScale(1);
          newLeft -= 0.8;
          break;
        case 'ArrowRight':
          setScale(-1);
          newLeft += 0.8;
          break;
        default:
          break;
      }

      const barreiraBottom = barreiraRef.current.getBoundingClientRect().bottom / window.innerHeight * 100;
      const maxBottom = 90;
      const maxLeft = 0;
      const maxRight = 90;

      return {
        top: `${Math.min(Math.max(newTop, barreiraBottom), maxBottom)}vh`,
        left: `${Math.min(Math.max(newLeft, maxLeft), maxRight)}vw`,
      };
    });
  };

  useEffect(() => {
    const playerElement = playerRef.current;
    const playerRect = playerElement.getBoundingClientRect();
    const greenBoxElement = document.querySelector('.greenBox');
    const greenBoxRect = greenBoxElement.getBoundingClientRect();

    if (
      playerRect.left < greenBoxRect.left + greenBoxRect.width &&
      playerRect.left + playerRect.width > greenBoxRect.left &&
      playerRect.top < greenBoxRect.top + greenBoxRect.height &&
      playerRect.top + playerRect.height > greenBoxRect.top
    ) {
      setHasCollided(true);
    }
  }, [position]);

  useEffect(() => {
    if (hasCollided) return;
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasCollided]);

  if (hasCollided) {
    return <Sala setHasCollided={setHasCollided} />;
  }

  return (
    <>
      <div className="roomContainer">
        <div className="barreira" ref={barreiraRef}></div>

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

        <div
          className="greenBox"
          style={{
            top: greenBoxPosition.top,
            left: greenBoxPosition.left,
            width: `${greenBoxSize}vw`,
            height: `${greenBoxSize}vh`,
            position: 'absolute',
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
