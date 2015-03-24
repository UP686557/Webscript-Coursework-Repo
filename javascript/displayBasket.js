basketArticle = document.getElementById("basketArticle");

function displayBasket(){
  string = "";
  var basketStorage = localStorage.getItem("basket"); //This is in json format as a string so you need to parse it
  jsonBasket = JSON.parse(basketStorage); //This is the parsed string as objects
                                          //Gives you one basket object with three fruit objects inside
  heading = document.createElement("h2");
  basketArticle.appendChild(heading);

  basketSection = document.createElement("section");
  basketSection.classList.add("basketPage");
  basketArticle.appendChild(basketSection);

  var totalItems = 0;
  var totalPrice = 0;
  for (var prop in jsonBasket){   //for looping through the items in the overall basket object
    if(jsonBasket.hasOwnProperty(prop)){ //prop will be each individual fruit object throughtout the loop. This checks if the object inside the main basket object has it's own individual properties
      quantityPrice = JSON.parse(jsonBasket[prop].Price) * JSON.parse(jsonBasket[prop].quantity);
      string += "<section class='basketItem'>";
      string += "<p><img src='" + jsonBasket[prop].Photo + "'></p>";
      string += "<p>Item: " + jsonBasket[prop].Name + "</p>"; //name is the "name" part of the fruit objects
      string += "<p>Price: £" + parseFloat(jsonBasket[prop].Price).toFixed(2) + "</p>"; //cost is the "cost" part
      string += "<p>Quantity: " + jsonBasket[prop].quantity + "</p>"; //quantity is the "quantity" part. These three things must match the object attributes otherwise it wont find them.
      string += "<p>Quantity Price: £" + parseFloat(quantityPrice).toFixed(2) + "</p>";
      string += "</section>"
      totalItems ++;
      totalPrice += quantityPrice;
    }
  }
  heading.innerHTML = "Basket: " + totalItems;

  string += "<p>Total Price: £" + parseFloat(totalPrice).toFixed(2) + "</p>";
  string += "<button id=clearBasket>Clear All Items</button>";
  basketSection.innerHTML = string; //changing the html on the page

  updateBasketNumber();

  var clearButton = document.getElementById("clearBasket");
  clearButton.addEventListener('click', function(){
    localStorage.clear();
  });
}

window.addEventListener("load", displayBasket); //function onload event.
