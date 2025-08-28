import MemoryCard from "./card";
import { data } from "../utils/data";
import { useState } from "react";

export default function Board() {
  const [cards, setCards] = useState(data);
  const [bestScore, setBestScore] = useState(0);

  const score = cards.filter((card) => card.clicked).length;
  if (score > bestScore) {
    setBestScore(score);
  }

  function shuffleCards(cardsCopy) {
    for (let cardIndex = cards.length - 1; cardIndex > 0; cardIndex--) {
      const cardToReplace = Math.floor(Math.random() * (cardIndex + 1));
      [cardsCopy[cardToReplace], cardsCopy[cardIndex]] = [
        cardsCopy[cardIndex],
        cardsCopy[cardToReplace],
      ];
    }
    setCards(cardsCopy);
  }

    'https://api.giphy.com/v1/gifs/translate?api_key=nG3o74a4rIU0rqzuRFT7FClR9T1kSQj2&s=cats'

  function handleCardClick(e) {
    const cardName = e.target.id ? e.target.id : e.target.parentElement.id;
    const cardsCopy = [...cards];
    const indexOfCard = cardsCopy.findIndex((card) => card.name == cardName);
    if (cardsCopy[indexOfCard].clicked) {
      for (let cardIndex = 0; cardIndex < cardsCopy.length; cardIndex++) {
        cardsCopy[cardIndex] = { ...cardsCopy[cardIndex], clicked: false };
      }
    } else {
      cardsCopy[indexOfCard] = { ...cardsCopy[indexOfCard], clicked: true };
    }
    shuffleCards(cardsCopy);
  }

  return (
    <div>
      <p>Score is {score}</p>
      <p>Best is {bestScore}</p>
      {cards.map((card) => (
        <MemoryCard
          key={card.name}
          name={card.name}
          url={card.url}
          onClick={handleCardClick}
        ></MemoryCard>
      ))}
    </div>
  );
}
