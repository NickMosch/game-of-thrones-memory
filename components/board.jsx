import MemoryCard from "./card";
import { data, ids } from "../utils/data";
import { shuffleCards } from "../utils/shuffle";
import { useState, useEffect } from "react";

export default function Board() {
  const [cards, setCards] = useState(data);
  const [bestScore, setBestScore] = useState(0);

  const score = cards.filter((card) => card.clicked).length;
  if (score > bestScore) {
    setBestScore(score);
  } 
  
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
      setCards((prevCards) =>{
        console.log(prevCards);
        return prevCards.map((card) => {
          let char = characters.find(character => character.id===card.id);
          return {
            ...card,
            url: char.imageUrl,
            name: char.fullName,
          };
        })}
      );
    });
  }, []);

  useEffect(() => {
    setCards((prevCards) => shuffleCards(prevCards));
  }, []);

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
    setCards(shuffleCards(cardsCopy));
  }

  return (
    <div>
      <p>Score is {score}</p>
      <p>Best is {bestScore}</p>
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          name={card.name}
          url={card.url}
          onClick={handleCardClick}
        ></MemoryCard>
      ))}
    </div>
  );
}
