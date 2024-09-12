import './Sound.scss';
import Plate from 'components/UI/Plate/Plate';
import soundtrack from 'assets/sounds/up.mp3';
import { useEffect, useState } from 'react';

export default function Sound() {
  const plateStyle = {
    padding: '36px 31px',
    position: 'relative',
    zIndex: 2,
  };

  // Звук
  const [sound, setSound] = useState(new Audio(soundtrack));
  const [soundCountDown, setSoundCountDown] = useState();
  const [isPlay, setIsPlay] = useState(false);
  const [timer, setTimer] = useState();
  function handler() {
    setIsPlay(!isPlay);
  }
  useEffect(() => {
    if (isPlay) {
      sound.play();
      setTimer(
        setInterval(() => {
          setSoundCountDown(Math.floor(sound.duration - sound.currentTime));
        }, 100)
      );
    } else {
      clearInterval(timer);
      sound.pause();
    }
  }, [isPlay]);
  function soundhandler() {
    setIsPlay(false);
    clearInterval(timer);
    setSoundCountDown(Math.floor(sound.duration));
  }
  useEffect(() => {
    sound.addEventListener('loadedmetadata', () => {
      setSoundCountDown(Math.floor(sound.duration));
      sound.addEventListener('ended', soundhandler);
    });
  }, []);

  return (
    <div className="sound__container">
      <div className="sound__circle _big"></div>
      <Plate style={plateStyle}>
        <div className="sound__track">
          <button className="sound__button" onClick={handler}></button>
          <div className={'sound__wave ' + (isPlay ? '_active' : '')}>
            {new Array(19).fill().map((i, ind) => (
              <div key={ind}></div>
            ))}
          </div>
          <p className="sound__timing">0:{soundCountDown}</p>
        </div>
        <p className="sound__about">
          Рассказываем, как наши 72 обученных автоматических алгоритма и 41000
          исполнителей с России и СНГ влияют на социальную активность и
          объявления на Авито
        </p>
      </Plate>
      <div className="sound__circle _small"></div>
    </div>
  );
}
