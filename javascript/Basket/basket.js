// Displays the basket when the basket icon is clicked
function displayBasket(){
  basketArticle = document.getElementById("dynamicArticle");

  // set the article to contain nothing allowing it to be filled with new data
  basketArticle.innerHTML = "";
  basketStorage = localStorage.getItem("basket"); //This is in json format as a string so you need to parse it
  jsonBasket = JSON.parse(basketStorage); //This is the parsed basket as objects

  // create a heading and add to the article
  heading = document.createElement("h2");
  heading.setAttribute("id", "basketHeading");
  basketArticle.appendChild(heading);

  // set the title
  title.innerHTML = "Company Name | Basket";

  //initiate counter variables
  totalItems = 0;
  totalPrice = 0;
  for (var prop in jsonBasket){   //for looping through the items in the overall basket object
    if(jsonBasket.hasOwnProperty(prop)){ //prop will be each individual object throughtout the loop. This checks if the object inside the main basket object has it's own individual properties
      // calculate the subtotal of the amount of one product
      quantityPrice = JSON.parse(jsonBasket[prop].Price) * JSON.parse(jsonBasket[prop].quantity);

      // create a section for each item in the basket
      section = document.createElement("section");
      section.classList.add("basketItem");
      basketArticle.appendChild(section);
      // display the details of each item in the basket
      section.innerHTML = "<p class='photo'><img src='" + jsonBasket[prop].Photo + "'></p><p class='itemName'>" + jsonBasket[prop].Name + "</p><p class='basketPrice'>Price: £" + parseFloat(jsonBasket[prop].Price).toFixed(2) + "</p><p class='quantityPara'>Quantity: <input class='basketQuantity' type='number' value='" + jsonBasket[prop].quantity + "' data-name='" + jsonBasket[prop].Name + "'></p><p class='basketSubTotal'>Sub Total: £" + parseFloat(quantityPrice).toFixed(2) + "</p>";

      // Sets the remove button to remove a single item
      removeButton = document.createElement("button");
      removeButton.dataset.name = jsonBasket[prop].Name;
      removeButton.classList.add("removeItem");
      section.appendChild(removeButton);
      removeButton.innerHTML = "X";

      // Adds the quantity from the basket to a total which is displayed in the basket heading
      totalItems += JSON.parse(jsonBasket[prop].quantity);
      // Adds the prices up to retrieve the total price
      totalPrice += quantityPrice;
    }
  }

  // Sets the heading with the number of items in the basket
  heading.innerHTML = "Basket: " + totalItems;

  // If the total number of items is 0 set the message accordingly
  if(totalItems == 0){
    basketSection = document.createElement("p");
    basketArticle.appendChild(basketSection);
    basketSection.innerHTML = "You have no items in your basket";
    updateBasketNumber();
  }

  // Otherwise add total price, and the buttons to clear the basket along with the checkout button.
  else{
    displayCost = document.createElement("p");
    displayCost.setAttribute("id", "totalPrice");
    displayCost.innerHTML = "Total Price: £" + parseFloat(totalPrice).toFixed(2);
    basketArticle.appendChild(displayCost);

    clearButton = document.createElement("button");
    clearButton.setAttribute("id", "clearBasket");
    clearButton.innerHTML = "Clear Basket";
    basketArticle.appendChild(clearButton);

    checkoutButton = document.createElement("button");
    checkoutButton.setAttribute("id", "checkoutButton");
    checkoutButton.innerHTML = "Checkout";
    basketArticle.appendChild(checkoutButton);

    checkoutButton.addEventListener('click', function(){
        displayCheckout();
      });

    updateBasketNumber();
    }

  var clearButton = document.getElementById("clearBasket");
  if(clearButton){
    clearButton.addEventListener('click', function(){
      // If button clicked, remove the basket item from local storage
      localStorage.removeItem("basket");
      // Update the page
      updateBasketNumber();
      displayBasket();
    });
  }

  // Set the state object used for the history
  var stateObj = {Content : basketArticle.innerHTML, Basket : jsonBasket, Title :  title.innerHTML, Section : "dynamicArticle"};
  // Push a new state to the history
  window.history.pushState(stateObj, "", "Basket");

  window.addEventListener('popstate', function(event) {
    // If the browser back or forward buttons used, update the content
    updateContent(event.state);
  });

  // update the page
  updateQuantity();
  setDeleteButtons();
}



function updateQuantity(){
  // Get all the elements for the quantity input and the subtotals
  var quantityInputs = document.querySelectorAll(".basketQuantity");
  var basketSubTotal = document.querySelectorAll(".basketSubTotal");

  // Iterate over the amount of items in the basket
  for(var i=0; i<quantityInputs.length; i++){
    // Get quantity input and subtotal of each product
    input = quantityInputs[i];
    subtotal = basketSubTotal[i];

    // If number input changed execute code
    input.addEventListener('change', function(e){
      if(this.value <= "0"){
        // Alert error message if quantity falls below or equals 0
        Alert.render("Invalid Value", "Please either: <ul><li>Enter a value higher than 0.</li><li>Use the red cross to delete the item from the basket.</li></ul>");
        this.value = 1;
      }
      //gets the basket from local storage (string)
      basketStorage = localStorage.getItem("basket");
      //changes the basket into an object from a string
      jsonBasket = JSON.parse(basketStorage);

      // Change the quantity of the item in the basket to the value of the input box
      jsonBasket[e.currentTarget.dataset.name].quantity = this.value;
      // Set the basket
      localStorage.setItem("basket", JSON.stringify(jsonBasket));
      // Update the page
      displayBasket();
    });
  }
}



function setDeleteButtons(){
  // Get the buttons used to remove items from the basket
  removeButtons = document.querySelectorAll(".removeItem");
  // Get the basket from localStorage
  var basketStorage = localStorage.getItem("basket");
  // Convert the basket into object from a string
  jsonBasket = JSON.parse(basketStorage);

  for(i=0; i<removeButtons.length; i++){
    removeButtons[i].addEventListener("click", function (e) {
        // If a button is clicked remove this item from localstorage
        delete jsonBasket[e.currentTarget.dataset.name];
        // Set the basket
        localStorage.setItem("basket", JSON.stringify(jsonBasket));
        // Update the page
        displayBasket();
      });
    }
  }

// Add a click event to the basket icon in the navigation bar
var loadBasketButton = document.getElementById("basket");
loadBasketButton.addEventListener('click', displayBasket);
