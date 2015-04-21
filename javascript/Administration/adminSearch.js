
//search for a string typed in the admin search box
function adminSearch(){
  //get the value from the search box
  var str = escape(document.getElementById('adminSearchBox').value);
  var search = new XMLHttpRequest();
  if(str != ''){
    if(search){ //if searchbox is present
      search.onreadystatechange = function(){
        if(search.readyState === 4 && search.status === 200){
          //call displayAdminSuggestions function
          displayAdminSuggestions(JSON.parse(search.responseText));
        }
      };
      //send to the specified file
      search.open("GET", '../searchSuggest.php?search=' + str, true);
      search.send(null);
    }
  }
  else{
    //if nothing is entered, display all products
    displayProducts();
  }
}

// displays the results given by the ajax call
function displayAdminSuggestions(results){
  // get area to display the results in
  var tableArea = document.getElementById("products");

  // set the table heading
  var string = '<table><tr><th>ID</th><th>Name</th><th>Description</th><th>Quantity</th><th>Price</th></tr>';
  // get the searchbox element
  searchBox = document.getElementById("adminSearchBox");
  // if the results returns something
  if (results.length != 0) {
    for(var i=0; i<results.length; i++){
      //change price to float and fix to two decimal points
      var price = parseFloat(results[i].Price).toFixed(2);
      // Create the table row, alternate the colour when i is odd or even
      if(i % 2 == 0){
        string += "<tr>" +
                    "<td>" + results[i].ID + "</td>" +
                    "<td>" + results[i].Name + "</td>" +
                    "<td>" + results[i].Description + "</td>" +
                    "<td class='tableQuantity'>" + results[i].Quantity + "</td>" +
                    "<td>£" + price + "</td>" +
                  "<tr>";
      }
      else{
        string += "<tr>" +
                    "<td class='tableAltColour'>" + results[i].ID + "</td>" +
                    "<td class='tableAltColour'>" + results[i].Name + "</td>" +
                    "<td class='tableAltColour'>" + results[i].Description + "</td>" +
                    "<td class='tableAltColour tableQuantity'>" + results[i].Quantity + "</td>" +
                    "<td class='tableAltColour'>£" + price + "</td>" +
                  "<tr>";
      }
    }
  }
  // If nothing is found, deisplay a message
  else{
    string = '<p>no matches found</p>';
  }
    tableArea.innerHTML = string;

    // If the product quantity is less than 10 colour the background of the table cell in red
    var lowQuantity = document.querySelectorAll(".tableQuantity");
    for(var i=0; i<lowQuantity.length; i++){
      if(lowQuantity[i].innerHTML < 10){
        lowQuantity[i].style.background = "rgba(255, 0, 0, 0.7)";
        lowQuantity[i].style.borderTop = "1px solid #DEDEDE";
      }
    }
  }

// Add event for key up to the search box to perform a search
adminSearchBox = document.getElementById("adminSearchBox");
adminSearchBox.addEventListener('keyup', adminSearch);
