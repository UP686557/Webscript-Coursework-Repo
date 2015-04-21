// Creates display on the index page

function loadItems(event){
  // Get new XMLHttpRequest
  var xmlhttp = new XMLHttpRequest();

  if(xmlhttp){
    // if ready execute
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        // Execute displayItems with the server response as a perameter
        displayItems(JSON.parse(xmlhttp.responseText));
      }
    };
    // Execute code in "homeDisplay.php"
    xmlhttp.open("GET", "../homeDisplay.php", true);
    xmlhttp.send(null);
  }

}

function displayItems(results){
  var homeSection = document.getElementById('dynamicArticle');
  // Set the heading
  homeSection.innerHTML = '<h1>Why not try these products?</h1>';
  // For each of the items returned by the server display them in a section
  for(var i=0; i<results.length; i++){
    var price = parseFloat(results[i].Price).toFixed(2);
    var sec = document.createElement("section");
    sec.classList.add("homeItem");
    sec.dataset.detail = JSON.stringify(results[i]);
    homeSection.appendChild(sec);
    sec.innerHTML = '<div class="imageContainer"><img class="resultsImage" alt="Image of' + results[i].Name '" src="' + results[i].Photo + '"></div><p class="resultsName">' + results[i].Name + '</p><p class="resultsPrice">£' + price + '</p>';

  }
  // Set the title and state object
  title = document.getElementById("title");
  var stateObject = {Content: homeSection.innerHTML, Title : title.innerHTML, Section:"dynamicArticle"};

  // Push state to the history
  window.history.pushState(stateObject, "Home", '');

  // update the content
  updateContent(stateObject);

}





function selectedProduct(event){
  // Get the article used for AJAX
  var homeSection = document.getElementById('dynamicArticle');
  // Get the target that was clicked
  target = event.currentTarget;
  // Set the dynamic article to be nothing
  homeSection.innerHTML = "";

  // detail is the attributes of the clicked target stored as a detail
  detail = JSON.parse(target.dataset.detail);
  var price = parseFloat(detail.Price);
  var section = document.createElement("section");

  // create and add a button to be able to add the product to the basket
  var newBasketButton = document.createElement("button");
  newBasketButton.dataset.detail = JSON.stringify(detail);
  newBasketButton.setAttribute("id","basketButton");
  section.classList.add("productAttributes");
  homeSection.appendChild(section);

  // Display the product attributes
  section.innerHTML = "<p class='photo'><img alt='Image of" + results[i].Name "' class='productPhoto' src='" + detail.Photo + "'></p><section id='singleProductDetails'><h1>" + detail.Name + "</h1><p id='singleProductPrice'>£" + price.toFixed(2) + "</p><p>" + detail.Description + "</p></section>";
  newBasketButton.innerHTML = "Add to Basket";

  // Add an input for the quantity of the product
  var quantityInput = document.createElement('input');
  quantityInput.type = "number";
  quantityInput.value = "1";
  quantityInput.setAttribute("id", "productQuantity");

  var singleDetails = document.getElementById("singleProductDetails");

  // Create a paragraph element to display out of stock if there is none
  noStock = document.createElement("p");
  noStock.setAttribute("id", "outOfStock");

  // If there is no stock in the database execute
  if(detail.Quantity !="0"){
    // Create div element for adding a product
    var add = document.createElement("div");
    singleDetails.appendChild(add);
    add.appendChild(quantityInput);
    add.appendChild(newBasketButton);

    // Create a paragraph to show the subtotal
    var subTotal = document.createElement('p');
    subTotal.setAttribute("id", "subTotal");
    singleDetails.appendChild(subTotal);
    subTotal.innerHTML = "Sub Total: £" + price.toFixed(2);

    // If the user tries to enter a number which is 0 or less than 0, change it to 1
    quantityInput.addEventListener("change", function(){
      if(this.value <= "0"){
        // Changes the value of the input box to 1 if it is 0 or less.
        this.value = 1;
      }
      // Display the subtotal
      subTotal.innerHTML = "Sub Total: £" + parseFloat(quantityInput.value * price).toFixed(2);
    });
  }
  else{
    // If there is no stock, add a paragraph and dislpay a message
    singleDetails.appendChild(noStock);
    noStock.innerHTML = "Out of Stock";
  }

  // Get and set the title to the name of the product clicked
  title = document.getElementById("title");
  title.innerHTML = "Company Name | " + detail.Name;

  // Get the button to add item to the basket
  basketButton = document.getElementById("basketButton");

  // If the basketButton exists add event
  if(basketButton){
    basketButton.addEventListener('click', addToBasket);
  }

  // Split the name of the product where there is a space and join it with nothing so use in the state object
  detailName = detail.Name.split(' ').join('');
  // Set state object and push it to the history
  var stateObj = {Content : homeSection.innerHTML, "Product" : detail.Name, Title : title.innerHTML, Section:"dynamicArticle"};
  window.history.pushState(stateObj, "", detailName);

  // Update content if the history buttons are used
  window.addEventListener('popstate', function(event) {
    updateContent(event.state);
  });
}

// Function to update the ontents of a page when the browser forward and back buttons are used
function updateContent(stateObject) {
  // If the state object exists execute the following code
  if (stateObject){
    // Get the id of the section to fit in with CSS
    homeSection = document.getElementById(stateObject.Section);
    // Set the content to that of the state object
    homeSection.innerHTML = stateObject.Content;
    // Set the title
    title.innerHTML = stateObject.Title;


    var items = document.querySelectorAll(".homeItem");
    // If the homeItems exist then add an event listener to display the single item in more detail on click
    if(items){
      for(i=0; i<items.length; i++){
        items[i].addEventListener("click", selectedProduct);
      }
    }


    checkoutButton = document.getElementById('checkoutButton');
    // If there is a checkout button, add an event listener to display the checkout on click
    if(checkoutButton){
      checkoutButton.addEventListener('click', function(){
          displayCheckout();
        });
    }

    basketButton = document.getElementById("basketButton");
    quantityInput = document.getElementById("productQuantity");
    // If there is a checkout button, add an event listener to display the basket on click
    if(basketButton){
      basketButton.addEventListener('click', clicked);
      // Set the value of the quantity input to 1
      quantityInput.value = "1";
    }

    searchSort = document.getElementById("sort");
    // If the sorting option exists then add an event listener to each item on the serch page to display in detail on click
    // Also add event listener to allow the sorting to take place
    if(searchSort){
      var items = document.querySelectorAll(".searchResult");
      for(i=0; i<items.length; i++){
        items[i].addEventListener("click", selectedProduct);
      }

      searchSort.addEventListener("change", function(){
        sort = searchSort.value;
        searchItem(e, sort);
      });
    }
  }
  else{
    return;
  }
}


// On load display the items for the home page and update the basket number
window.addEventListener("load", function(){
    updateBasketNumber();
    loadItems();
  });
