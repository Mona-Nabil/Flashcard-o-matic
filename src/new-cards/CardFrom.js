import React from "react";

function CardFrom({fronOfCard, backOfCard, handleBackOfCardChange, handleFrontOfCardChange, handleAddCardSave}) {
  return (
    <div>
      <form onSubmit={handleAddCardSave}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            
            type="text"
            id="cardFront"
            name="cardFront"
            className="form-control"
            placeholder="Front side of card"
            rows="3"
            value={fronOfCard}
            onChange={handleFrontOfCardChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            id="cardBack"
            type="text"
            name="cardBack"
            className="form-control"
            placeholder="Back side of card"
            value={backOfCard}
            onChange={handleBackOfCardChange}
          />
        </div>
      </form>
    </div>
  );
}
export default CardFrom