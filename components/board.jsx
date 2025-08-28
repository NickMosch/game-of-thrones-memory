import MemoryCard from "./card";
import { data } from "../utils/data";
import { useState } from "react";

export default function Board(){

    const [cards,setCards] = useState(data);

    function handleCardClick(e){
        const cardName = e.target.id?e.target.id:e.target.parentElement.id;
        const cardsCopy = [...cards];
        const indexOfCard = cardsCopy.findIndex(card => card.name == cardName);
        if(cardsCopy[indexOfCard].clicked) return;
        cardsCopy[indexOfCard] = {...cardsCopy[indexOfCard],clicked:true};
        setCards(cardsCopy);
    }

    return (
        <div>
        {cards.map((card) => <MemoryCard key={card.name} name={card.name} url={card.url} onClick = {handleCardClick}></MemoryCard>)}
        </div>
    )
}