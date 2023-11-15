import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { listDecks } from "../utils/api/index";
import DeckList from "../deck/DeckList";
import "./Home.css";
import DeckScreen from "../deck/DeckScreen";

function Home() {
  // const [decks, setDecks] = useState([]);

  // useEffect(() => {
  //   async function getAllDecks() {
  //     const data = await listDecks();
  //     setDecks(data);
  //   }
  //   getAllDecks();
  // }, []);

  return (
    <div>
      <Link to="/create-deck" className="btn btn-secondary btn-lg">
         + Create Deck
      </Link>

      <DeckList  />
     
      
      
    </div>
  );
}

export default Home;
