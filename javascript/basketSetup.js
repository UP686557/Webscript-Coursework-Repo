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
	fireBasketEvent(
		JSON.parse(e.currentTarget.dataset.detail),
		1
	);
	Alert.render("Added To Basket", "<p>Product: " + detail.Name + "</p><p>Quantity: " + detail.quantity + "</p>");

}

function basketButtonFunc(detail){
	var basketButton = document.getElementById("basketButton");
	basketButton.addEventListener('click',clicked
			);
}
