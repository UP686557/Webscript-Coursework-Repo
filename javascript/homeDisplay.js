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
  string = '';
  for(var i=0; i<results.length; i++){
    var price = parseFloat(results[i].Price);
    string += "<section class='homeItem'><div class='imageContainer'><img class='resultsImage' src='" + results[i].Photo + "'></div><p class='resultsName'>" + results[i].Name + "</p><p class='resultsPrice'>£" + price.toFixed(2) + "</p></section>";
  }
  article.innerHTML += string;
}

window.addEventListener("load", loadItems);
