import React, { useRef, useState } from "react";
import "./Metronome.css";

const Metronome = () => {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const timerId = useRef(0);

  const audioClick1 = new Audio(
    "https://daveceddia.com/freebies/react-metronome/click1.wav"
  );

  const handleBpmChange = (event) => {
    const bpm = event.target.value;
    setBpm(bpm);

    if (playing) {
      // Stop the old timer and start a new one
      clearInterval(timerId.current);
      timerId.current = setInterval(playClick, (60 / bpm) * 1000);

      // Set the new BPM
      setBpm(bpm);
    } else {
      // Otherwise just update the BPM
      setBpm(bpm);
    }
  };

  const playClick = () => {
    audioClick1.play();
  };

  const startStop = () => {
    if (playing) {
      // Stop the timer
      clearInterval(timerId.current);
      setPlaying(false);
    } else {
      // Start a timer with the current BPM
      timerId.current = setInterval(playClick, (60 / bpm) * 1000);
      setPlaying(true);
      playClick();
    }

    audioClick1.play();
  };

  return (
    <div className="metronome">
      <div className="bpm-slider">
        <div>{bpm} BPM</div>
        <input
          type="range"
          min="60"
          max="240"
          value={bpm}
          onChange={handleBpmChange}
        />
      </div>
      <button onClick={startStop}>{playing ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Metronome;
