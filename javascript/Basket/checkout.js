basketArticle = document.getElementById("dynamicArticle");

function displayCheckout(){
  basketArticle.setAttribute("id", "checkout");
  basketArticle.innerHTML = "";
  detailsSection = document.createElement("section");
  detailsSection.setAttribute("id", "details")
  basketArticle.appendChild(detailsSection);


  string = '<form id="addCustomerForm">' +
            '<h1>Personal Details</h1>' +
            '<label>First Name*</label><input id="firstName" type="text" name="firstName">' +
            '<label>Surname*</label><input id="surname" type="text" name="surname">' +
            '<label>Email Address*</label><input id="email" type="email" name="email">' +
            '<label>Phone Number*</label><input id="phoneNumber" type="text" name="phoneNumber">' +
            '<h1>Address Details</h1>' +
            '<label>Address*</label><input id="address" type="text" name="address">' +
            '<label>Town*</label><input id="town" type="text" name="town">' +
            '<label>County*</label><input id="county" type="text" name="county">' +
            '<label>Post Code*</label><input id="postCode" type="text" name="postCode">' +
            '</form>' +
            '<button id="paymentButton">Proceed to Payment</button>';
  detailsSection.innerHTML = string;

  paymentButton = document.getElementById('paymentButton');
  paymentButton.addEventListener('click', paymentPage);
  miniBasket();

}

function paymentPage(){
  var xmlhttp = new XMLHttpRequest();
  var firstName = document.getElementById("firstName");
  var surname = document.getElementById("surname");
  var email = document.getElementById("email");
  var phoneNumber = document.getElementById("phoneNumber");
  var address = document.getElementById("address");
  var town = document.getElementById("town");
  var county = document.getElementById("county");
  var postCode = document.getElementById("postCode");
  if(firstName.value!="" && surname.value!="" && email.value!="" && phoneNumber.value!="" && address.value!="" && town.value!="" && postCode.value!=""){
    customerDetails = {FirstName:firstName.value, Surname:surname.value, Email:email.value, PhoneNumber:phoneNumber.value, Address:address.value, Town:town.value, County:county.value, PostCode: postCode.value};
    localStorage.setItem("customer", JSON.stringify(customerDetails));

    string = '<form>' +
              '<h1>Payment</h1>' +
              '<label>Card Holder Name*</label><input type="text">' +
              '<label>Card Number*</label><input type="date">' +
              '<label>Expiry Date*</label><input type="date">' +
              '<label>Security Code*</label><input type="text">' +
              '</form>' +
              '<button id="confirmPayment">Confirm</button>';
    detailsSection.innerHTML = string;


    var stateObject = {Content : basketArticle.innerHTML, Title:title.innerHTML};
    updateContent(stateObject);
    window.history.pushState(stateObject, "", "Payment");
  }
  else{
    Alert.render("Enter Fields", "Please enter values into the provided textboxes fields.");
  }

}

function miniBasket(){
  var basketStorage = localStorage.getItem("basket"); //This is in json format as a string so you need to parse it
  jsonBasket = JSON.parse(basketStorage);
  var totalPrice = 0;


  miniBasketSection = document.createElement("section");
  miniBasketSection.setAttribute("id", "miniBasket");
  basketArticle.appendChild(miniBasketSection);

  string = '<h1 id="basketSummaryHeading">Basket Summary</h1>';
  for(var i in jsonBasket){
    quantityPrice = JSON.parse(jsonBasket[i].Price) * JSON.parse(jsonBasket[i].quantity);
    string += "<section class='miniBasketItem'><p class='checkoutPhoto'><img src='" + jsonBasket[i].Photo + "'></p><section class='miniBasketDetails'><p class='checkoutName'>Product: " + jsonBasket[i].Name + "</p><p>Price: £" + parseFloat(jsonBasket[i].Price).toFixed(2) + "</p><p>Quantity: " + jsonBasket[i].quantity + "</p><p>Sub Total: £" + parseFloat(quantityPrice).toFixed(2) + "</p></section></section>";
    totalPrice += quantityPrice;
  }

  miniBasketSection.innerHTML = string + "<p id='miniBasketTotal'>Total: £" + parseFloat(totalPrice).toFixed(2) + "</p><p><button id='editMiniBasket'>Edit</button></p>";

  editMiniBasket = document.getElementById("editMiniBasket");
  editMiniBasket.addEventListener("click", function(){
    basketArticle.setAttribute("id", "dynamicArticle");
    displayBasket();
  });

  var stateObj = {Content : basketArticle.innerHTML, Basket : jsonBasket, Title : title.innerHTML};
  window.history.pushState(stateObj, "", "Checkout");

  window.addEventListener('popstate', function(event) {
    basketArticle.setAttribute("id", "dynamicArticle");
    updateContent(event.state);
  });
}
