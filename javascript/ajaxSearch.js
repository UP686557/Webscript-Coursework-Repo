// Get elemets for searching
var searchBox = document.getElementById("searchBox");
var searchButton = document.getElementById("searchButton");
var searchSuggestion = document.getElementById("searchSuggestion");




function ajaxSearch(event){
  // Encode values of the entered string
  var str = escape(document.getElementById('searchBox').value);
  // get new request
  var search = new XMLHttpRequest();
  if(str != ''){
    if(search){
      // If ready, execute
      search.onreadystatechange = function(){
        if(search.readyState === 4 && search.status === 200){
          // Call displaySuggestions with the server respone parsed
          displaySuggestions(event, JSON.parse(search.responseText));
        }
      };
      // Send values
      search.open("GET", '../searchSuggest.php?search=' + str, true);
      search.send(null);
    }
  }
  else{
    // If searchBox empty, set suggestions to nothing
    searchSuggestion.innerHTML = '';
  }
}

function displaySuggestions(event, results){
  string = '';
  searchSuggestion.innerHTML = '';
  //  For each item returned by the server, display the name
  for(var i=0; i<results.length; i++){
    string += '<div class="searchItem">' + results[i].Name + '</div>';
  }
  searchSuggestion.innerHTML = string;

  // Add click event to each search suggestion to display details
  ajaxResult = document.querySelectorAll(".searchItem");
  for(i=0; i<ajaxResult.length; i++){
    ajaxResult[i].addEventListener("click", function(event){
      result = event.currentTarget.innerHTML;
      searchBox.value = result;
      searchSuggestion.innerHTML = "";
      searchItem(event, "Default");
    });
  }
}


// If searchbox typed in, execute ajaxSearch, also if clicked
searchBox.addEventListener('keyup', ajaxSearch);
searchBox.addEventListener('click', function(){
    if(searchBox.value != ''){
      ajaxSearch();
    }
  });


// hide suggestions if window clicked
window.addEventListener('click', function(){
 searchSuggestion.innerHTML = '';
 });
