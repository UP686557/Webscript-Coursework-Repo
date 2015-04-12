var homeSection = document.getElementById('dynamicArticle');

function loadItems(event){
  var xmlhttp = new XMLHttpRequest();

  if(xmlhttp){
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        displayItems(JSON.parse(xmlhttp.responseText));
      }
    };
    xmlhttp.open("GET", "../homeDisplay.php", true);
    xmlhttp.send(null);
  }

}

function displayItems(results){
  homeSection.innerHTML = '<h1>Why not try these products?</h1>';
  for(var i=0; i<results.length; i++){
    var price = parseFloat(results[i].Price);
    var sec = document.createElement("section");
    sec.classList.add("homeItem");
    sec.dataset.detail = JSON.stringify(results[i]);
    homeSection.appendChild(sec);
    sec.innerHTML = '<div class="imageContainer"><img class="resultsImage" src="' + results[i].Photo + '"></div><p class="resultsName">' + results[i].Name + '</p><p class="resultsPrice">£' + price.toFixed(2) + '</p>';

  }
  title = document.getElementById("title");
  var stateObject = {Content: homeSection.innerHTML, Title : title.innerHTML};
  updateContent(stateObject);
  window.history.pushState(stateObject, "Home", '');

}



searchBox = document.getElementById('searchBox');


function selectedProduct(event){
  target = event.currentTarget;
  homeSection.innerHTML = "";
  detail = JSON.parse(target.dataset.detail);
  var price = parseFloat(detail.Price);
  var section = document.createElement("section");

  var newBasketButton = document.createElement("button");
  newBasketButton.dataset.detail = JSON.stringify(detail);
  newBasketButton.setAttribute("id","basketButton");
  section.classList.add("productAttributes");
  homeSection.appendChild(section);
  section.innerHTML = "<p class='photo'><img class='productPhoto' src='" + detail.Photo + "'></p><section id='singleProductDetails'><h1>" + detail.Name + "</h1><p id='singleProductPrice'>£" + price.toFixed(2) + "</p><p>" + detail.Description + "</p></section>";
  newBasketButton.innerHTML = "Add to Basket";

  var quantityInput = document.createElement('input');
  quantityInput.type = "number";
  quantityInput.value = "1";
  quantityInput.setAttribute("id", "productQuantity");

  var singleDetails = document.getElementById("singleProductDetails");


  noStock = document.createElement("p");
  noStock.setAttribute("id", "outOfStock");

  if(detail.Quantity !="0"){
    var add = document.createElement("div");
    singleDetails.appendChild(add);
    add.appendChild(quantityInput);
    add.appendChild(newBasketButton);

    var subTotal = document.createElement('p');
    subTotal.setAttribute("id", "subTotal");
    singleDetails.appendChild(subTotal);
    subTotal.innerHTML = "Sub Total: £" + price.toFixed(2);

    quantityInput.addEventListener("change", function(){
      subTotal.innerHTML = "Sub Total: £" + parseFloat(quantityInput.value * price).toFixed(2);
    });
  }
  else{
    singleDetails.appendChild(noStock);
    noStock.innerHTML = "Out of Stock";
  }

  title = document.getElementById("title");
  title.innerHTML = detail.Name;

  basketButton = document.getElementById("basketButton");

  if(basketButton){
    basketButton.addEventListener('click', clicked);
    basketButton.addEventListener('click', updateBasketNumber);
  }

  detailName = detail.Name.split(' ').join('');
  var stateObj = {Content : homeSection.innerHTML, "Product" : detail.Name, Title : title.innerHTML};
  window.history.pushState(stateObj, "", detailName);

  window.addEventListener('popstate', function(event) {
    updateContent(event.state);
  });

  var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
  console.log(newURL);

}

function updateContent(stateObject) {
  if (stateObject){
    homeSection.innerHTML = stateObject.Content;
    title.innerHTML = stateObject.Title;

    var items = document.querySelectorAll(".homeItem");
    if(items){
      for(i=0; i<items.length; i++){
        items[i].addEventListener("click", selectedProduct);
      }
    }

    checkoutButton = document.getElementById('checkoutButton');
    if(checkoutButton){
      checkoutButton.addEventListener('click', function(){
          displayCheckout();
        });
    }

    basketButton = document.getElementById("basketButton");
    quantityInput = document.getElementById("productQuantity");
    if(basketButton){
      basketButton.addEventListener('click', clicked);
      basketButton.addEventListener('click', updateBasketNumber);
      quantityInput.value = "1";
    }
  }
  else{
    return;
  }
}



window.addEventListener("load", function(){
    updateBasketNumber();
    loadItems();
  });
