import React, { useState } from "react";
import { useEffect } from "react";

import useSound from "use-sound";
import correct from "../assets/src_assets_correct.mp3";
import wrong from "../assets/src_assets_wrong.mp3";
import play from "../assets/src_assets_play.mp3";

const Quiz = ({ data, endGame, questionNum, setQuestionNum }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [ansClassName, setAnsClassName] = useState("answer");

  const [playStartGameSound] = useSound(play);
  const [playCorrectAnsSound] = useSound(correct);
  const [playWrongAnsSound] = useSound(wrong);

  if(questionNum === 1){ playStartGameSound()}

  useEffect(() => {
    if (questionNum - 1 === data.length) {
      endGame(true);
    }
    setQuestion(data[questionNum - 1]);
  }, [data, questionNum, endGame]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnsClassName("answer active");

    setTimeout(() => {
      setAnsClassName(answer.correct ? "answer correct" : "answer wrong");
    }, 3000);

    setTimeout(() => {
      if (answer.correct) {
        playCorrectAnsSound();
        setTimeout(() => {
          setQuestionNum((prevQuesNum) => prevQuesNum + 1);
          setSelectedAnswer(null);
        }, 2000);
      } else {
        playWrongAnsSound();
        setTimeout(() => {
          endGame(true);
        }, 2000);
      }
    }, 4000);
  };

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((answer, index) => {
          return (
            <div
              key={index}
              className={selectedAnswer === answer ? ansClassName : "answer"}
              onClick={() => handleAnswer(answer)}>
              <span className="option">&#x2756;{answer.option}: </span>
              {answer.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
