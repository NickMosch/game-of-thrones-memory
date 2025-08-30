import MemoryCard from "./card";
import { data } from "../utils/data";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    for (let i = 0; i < cards.length; i++) {
      fetch(`https://thronesapi.com/api/v2/Characters/${cards[i].id}`)
        .then((resp) => resp.json())
        .then((character) => {
          setCards(prevCards => prevCards.map((card,index)=>{
            if(index === i){
              return {...card,url:character.imageUrl,name:character.fullName}
            }else{
              return card;
            }
          }
          )) 
        });
    }
  },[cards.length]);

  function handleCardClick(e) {
    const cardName = e.target.id ? e.target.id : e.target.parentElement.id;
    const cardsCopy = [...cards];
    console.log(cardsCopy);
    const indexOfCard = cardsCopy.findIndex((card) => card.id == cardName);
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
          key={card.id}
          name={card.id}
          url={card.url}
          onClick={handleCardClick}
        ></MemoryCard>
      ))}
    </div>
  );
}
