var countItems = function (e) {
  var basket = localStorage.getItem("basket");

  // if a basket was retrieved decde it,
  // if not create an empty one
  basket = basket ? JSON.parse(basket) : {};

  var current = basket[e.detail.name];
  if (current) {
    // the entry exists, so add the quantity to it
    current["quantity"] += e.detail.quantity;
  } else {
    // it's a new entry so just use the detail object
    current = e.detail;
    basket[e.detail.name] = current;
  }

  // store it for later
  localStorage.setItem("basket", JSON.stringify(basket));

  console.log(basket);
};

document.addEventListener('basket', countItems);

//------------------------------CODE I HAVE ADDED------------------------------

basketSection = document.getElementById("basket"); //get the basket event.

function displayBasket(){
  string = "";
  var basketStorage = localStorage.getItem("basket"); //This is in json format as a string so you need to parse it
  jsonBasket = JSON.parse(basketStorage); //This is the parsed string as objects
                                          //Gives you one basket object with three fruit objects inside
  for (var prop in jsonBasket){   //for looping through the items in the overall basket object
    if(jsonBasket.hasOwnProperty(prop)){ //prop will be each individual fruit object throughtout the loop. This checks if the object inside the main basket object has it's own individual properties
      string += "<section>";
      string += "<p><img src='" + jsonBasket[prop].photo + "'></p>";
      string += "<p>Item: " + jsonBasket[prop].name + "</p>"; //name is the "name" part of the fruit objects
      string += "<p>Price: " + jsonBasket[prop].price + "</p>"; //cost is the "cost" part
      string += "<p>Quantity: " + jsonBasket[prop].quantity + "</p>"; //quantity is the "quantity" part. These three things must match the object attributes otherwise it wont find them.
      string += "</section>"
    }
  }

  basketSection.innerHTML = string; //changing the html on the page
}

window.addEventListener("load", displayBasket); //function onload event.
