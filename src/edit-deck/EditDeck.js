import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getAllDecks() {
      const deckData = await readDeck(deckId);
      setDeckName(deckData.name);
      setDeckDescription(deckData.description);
    }

    getAllDecks();
  }, [deckId]);

  const handleNameChange = (e) => {
    setDeckName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDeckDescription(e.target.value);
  };

  const handleEditDeckSubmit = (event) => {
    event.preventDefault();
    updateDeck({
      id: deckId,
      name: deckName,
      description: deckDescription,
    }).then((updatedDeck) => history.push(`/decks/${updatedDeck.id}`));
  };

  return (
    <div>
      <h2>Edit Deck</h2>
        <form onSubmit={handleEditDeckSubmit}>
            <div className="form-group">
                <label htmlFor="deckName">
                    Name
                </label>
                <input
                id="deckName"
                type="text"
                name="deckName"
                className="form-control"
                onChange={handleNameChange}
                value={deckName}>
                </input>
            </div>
            <div className="form-group">
                <label htmlFor="deckDescription">
                    Description
                </label>
                <textarea
                id="deckDescription"
                name="deckDescription"
                className="form-control"
                rows="5"
                onChange={handleDescriptionChange}
                value={deckDescription}
                />
            </div>
            <button type="button" className="btn btn-dark mr-2" onClick={()=> history.push(`/decks/${deckId}`)}>Cancel</button>
            <button type="submit" className="btn btn-success">
                Submit
            </button>

        </form>
    </div>
  );
}
export default EditDeck;
