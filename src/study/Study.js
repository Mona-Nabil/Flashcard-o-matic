import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const [deck, setDeck] = useState({ cards: [{ front: "", back: "" }] });

  const [currentCardidx, setCurrentCardidx] = useState(0);
  const [isFrontCard, setIsFrontOfCard] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getAllDecks() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    }

    getAllDecks();
  }, [deckId]);

  const handleNextClick = (e) => {
    if (!isFrontCard) {
      if (currentCardidx < deck.cards.length - 1) {
        setIsFrontOfCard((currentSide) => !currentSide);
        setCurrentCardidx(currentCardidx + 1);
      } else {
        if (
          window.confirm(
            "Restart cards? Click 'cancel' to return to the home page."
          )
        ) {
          setIsFrontOfCard(true);

          setCurrentCardidx(0);
        } else {
          history.push("/");
        }
      }
    }
  };

  const nextButton = !isFrontCard && (
    <button className="btn btn-success" onClick={handleNextClick}>
      Next
    </button>
  );

  const handleFlipClick = (e) => {
    setIsFrontOfCard(!isFrontCard);
  };
  const currentCard = deck.cards[currentCardidx];

  const currentSideDescription = isFrontCard ? (
    <div>
      <h5 className="card-text">{currentCardidx.front}</h5>
    </div>
  ) : (
    <h5 className="card-text">{currentCardidx.back}</h5>
  );

  const cardContent = currentCard ? (
    <div>
      <h6 className="card-title font-weight-bold">
        Card {currentCardidx + 1} of {deck.cards.length}
      </h6>
      <div className="card mb-3">
        <div className="card-body">{currentSideDescription}</div>
      </div>
      <button className="btn btn-primary mr-2" onClick={handleFlipClick}>
        Flip
      </button>
      {nextButton}
    </div>
  ) : (
    <p>Loading...</p>
  );

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

  const notEnoughCardsSection =
    deck.cards.length < 3 ? (
      <div className="mt-4">
        <p className="font-weight-bold">Not enough cards!</p>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck.
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

      {!notEnoughCardsSection && (
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
