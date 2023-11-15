import React from "react";
import Header from "./Header";
// import NotFound from "./NotFound";
import Home from "../home/Home";
import { Switch, Route } from "react-router-dom";
import Study from "../study/Study";
import DeckScreen from "../deck/DeckScreen";
import CreateDeckForm from "../new-deck/CreateDeckForm";
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
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeckForm />
          </Route>
          <Route path="/decks/:deckId">
            <DeckScreen />
          </Route>

          {/* <NotFound /> */}
        </Switch>
      </div>
    </>
  );
}

export default Layout;
