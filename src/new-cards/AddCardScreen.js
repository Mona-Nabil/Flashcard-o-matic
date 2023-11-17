import React, { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readDeck } from "../utils/api";
import { RiHome8Fill } from "react-icons/ri";
import CardFrom from "./CardFrom";

function AddCardScreen() {
  const [deck, setDeck] = useState({});
  const [fronOfCard, setFrontOfCard] = useState("");
  const [backOfCard, setBackOfCard] = useState("");
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getAllDecks() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    }
    getAllDecks();
  }, [deckId]);

  const handleFrontOfCardChange = (event) => setFrontOfCard(event.target.value);
  const handleBackOfCardChange = (event) => setBackOfCard(event.target.value);

  const handleAddCardSave = async (event) => {
    event.preventDefault();
    await createCard(deckId, { front: fronOfCard, back: backOfCard });
    setFrontOfCard("");
    setBackOfCard("");
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
        <li className="breadcrumb-item active" aria-current="page">
          Add Card
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}

      <div className="card mt-3">
        <div className="card-body">
          <h2>{deck.name}: Add Card</h2>

          <CardFrom fronOfCard={fronOfCard} backOfCard={backOfCard} handleFrontOfCardChange={handleFrontOfCardChange} handleBackOfCardChange={handleBackOfCardChange}/>
          <div className="d-flex justify-content">
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Done
            </button>
            <button
              type="submit"
              className="btn btn-primary ml-2"
              onClick={handleAddCardSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCardScreen;
