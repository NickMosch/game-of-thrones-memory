import LoadingScreen from "../components/loading";
import { data, ids } from "../utils/data";
import { shuffleCards, resetCards } from "../utils/helpers";
import { useState, useEffect } from "react";
import GameOver from "../components/gameOver";
import Board from "../components/board";
import "../styles/board.css";

function App() {
  const [result, setResult] = useState(0); //0 means game is ongoing,1 means player won,2 means player lost
  const [loader, setLoader] = useState(true);
  const [cards, setCards] = useState(data);
  const [bestScore, setBestScore] = useState(0);

  const score = cards.filter((card) => card.clicked).length;

  useEffect(() => {
    console.log("component mounts");
    setCards((prevCards) => shuffleCards(prevCards)); //shuffle cards when the component mounts
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      promises.push(
        fetch(`https://thronesapi.com/api/v2/Characters/${ids[i]}`).then(
          (resp) => resp.json()
        )
      );
    }
    Promise.all(promises).then((characters) => {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          let char = characters.find((character) => character.id === card.id);
          return {
            ...card,
            url: char.imageUrl,
            name: char.fullName,
          };
        });
      });
      setLoader(false); //exit loading screen once all api calls have completed
    });
  }, []);

  function handleCardClick(cardId) {
    const cardsCopy = [...cards];
    const indexOfCard = cardsCopy.findIndex((card) => card.id == cardId);
    if (cardsCopy[indexOfCard].clicked) {
      //player lost
      setResult(2);
      setCards(resetCards(cards));
    } else {
      cardsCopy[indexOfCard] = { ...cardsCopy[indexOfCard], clicked: true };
      if (cardsCopy.every((card) => card.clicked)) {
        //player won
        setResult(1);
        setBestScore(cards.length);
        setCards(resetCards(cards));
      } else {
        setCards(shuffleCards(cardsCopy));
      }
    }
  }

  return loader ? (
    <LoadingScreen></LoadingScreen>
  ) : result === 0 ? (
    <Board
      cards={cards}
      handleCardClick={(cardId) => {
        handleCardClick(cardId);
      }}
      score={score}
      bestScore={bestScore}
    ></Board>
  ) : (
    <GameOver
      res={result}
      handleRestart={() => {
        setResult(0);
      }}
    ></GameOver>
  );
}

export default App;