import React from "react";
import {
  RiBookLine,
  RiDeleteBin6Line,
  RiEyeLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeckDetail({ deck }) {
  const history = useHistory()
  const handleTrashClick = () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      deleteDeck(deck.id).then(() => history.push("/"));
    }
  };
  return (
    <div>
      <div className="deck-card card mt-2" key={deck.id}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title font-weight-bold">{deck.name}</h5>
            <h6 className="card-subtitle text-muted">
              {deck.cards.length} cards
            </h6>
          </div>
          <p className="card-text">{deck.description}</p>

          <div className="d-flex justify-content-between mt-3 align-items-center">
            <div className="d-flex">
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                <RiEyeLine />
                View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mr-2"
              >
                <RiBookLine />
                Study
              </Link>
            </div>
            <div>
              <button 
              onClick={handleTrashClick}
              className="btn btn-danger">
                <RiDeleteBin6Line />
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeckDetail;
