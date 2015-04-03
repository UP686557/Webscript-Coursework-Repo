basketArticle = document.getElementById("homeSection");

function displayBasket(){
  basketArticle.innerHTML = "";
  var basketStorage = localStorage.getItem("basket"); //This is in json format as a string so you need to parse it
  jsonBasket = JSON.parse(basketStorage); //This is the parsed string as objects
                                          //Gives you one basket object with three fruit objects inside
  heading = document.createElement("h2");
  basketArticle.appendChild(heading);



  var totalItems = 0;
  var totalPrice = 0;
  for (var prop in jsonBasket){   //for looping through the items in the overall basket object
    if(jsonBasket.hasOwnProperty(prop)){ //prop will be each individual fruit object throughtout the loop. This checks if the object inside the main basket object has it's own individual properties
      quantityPrice = JSON.parse(jsonBasket[prop].Price) * JSON.parse(jsonBasket[prop].quantity);

      section = document.createElement("section");
      section.classList.add("basketItem");
      basketArticle.appendChild(section);
      section.innerHTML = "<p class='photo'><img src='" + jsonBasket[prop].Photo + "'></p><p class='itemName'>" + jsonBasket[prop].Name + "</p><p>Price: £" + parseFloat(jsonBasket[prop].Price).toFixed(2) + "</p><p>Quantity: <input class='basketQuantity' type='number' value='" + jsonBasket[prop].quantity + "'></p><p>Sub Total: £" + parseFloat(quantityPrice).toFixed(2) + "</p>";

      removeButton = document.createElement("button");
      removeButton.dataset.name = jsonBasket[prop].Name;
      removeButton.classList.add("removeItem");
      section.appendChild(removeButton);
      removeButton.innerHTML = "X";

      totalItems += JSON.parse(jsonBasket[prop].quantity);
      totalPrice += quantityPrice;
    }
  }

  heading.innerHTML = "Basket: " + totalItems;
  if(totalItems == 0){
    basketSection = document.createElement("p");
    basketArticle.appendChild(basketSection);
    basketSection.innerHTML = "You have no items in your basket";
    updateBasketNumber();
  }

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
        localStorage.clear();
        updateBasketNumber();
        displayBasket();
      });
    }

  setDeleteButtons();
}


function editQuantity(){
  quantityInputs = document.querySelectorAll(".basketQuantity");
  for(i=0; i<quantityInputs.length; i++){
    quantityInputs[i].addEventListener('change', function(){
      alert("number input changed");
    });
  }
}


function setDeleteButtons(){
  removeButtons = document.querySelectorAll(".removeItem");
  var basketStorage = localStorage.getItem("basket");
  jsonBasket = JSON.parse(basketStorage);

  for(i=0; i<removeButtons.length; i++){
    removeButtons[i].addEventListener("click", function (e) {
        delete jsonBasket[e.currentTarget.dataset.name];
        localStorage.setItem("basket", JSON.stringify(jsonBasket));
        displayBasket();
        updateBasketNumber();
      });
    }
    updateBasketNumber();
  }


function updateBasketNumber(){
  var basketStorage = localStorage.getItem("basket"); //This is in json format as a string so you need to parse it
  jsonBasket = JSON.parse(basketStorage);
  var totalItems = 0;

  for (var i in jsonBasket){
    totalItems += JSON.parse(jsonBasket[i].quantity);
  }

  basketIcon = document.getElementById("numItems");
  basketIcon.innerHTML = totalItems;
}


//window.addEventListener("load", displayBasket); //function onload event.
displayBasket();
