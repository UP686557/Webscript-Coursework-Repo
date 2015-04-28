// Get dynamic article
basketArticle = document.getElementById("dynamicArticle");

function displayCheckout(){
  // Set id of the article for CSS
  basketArticle.setAttribute("id", "checkout");
  // Set the article to contain nothing
  basketArticle.innerHTML = "";
  // Add elemnt for details
  detailsSection = document.createElement("section");
  detailsSection.setAttribute("id", "details")
  basketArticle.appendChild(detailsSection);

  // Set title
  title.innerHTML = "Company Name | Checkout";

  // Set the inputs for detail entry
  string = '<form id="addCustomerForm">' +
            '<h1>Personal Details</h1>' +
            '<label>First Name*</label><input id="firstName" type="text" name="firstName" required autofocus>' +
            '<label>Surname*</label><input id="surname" type="text" name="surname" required>' +
            '<label>Email Address*</label><input id="email" type="email" name="email" required>' +
            '<label>Phone Number*</label><input id="phoneNumber" type="tel" name="phoneNumber" required>' +
            '<h1>Delivery Address Details</h1>' +
            '<label>Address*</label><input id="address" type="text" name="address" required>' +
            '<label>Town*</label><input id="town" type="text" name="town" required>' +
            '<label>County*</label><input id="county" type="text" name="county" required>' +
            '<label>Post Code*</label><input id="postCode" type="text" name="postCode" required>' +
            '</form>' +
            '<button id="paymentButton">Proceed to Payment</button>';
  // Display input values
  detailsSection.innerHTML = string;

  // Add event for payment button
  paymentButton = document.getElementById('paymentButton');
  paymentButton.addEventListener('click', paymentPage);
  // Display basket summary
  miniBasket();

  // Get new request
  xmlhttp = new XMLHttpRequest();
  // Get elements for input
  firstName = document.getElementById("firstName");
  surname = document.getElementById("surname");
  email = document.getElementById("email");
  phoneNumber = document.getElementById("phoneNumber");
  address = document.getElementById("address");
  town = document.getElementById("town");
  county = document.getElementById("county");
  postCode = document.getElementById("postCode");

  // If customer visted before, add details into the fields
  customer = localStorage.getItem('customer');
  jsonCustomer = JSON.parse(customer);
  if(customer){
    firstName.value = jsonCustomer.FirstName;
    surname.value = jsonCustomer.Surname;
    email.value = jsonCustomer.Email;
    phoneNumber.value = jsonCustomer.PhoneNumber;
    address.value = jsonCustomer.Address;
    town.value = jsonCustomer.Town;
    county.value = jsonCustomer.County;
    postCode.value = jsonCustomer.PostCode;
  }
}


function paymentPage(){
  // Set title
  title.innerHTML = "Company Name | Payment";

  // If values filled in, execute
  if(firstName.value!="" && surname.value!="" && email.value!="" && phoneNumber.value!="" && address.value!="" && town.value!="" && postCode.value!=""){
    // Set customer details object
    customerDetails = {FirstName:firstName.value, Surname:surname.value, Email:email.value, PhoneNumber:phoneNumber.value, Address:address.value, Town:town.value, County:county.value, PostCode: postCode.value};
    // Add customer to local storage for further use
    localStorage.setItem("customer", JSON.stringify(customerDetails));

    // Set input for payment
    string = '<form>' +
              '<h1>Payment</h1>' +
              '<label>Card Holder Name*</label><input type="text" required autofocus>' +
              '<label>Card Number*</label><input type="date" required>' +
              '<label>Expiry Date* MM/YYYY</label><input type="month" required>' +
              '<label>Security Code*</label><input type="text" required>' +
              '</form>' +
              '<button id="confirmPayment">Confirm</button>';
    // Display payment input
    detailsSection.innerHTML = string;

    // Add event click to payment button
    confirmPayment = document.getElementById("confirmPayment");
    confirmPayment.addEventListener('click', function(){
      basketStorage = localStorage.getItem("basket");
      jsonBasket = JSON.parse(basketStorage);

      // Subtract value from the basket
      for(var prop in jsonBasket){
        if(jsonBasket.hasOwnProperty(prop)){
          jsonBasket[prop].Quantity = jsonBasket[prop].Quantity - jsonBasket[prop].quantity;
        }
        // Set the basket
        localStorage.setItem("basket", JSON.stringify(jsonBasket));
        // Display message
        basketArticle.innerHTML = "Thank you for your purchase!";
      }
    });


    confirmPayment.addEventListener('click', function(){
      addCustomer();
      basketArticle = document.getElementById("checkout");
      basketArticle.setAttribute("id", "dynamicArticle");
      localStorage.removeItem("basket");
      updateBasketNumber();
    });

    // Set state obejct
    var stateObject = {Content : basketArticle.innerHTML, Title: title.innerHTML};

    // Push state to history
    window.history.pushState(stateObject, "", "Payment");

    // Update content
    window.addEventListener('popstate', function(event) {
      updateContent(event.state);
    });
  }
  else{
    // If fields not entered, display error message
    Alert.render("Enter Fields", "Please enter values into the provided textboxes fields.");
  }

}

function miniBasket(){
  // Get basket
  var basketStorage = localStorage.getItem("basket");
  // Parse basket
  jsonBasket = JSON.parse(basketStorage);
  // Initiate total price
  totalPrice = 0;

  // Create basket summary section
  miniBasketSection = document.createElement("section");
  miniBasketSection.setAttribute("id", "miniBasket");
  basketArticle.appendChild(miniBasketSection);

  // Set heading
  string = '<h1 id="basketSummaryHeading">Basket Summary</h1>';
  // Display each item in the basket
  for(var i in jsonBasket){
    quantityPrice = JSON.parse(jsonBasket[i].Price) * JSON.parse(jsonBasket[i].quantity);
    string += "<section class='miniBasketItem'><p class='checkoutPhoto'><img src='" + jsonBasket[i].Photo + "'></p><section class='miniBasketDetails'><p class='checkoutName'>Product: " + jsonBasket[i].Name + "</p><p>Price: £" + parseFloat(jsonBasket[i].Price).toFixed(2) + "</p><p>Quantity: " + jsonBasket[i].quantity + "</p><p>Sub Total: £" + parseFloat(quantityPrice).toFixed(2) + "</p></section></section>";
    totalPrice += quantityPrice;
  }

  // Display basket summary
  miniBasketSection.innerHTML = string + "<p id='miniBasketTotal'>Total: £" + parseFloat(totalPrice).toFixed(2) + "</p><p><button id='editMiniBasket'>Edit</button></p>";

  // If button clicked take to basket to edit
  editMiniBasket = document.getElementById("editMiniBasket");
  editMiniBasket.addEventListener("click", function(){
    basketArticle = document.getElementById("checkout");
    basketArticle.setAttribute("id", "dynamicArticle");
    displayBasket();
  });

  // Set state object
  var stateObj = {Content : basketArticle.innerHTML, Basket : jsonBasket, Title :title.innerHTML, Section : "checkout"};
  // Push state to history
  window.history.pushState(stateObj, "", "Checkout");

  // Update content if browser history buttons used
  window.addEventListener('popstate', function(event) {
    updateContent(event.state);
  });
}
