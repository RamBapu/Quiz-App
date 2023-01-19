import React, { useRef } from "react";

const HomePage = ({ setUserName }) => {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };
  return (
    <div className="start">
      <div className="kbc_game">
        <h1 className="game-text">Let's Play Harry Potter Trivia</h1>
      </div>
      <input
        placeholder="Enter your name..."
        className="startInput"
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
};

export default HomePage;
