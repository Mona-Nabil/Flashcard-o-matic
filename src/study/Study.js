import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const [deck, setDeck] = useState({cards: []});
  // const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [flipCount, setFlipCount] = useState(0);
  const [isFrontCard, setIsFrontOfCard] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getAllDecks() {
      const deckData = await readDeck(deckId);
      // setCards(deckData.cards);
      setDeck(deckData);
      setCurrentCard(deckData.cards[flipCount]);
    }

    getAllDecks();
  }, [deckId, flipCount]);

  const handleNextClick = (e) => {
   
    if (flipCount < deck.cards.length - 1) {
      setIsFrontOfCard((currentSide) => !currentSide);
      setFlipCount((currentCount) => currentCount + 1);
      setCurrentCard(deck.cards[flipCount + 1]);
    } else {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page."
        )
      ) {
        setIsFrontOfCard(true);
        setCurrentCard(deck.cards[0]);
        setFlipCount(1);
      } else {
        history.push("/");
      }
    }
  };

  const handleFlipClick = (e) => {
    
    setIsFrontOfCard(!isFrontCard);
  };

  const currentSideDescription = isFrontCard ? (
    <h5 className="card-text">{currentCard.front}</h5>
  ) : (
    <h5 className="card-text">{currentCard.back}</h5>
  );

  const cardContent = currentCard ? (
    <div>
      <h6 className="card-title font-weight-bold">
        Card {flipCount + 1} of {deck.cards.length}
      </h6>
      <div className="card mb-3">
        <div className="card-body">{currentSideDescription}</div>
      </div>
      <button className="btn btn-primary mr-2" onClick={handleFlipClick}>
        Flip
      </button>
      <button className="btn btn-success" onClick={handleNextClick}>
        Next
      </button>
    </div>
  ) : null;

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Study
        </li>
      </ol>
    </nav>
  );

  // Add styling for the not enough cards section
  const notEnoughCardsSection =
  deck.cards.length < 3 ? (
      <div className="mt-4">
        <h4 className="font-weight-bold">Not enough cards!</h4>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length} cards in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    ) : null;

  return (
    <div>
      {breadcrumb}

      <h2 className="mt-3">{deck.name}: Study</h2>

      {notEnoughCardsSection}

      {!notEnoughCardsSection  && (
        <div className="deck-card card mt-2">
          <div className="card-body">
            <div className="d-flex flex-column justify-content-between">
              {cardContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Study;
