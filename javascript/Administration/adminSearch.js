

function adminSearch(){
  var str = escape(document.getElementById('adminSearchBox').value);
  var search = new XMLHttpRequest();
  if(str != ''){
    if(search){
      search.onreadystatechange = function(){
        if(search.readyState === 4 && search.status === 200){
          displayAdminSuggestions(JSON.parse(search.responseText));
        }
      };
      search.open("GET", '../searchSuggest.php?search=' + str, true);
      search.send(null);
    }
  }
  else{
    display();
  }
}


function displayAdminSuggestions(results){
  var tableArea = document.getElementById("products");

  string = '<table><tr><th>ID</th><th>Name</th><th>Description</th><th>Quantity</th><th>Price</th></tr>';
  searchBox = document.getElementById("adminSearchBox");
  console.log(results.length);
  if (results.length != 0) {
    for(var i=0; i<results.length; i++){
      var price = parseFloat(results[i].Price);
      if(i % 2 == 0){
        string += "<tr>" +
                    "<td>" + results[i].ID + "</td>" +
                    "<td>" + results[i].Name + "</td>" +
                    "<td>" + results[i].Description + "</td>" +
                    "<td>" + results[i].Quantity + "</td>" +
                    "<td>£" + price.toFixed(2) + "</td>" +
                  "<tr>";
      }
      else{
        string += "<tr>" +
                    "<td class='tableAltColour'>" + results[i].ID + "</td>" +
                    "<td class='tableAltColour'>" + results[i].Name + "</td>" +
                    "<td class='tableAltColour'>" + results[i].Description + "</td>" +
                    "<td class='tableAltColour'>" + results[i].Quantity + "</td>" +
                    "<td class='tableAltColour'>£" + price.toFixed(2) + "</td>" +
                  "<tr>";
      }
    }
  }
  else{
    string = '<p>no matches found</p>';
  }
    tableArea.innerHTML = string;
  }


adminSearchBox = document.getElementById("adminSearchBox");
adminSearchBox.addEventListener('keyup', adminSearch);
