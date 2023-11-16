import React from "react";
import { Link } from "react-router-dom";
import DeckList from "../deck/DeckList";
import "./Home.css";

function Home() {
  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary btn-lg">
        + Create Deck
      </Link>

      <DeckList />
    </div>
  );
}

export default Home;
