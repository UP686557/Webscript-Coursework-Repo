"strict mode";

var fireBasketEvent = function(detail, quantity) {
	detail.quantity = quantity;
	document.dispatchEvent(
		new CustomEvent(
			'basket', {
    			detail: detail
			}
		)
	);
};

var clicked = function(e) {
	quantity = document.getElementById('productQuantity').value;
	fireBasketEvent(JSON.parse(e.currentTarget.dataset.detail), JSON.parse(quantity));
	Alert.render("Added To Basket", "<p>Product: " + detail.Name + "</p><p>Quantity: " + quantity + "</p>");
}
