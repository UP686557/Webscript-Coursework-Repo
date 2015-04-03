var countItems = function (e) {
  var basket = localStorage.getItem("basket");

  // if a basket was retrieved decode it,
  // if not create an empty one
  basket = basket ? JSON.parse(basket) : {};

  var current = basket[e.detail.Name];
  if (current) {
    // the entry exists, so add the quantity to it
    current["quantity"] += e.detail.quantity;
  } else {
    // it's a new entry so just use the detail object
    current = e.detail;
    basket[e.detail.Name] = current;
  }

  // store it for later
  localStorage.setItem("basket", JSON.stringify(basket));

};

document.addEventListener('basket', countItems);
