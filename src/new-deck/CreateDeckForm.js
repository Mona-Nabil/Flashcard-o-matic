import React, { useState } from "react";
import { createDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./CreateDeckForm.css";

function CreateDeckForm() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck({
      name: deckName,
      description: deckDescription,
    });

    history.push(`/decks/${newDeck.id}`);
  };

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <div className="card mt-3">
        <div className="card-body">
          <h2>Create Deck</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Deck Name"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                type="description"
                name="description"
                className="form-control"
                placeholder="Brief description of the deck"
                rows={5}
                value={deckDescription}
                onChange={(e) => setDeckDescription(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content">
            <button type="submit" className="btn btn-primary ml-2">
                Submit
              </button>
              <Link to="/" className="btn btn-secondary ml-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDeckForm;
