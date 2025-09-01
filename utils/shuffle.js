function shuffleCards(cards) {
    const cardsCopy = [...cards];
    for (let cardIndex = cardsCopy.length - 1; cardIndex > 0; cardIndex--) {
      const cardToReplace = Math.floor(Math.random() * (cardIndex + 1));
      [cardsCopy[cardToReplace], cardsCopy[cardIndex]] = [
        cardsCopy[cardIndex],
        cardsCopy[cardToReplace],
      ];
    }
    return cardsCopy;
}

export {shuffleCards}