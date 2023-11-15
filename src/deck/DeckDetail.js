import React from "react";
import {
  RiBookLine,
  RiDeleteBin6Line,
  RiEye2Line,
  RiEyeLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

function DeckDetail({ deck }) {
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
              <button className="btn btn-danger">
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
