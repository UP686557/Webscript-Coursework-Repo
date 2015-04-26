// Get the search box
searchBox = document.getElementById('searchBox');

function updateBasketNumber(){
  //This is in json format as a string so you need to parse it
  var basketStorage = localStorage.getItem("basket");
  jsonBasket = JSON.parse(basketStorage);
  // Set the total items to 0
  var totalItems = 0;

  // Comnine the quantity from each item in the basket
  for (var i in jsonBasket){
    totalItems += JSON.parse(jsonBasket[i].quantity);
  }

  // Display the total items
  basketIcon = document.getElementById("numItems");
  basketIcon.innerHTML = totalItems;
}

// Get the search button
searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function(e){
  // If the searchbox is not empty when the button is clicked, search for the item
  if(searchBox.value != ""){
    searchItem(e, "Default");
  }
});


function searchItem(e, sortChange){
  // Prevent the form from performing its default action
  e.preventDefault();
  // Get the value from the search box
  searchString = searchBox.value;
  // Set the title
  title.innerHTML = "Company Name | " + searchString;
  // Add a section to apply changes to
  homeSection = document.getElementById("dynamicArticle");
  // Set the heading and the sorting option box
  homeSection.innerHTML = '<h1>You searched for: "' + searchString + '"</h1>';
  homeSection.innerHTML += "<p>Sort By: <select id='sort'><option value='Default'>Default</option><option value='Name'>Name</option><option value='Price'>Price</option></select></p>";

  // Get the sorting option box element
  sortOption = document.getElementById("sort");
  // Set the option box
  sortOption.value = sortChange;
  sort = sortOption.value;

  // Get new XMLHTTP Request
  var xmlhttp = new XMLHttpRequest();
  if(xmlhttp){
    // If ready execute the code
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        // Get the response from the server and parse it
        var response = JSON.parse(xmlhttp.responseText);
        // If there are results display them
        if(response.length != 0){
          for(var i=0; i<response.length; i++){
            // Change the price to a float
            var price = parseFloat(response[i].Price).toFixed(2);
            // Create a section to display each object
            var section = document.createElement("section");
            section.classList.add("searchResult");
            // Set a data detail for each item
            section.dataset.detail = JSON.stringify(response[i]);
            homeSection.appendChild(section);
            // Display the attributes of the items
            section.innerHTML += '<p class="searchPhoto"><img src="' + response[i].Photo + '"></p><section class="searchedProductDetails"><h1 class="name">' + response[i].Name + '</h1><p class="price">£' + price + '</p><p class="description">' + response[i].Description + '</p></section>';
          }
          // Get each item and add an event listener to them
          var items = document.querySelectorAll(".searchResult");
          for(i=0; i<items.length; i++){
            items[i].addEventListener("click", selectedProduct);
          }
        }

        else{
          // If no items match, display a message
          homeSection.innerHTML = '<h1>You searched for: "' + searchString + '"</h1><p>No matches for your search</p>';
        }
      }
    };
    // Send the values to the server
    xmlhttp.open("GET", "search.php?search=" + searchString + "&sort=" + sort, false);
    xmlhttp.send(null);
  }

  // Set the object for the state
  var stateObj = {Content : homeSection.innerHTML, Title : title.innerHTML, Search : searchString, Section : "dynamicArticle"};
  // Change the search string to be joined by a '+'
  search = searchString.split(' ').join('+');
  // Push the state object to the history
  window.history.pushState(stateObj, "", search);

  // If the history browser buttons used, update the content of the page
  window.addEventListener('popstate', function(event) {
    updateContent(event.state);
  });

  // If the sort option box is changed, re-evaluate and display the results
  sortOption.addEventListener("change", function(){
    sort = sortOption.value;
    searchItem(e, sort);
  });
}
