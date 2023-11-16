import React from "react";
import Header from "./Header";

import Home from "../home/Home";
import { Switch, Route } from "react-router-dom";
import Study from "../study/Study";
import DeckScreen from "../deck/DeckScreen";
import CreateDeckForm from "../new-deck/CreateDeckForm";
import NotFound from "./NotFound";
import EditDeck from "../edit-deck/EditDeck";

import AddCardScreen from "../new-cards/AddCardScreen";
import EditCard from "../edit-cards/EditCard";
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          {/* TODO: Implement the screen starting here */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCardScreen />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/new">
            <CreateDeckForm />
          </Route>
          <Route path="/decks/:deckId">
            <DeckScreen />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
