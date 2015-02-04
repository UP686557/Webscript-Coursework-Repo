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
    string += "<section class='homeItem'><div class='imageContainer'><img class='resultsImage' src='" + results[i].Photo + "'></div><p class='resultsName'>" + results[i].Name + "</p><p class='resultsPrice'>£" + price.toFixed(2) + "</p></section>";
  }
  article.innerHTML += string;
}

searchButton = document.getElementById("searchButton");
searchBox = document.getElementById('searchBox');

searchButton.addEventListener("click", searchItem);

function searchItem(){
  searchString = searchBox.value;
  article = document.getElementById("homeSection");
  var xmlhttp = getXmlHttpRequestObject();
  var string = '';
  if(xmlhttp){
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var response = JSON.parse(xmlhttp.responseText);
        for(var i=0; i<response.length; i++){
          var price = parseFloat(response[i].Price);
          string += '<section class="searchResult">';
          string += '<p class="photo"><img src="' + response[i].Photo + '"></p>';
          string += '<section>';
          string += '<h1 class="name">' + response[i].Name + '</h1>';
          string += '<p class="price">£' + price.toFixed(2) + '</p>';
          string += '<p class="description">' + response[i].Description + '</p>';
          string += '<p class="productID">ID: ' + response[i].ID + '</p>';
          string += '<p class="quantity">Quantity: ' + response[i].Quantity + '</p>';
          string += '</section>';
          string += '</section>';
        }
        article.innerHTML = '<h1>Search</h1><section><h1 class="bottomBorder">You searched for: "' + searchString + '"</h1></section>';
        article.innerHTML += string;
      }
    };
    xmlhttp.open("GET", "search.php?search=" + searchString, false);
    xmlhttp.send(null);
  }
}



window.addEventListener("load", loadItems);
