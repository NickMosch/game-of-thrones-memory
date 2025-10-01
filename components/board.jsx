import MemoryCard from "./card";
import { selectShowing } from "../utils/helpers";
import "../styles/board.css";

export default function Board({ cards, handleCardClick,score,bestScore }) {
  
  const cardsToDisplay = selectShowing(cards);

  return (
    <>
      <div className="score">
        <p>Score : {score}</p>
        <p>Best Score : {bestScore}</p>
      </div>
      <div className="board">
        <div className="cards">
          {cardsToDisplay.map((card) => (
            <MemoryCard
              key={card.id}
              id={card.id}
              url={card.url}
              name={card.name}
              onClick={(e) => {
                handleCardClick(e.target?.id || e.target.parentElement.id);
              }}
            ></MemoryCard>
          ))}
        </div>
        <div className="remaining">{score}/{cards.length}</div>
      </div>
    </>
  );
}
