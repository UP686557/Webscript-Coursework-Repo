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

searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function(e){
  searchItem(e);
});


function searchItem(e){
  e.preventDefault();
  searchString = searchBox.value;
  title.innerHTML = "Company Name | " + searchString;
  article = document.getElementById("dynamicArticle");
  article.innerHTML = '<p>You searched for: "' + searchString + '"</p>';
  article.innerHTML += "<p>Sort By: <select><option value='Name'>Name</option><option value='Price'>Price</option></p>";
  var xmlhttp = new XMLHttpRequest();
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
          section.innerHTML += '<p class="searchPhoto"><img src="' + response[i].Photo + '"></p><section class="searchedProductDetails"><h1 class="name">' + response[i].Name + '</h1><p class="price">£' + price.toFixed(2) + '</p><p class="description">' + response[i].Description + '</p><p class="productID">ID: ' + response[i].ID + '</p><p class="quantity">Quantity: ' + response[i].Quantity + '</p></section>';

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

  // var stateObj = {Content : basketArticle.innerHTML, Title : title.innerHTML, Search : searchString};
  // search = searchString.split(' ').join('+');
  // window.history.pushState(stateObj, "", "Search/" + search);
  //
  // window.addEventListener('popstate', function(event) {
  //   updateContent(event.state);
  // });
}
