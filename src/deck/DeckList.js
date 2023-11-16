import React, { useState, useEffect } from "react";
import DeckDetail from "./DeckDetail";

import { listDecks } from "../utils/api";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function getAllDecks() {
      const data = await listDecks();
      setDecks(data);
    }
    getAllDecks();
  }, []);

  return (
    <div>
      {decks.map((deck) => (
        <div key={deck.id}>
          <DeckDetail deck={deck} />
        </div>
      ))}
    </div>
  );
}

export default DeckList;
