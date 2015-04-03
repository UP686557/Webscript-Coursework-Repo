var homeSection = document.getElementById('homeSection');

function loadItems(){
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
  article = document.getElementById("homeSection");
  string = '<h1>Company Name</h1><h2>Why not try these products?</h2>';
  for(var i=0; i<results.length; i++){
    var price = parseFloat(results[i].Price);
    var sec = document.createElement("section");
    sec.classList.add("homeItem");
    sec.dataset.detail = JSON.stringify(results[i]);
    article.appendChild(sec);
    sec.innerHTML = '<div class="imageContainer"><img class="resultsImage" src="' + results[i].Photo + '"></div><p class="resultsName">' + results[i].Name + '</p><p class="resultsPrice">£' + price.toFixed(2) + '</p>';

  }
  var items = document.querySelectorAll(".homeItem");
  for(i=0; i<items.length; i++){
    items[i].addEventListener("click", selectedProduct);
  }
}

searchBox = document.getElementById('searchBox');


function selectedProduct(event){
  target = event.currentTarget;
  homeSection = document.getElementById("homeSection");
  homeSection.innerHTML = "";
  detail = JSON.parse(target.dataset.detail);
  var price = parseFloat(detail.Price);
  var section = document.createElement("section");

  if(detail.Quantity != "0"){
    var newBasketButton = document.createElement("button");
    newBasketButton.dataset.detail = JSON.stringify(detail);
    newBasketButton.setAttribute("id","basketButton");
    section.classList.add("productAttributes");
    homeSection.appendChild(section);
    section.innerHTML = "<a href='../'>back</a><p class='photo'><img class='productPhoto' src='" + detail.Photo + "'></p><h1>" + detail.Name + "</h1><p>£" + price.toFixed(2) + "</p><p>" + detail.Description + "</p>";
    section.appendChild(newBasketButton);
    newBasketButton.innerHTML = "Add to Basket";

    var quantityInput = document.createElement('input');
    quantityInput.type = "number";
    quantityInput.value = "1";
    quantityInput.setAttribute("id", "productQuantity");
    section.appendChild(quantityInput);


    title = document.getElementById("title");
    title.innerHTML = detail.Name;

    var basketButton = document.getElementById("basketButton");
    basketButton.addEventListener('click', clicked);
    basketButton.addEventListener('click', updateBasketNumber);

  }
  else{
    section.classList.add("productAttributes");
    homeSection.appendChild(section);
    section.innerHTML = "<a href='../'>back</a><p class='photo'><img class='productPhoto' src='" + detail.Photo + "'></p><h1>" + detail.Name + "</h1><p>£" + price.toFixed(2) + "</p><p>" + detail.Description + "</p>";

    title = document.getElementById("title");
    title.innerHTML = detail.Name;

    noStock = document.createElement("p");
    noStock.setAttribute("id", "outOfStock");
    section.appendChild(noStock);
    noStock.innerHTML = "Out of Stock";
  }
}

window.addEventListener("load", function(){
    updateBasketNumber();
  });
window.addEventListener("load", loadItems);
