"strict mode";

var fireBasketEvent = function(detail, quantity) {
	// the quantity is added to the basket
	detail.quantity = quantity;
	document.dispatchEvent(new CustomEvent('basket', {detail: detail}));
};

var addToBasket = function(e) {
	// get the value in the quantity field
	quantity = document.getElementById('productQuantity').value;
	if(quantity > 0){
		// fire function with details of the product and the quantity entered.
		fireBasketEvent(JSON.parse(e.currentTarget.dataset.detail), JSON.parse(quantity));
		// alert to the user what has been entered
		Alert.render("Added To Basket", "<p>Product: " + detail.Name + "</p><p>Quantity: " + quantity + "</p>");
	}
	updateBasketNumber();
}
