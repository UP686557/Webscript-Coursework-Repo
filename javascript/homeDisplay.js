var homeSection = document.getElementById('homeSection');

function loadItems(){
  var xmlhttp = getXmlHttpRequestObject();
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


searchButton = document.getElementById("searchButton");
searchBox = document.getElementById('searchBox');

searchButton.addEventListener("click", searchItem);



function searchItem(e){
  e.preventDefault();
  searchString = searchBox.value;
  article = document.getElementById("homeSection");
  article.innerHTML = '<p>You searched for: "' + searchString + '"</p>';
  var xmlhttp = getXmlHttpRequestObject();
  var string = '';
  if(xmlhttp){
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var response = JSON.parse(xmlhttp.responseText);
        for(var i=0; i<response.length; i++){
          var price = parseFloat(response[i].Price);
          var section = document.createElement("section");
          section.classList.add("searchResult");
          section.dataset.detail = JSON.stringify(response[i]);
          article.appendChild(section);
          section.innerHTML += '<p class="photo"><img src="' + response[i].Photo + '"></p><section><h1 class="name">' + response[i].Name + '</h1><p class="price">£' + price.toFixed(2) + '</p><p class="description">' + response[i].Description + '</p><p class="productID">ID: ' + response[i].ID + '</p><p class="quantity">Quantity: ' + response[i].Quantity + '</p></section>';

        }
        var items = document.querySelectorAll(".searchResult");
        for(i=0; i<items.length; i++){
          items[i].addEventListener("click", selectedProduct);
        }
      }
    };
    xmlhttp.open("POST", "search.php?search=" + searchString, false);
    xmlhttp.send(null);
  }
}




function selectedProduct(event){
  target = event.currentTarget;
  homeSection = document.getElementById("homeSection");
  homeSection.innerHTML = "";
  detail = JSON.parse(target.dataset.detail);
  var price = parseFloat(detail.Price);
  var section = document.createElement("section");

  var basketButton = document.createElement("button");
  basketButton.dataset.detail = JSON.stringify(detail);
  basketButton.setAttribute("id","basketButton");
  section.classList.add("productAttributes");
  homeSection.appendChild(section);
  section.innerHTML = "<a href='../'>back</a><p class='photo'><img class='productPhoto' src='" + detail.Photo + "'></p><h1>" + detail.Name + "</h1><p>£" + price.toFixed(2) + "</p><p>" + detail.Description + "</p><p>ID: " + detail.ID + "</p>";
  section.appendChild(basketButton);
  basketButton.innerHTML = "Add to Basket";
  basketButtonFunc(detail);
}

window.addEventListener("load", function(){
    updateBasketNumber();
  });
window.addEventListener("load", loadItems);
