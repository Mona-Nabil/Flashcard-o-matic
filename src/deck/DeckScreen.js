import React, { useEffect, useState } from "react";
import { deleteCard, deleteDeck, readDeck } from "../utils/api/index";
import { useHistory, useParams, Link } from "react-router-dom";
import "./deckScreen.css";
import {
  RiPencilLine,
  RiBook2Line,
  RiDeleteBinLine,
  RiHome8Fill,
  RiMenuAddLine,
} from "react-icons/ri";

function DeckScreen() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getAllDecks() {
      const deckData = await readDeck(deckId);
      setCards(deckData.cards);
      setDeck(deckData);
    }

    getAllDecks();
  }, [deckId]);

  const handleTrashClick = () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      deleteDeck(deckId).then(() => history.push("/"));
    }
  };
  const handleTrashCardClick = (cardId) => {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      deleteCard(cardId).then(() => {
        // Refresh the deck data after deleting the card
        readDeck(deckId).then((deckData) => {
          setCards(deckData.cards);
          setDeck(deckData);
        });
      });
    }
  };

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item ri-home-3-fill">
            <Link to="/">
              <RiHome8Fill style={{ fontSize: "24px" }} />
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
        </ol>
      </nav>

      <div className="card mt-3">
        <div className="card-body">
          <h6 className="card-title">{deck.name}</h6>
          <p className="card-text">{deck.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <Link
                to={`/decks/${deck.id}/edit`}
                className="btn btn-secondary mr-2"
              >
               
                <RiPencilLine />
                Edit
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mr-2"
              >
                
                <RiBook2Line /> Study
              </Link>

              <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary mr-2"
              >
               
                <RiMenuAddLine />
                Add Cards
              </Link>
            </div>
            <div>
              <button
                className="btn btn-danger btn-small"
                onClick={handleTrashClick}
              >
                <RiDeleteBinLine /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mt-4 mb-3">Cards</h5>

      <table className="table">
        <tbody>
          {cards.map((card, idx) => (
            <tr className="border" key={idx}>
              <td>{card.front}</td>
              <td>{card.back}</td>
              <td className="card-buttons-container">
                <div className="card-buttons">
                  <Link
                    to={`/decks/${deck.id}/cards/${card.id}/edit`}
                    className="btn btn-secondary mr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <RiPencilLine /> Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleTrashCardClick(card.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeckScreen;
