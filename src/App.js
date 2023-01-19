import { useState } from "react";
import "./App.css";
import audiencePoll from "./assets/audience_poll.png";
import askTheExpert from "./assets/ask_the_expert.png";
import fiftyFifty from "./assets/fifty_fifty.png";
import flipQuestion from "./assets/flip_the_question.png";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import data from "./components/data";
import { useEffect } from "react";
import HomePage from "./components/HomePage";

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [game, endGame] = useState(false);
  const [earnedAmt, setEarnedAmt] = useState(0);

  const moneyList = [
    { id: 1, amount: "1,000" },
    { id: 2, amount: "2,000" },
    { id: 3, amount: "3,000" },
    { id: 4, amount: "5,000" },
    { id: 5, amount: "10,000" },
    { id: 6, amount: "20,000" },
    { id: 7, amount: "40,000" },
    { id: 8, amount: "80,000" },
    { id: 9, amount: "1,60,000" },
    { id: 10, amount: "3,20,000" },
    { id: 11, amount: "6,40,000" },
    { id: 12, amount: "12,50,000" },
    { id: 13, amount: "25,00,000" },
    { id: 14, amount: "50,00,000" },
    { id: 15, amount: "1 Crore" },
    { id: 16, amount: "7 Crores" },
  ].reverse();

  useEffect(() => {
    questionNum > 1 &&
      setEarnedAmt(
        moneyList.find((item) => item.id === questionNum - 1).amount
      );
  }, [moneyList, questionNum]);

  return (
    <div className="app_container">
      {userName ? (
        <>
          <div className="main">
            {game ? (
              questionNum - 1 === data.length ? (
                <div className="winner">
                  <div>🏆 Congratulations!!!</div>You earned : 
                  <span className="earned_money">&#8377; {earnedAmt}</span>
                </div>
              ) : (
                <div className="earned">You earned: &#8377; {earnedAmt}</div>
              )
            ) : (
              <>
                <div className="top">
                  <Timer endGame={endGame} questionNum={questionNum} />
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    endGame={endGame}
                    questionNum={questionNum}
                    setQuestionNum={setQuestionNum}
                  />
                </div>
              </>
            )}
          </div>

          <div className="price_list">
            <div className="lifelines">
              <div className="lifeline">
                <img src={audiencePoll} alt="audience_poll" />
              </div>
              <div className="lifeline">
                <img src={askTheExpert} alt="ask_the_expert" />
              </div>
              <div className="lifeline">
                <img src={fiftyFifty} alt="fifty_fifty" />
              </div>
              <div className="lifeline">
                <img src={flipQuestion} alt="flip_the_question" />
              </div>
            </div>
            <ul className="moneyList">
              {moneyList.map(({ id, amount }) => {
                return (
                  <li key={id} className={questionNum === id ? "moneyListItem active" : "moneyListItem"}>
                    <span className="moneyListItemNumber">{id}</span>
                    <span className="moneyListItemAmount">{amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <HomePage setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
