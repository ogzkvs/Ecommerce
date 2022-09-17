const { createSelector } = require("@reduxjs/toolkit");

const cartSelector = (state) => state.basket;

export const cartTotalSelector = createSelector([cartSelector], (basket) =>
  basket.reduce((total, current) => (total += current.quantity), 0)
);

export const cartTotalPriceSelector = createSelector([cartSelector], (basket) =>
  basket.reduce(
    (total, current) => (total += current.price * current.quantity),
    0
  )
);
