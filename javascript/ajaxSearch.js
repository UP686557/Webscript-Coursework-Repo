var searchBox = document.getElementById("searchBox");
var searchButton = document.getElementById("searchButton");


function getXmlHttpRequestObject(){
  if(window.XMLHttpRequest){
    return new XMLHttpRequest();
  }
  else if (window.ActiveXObject){
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
  else{
    alert("Your browser does not support AJAX");
  }
}

function ajaxSearch(){
  var str = escape(document.getElementById('searchBox').value);
  var search = getXmlHttpRequestObject();
  if(str != ''){
    if(search){
      search.onreadystatechange = function(){
        if(search.readyState === 4 && search.status === 200){
          displaySuggestions(JSON.parse(search.responseText));
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

function displaySuggestions(results){
  var ss = document.getElementById("searchSuggestion");
  string = '';
  ss.innerHTML = '';
  for(var i=0; i<results.length; i++){
    string += '<div class="searchItem">' + results[i].Name + '</div>';
  }
  ss.innerHTML = string;
  ajaxResult = document.getElementsByClassName("searchItem");
  for(i=0; i<ajaxResult.length; i++){
    ajaxResult[i].addEventListener("click", function(){
      setSearch(ajaxResult[i].value);
    });
  }
}

function setSearch(result){
  document.getElementById("searchBox").innerHTML = result;
  document.getElementById("searchSuggestion").innerHTML = "";
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



  
