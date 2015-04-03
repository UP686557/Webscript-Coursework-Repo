var searchBox = document.getElementById("searchBox");
var searchButton = document.getElementById("searchButton");



function ajaxSearch(event){
  var str = escape(document.getElementById('searchBox').value);
  var search = new XMLHttpRequest();
  if(str != ''){
    if(search){
      search.onreadystatechange = function(){
        if(search.readyState === 4 && search.status === 200){
          displaySuggestions(event, JSON.parse(search.responseText));
        }
      };
      search.open("GET", '../searchSuggest.php?search=' + str, true);
      search.send(null);
    }
  }
  else{
    document.getElementById('searchSuggestion').innerHTML = '';
  }
}

function displaySuggestions(event, results){
  var ss = document.getElementById("searchSuggestion");
  string = '';
  ss.innerHTML = '';
  for(var i=0; i<results.length; i++){
    string += '<div class="searchItem">' + results[i].Name + '</div>';
  }
  ss.innerHTML = string;

  ajaxResult = document.querySelectorAll(".searchItem");
  for(i=0; i<ajaxResult.length; i++){
    ajaxResult[i].addEventListener("click", function(event){
      setSearch(event, event.currentTarget.innerHTML);
    });
  }
}

function setSearch(event, result){
  var searchBox = document.getElementById("searchBox");
  searchBox.innerHTML = result;
  document.getElementById("searchSuggestion").innerHTML = "";
  searchItem(event);
}


searchBox.addEventListener('keyup', ajaxSearch);
searchBox.addEventListener('click', function(){
    if(searchBox.value != ''){
      ajaxSearch();
    }
  });



window.addEventListener('click', function(){
 document.getElementById('searchSuggestion').innerHTML = '';
 });
