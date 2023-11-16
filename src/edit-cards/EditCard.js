import React, { useEffect, useState } from "react";
import {
    Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardFrom from "../new-cards/CardFrom";
import { RiHome8Fill } from "react-icons/ri";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [frontOfCard, setFrontOfCard] = useState("");
  const [backOfCard, setBackOfCard] = useState("");

  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getAllDecks() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    }
    async function loadCard() {
      const cardData = await readCard(cardId);
      setCard(cardData);
      setFrontOfCard(cardData.front);
      setBackOfCard(cardData.back);
    }
    getAllDecks();
    loadCard();
  }, [deckId, cardId]);
  const handleFrontOfCardChange = (event) => setFrontOfCard(event.target.value);
  const handleBackOfCardChange = (event) => setBackOfCard(event.target.value);

  const handleEditedCardSubmit = (event) => {
    event.preventDefault();
    updateCard({ ...card, front: frontOfCard, back: backOfCard }).then(
      (updatedCard) => history.push(`/decks/${updatedCard.deckId}`)
    );
  };
  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <RiHome8Fill style={{ fontSize: "24px", marginRight: "4px" }} />
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
        {breadcrumb}
      <h2>Edit Card</h2>
      <form onSubmit={handleEditedCardSubmit}>
        <CardFrom
          fronOfCard={frontOfCard}
          backOfCard={backOfCard}
          handleFrontOfCardChange={handleFrontOfCardChange}
          handleBackOfCardChange={handleBackOfCardChange}
        />
        <div className="d-flex justify-content">
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={handleEditedCardSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCard;
