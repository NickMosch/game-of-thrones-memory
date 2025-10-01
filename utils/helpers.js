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

function resetCards(cards) {
  const cardsCopy = [...cards];
  for (let cardIndex = 0; cardIndex < cardsCopy.length; cardIndex++) {
    cardsCopy[cardIndex] = { ...cardsCopy[cardIndex], clicked: false };
  }
  return cardsCopy;
}

//this function picks 4 cards at random
//with the condition that at least one of them hasn't been clicked yet
function selectShowing(cardsArg) {
    const copy = [...cardsArg];
    const notClick = copy.find((item) => !item.clicked);
    const rest = copy.filter((item) => item.id !== notClick.id).slice(0, 3);
    let shuffled = shuffleCards([...rest, notClick]);
    return shuffled; //shuffle so the unclicked card won't always be the last one
  }

export { shuffleCards,resetCards,selectShowing };
