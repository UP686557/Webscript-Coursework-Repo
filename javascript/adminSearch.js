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
  var str = escape(document.getElementById('adminSearch').value);
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

function adminSearch(){
  var str = escape(document.getElementById('adminSearchBox').value);
  var search = getXmlHttpRequestObject();
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
}

function displayAdminSuggestions(results){
  var tableArea = document.getElementById("products");
  string = '';
  ss.innerHTML = '';
  for(var i=0; i<results.length; i++){
    string += display()//'<div class="searchItem">' + results[i].Name + '</div>';
  }
  tableArea.innerHTML = string;
}

adminSearchBox = document.getElementById("adminSearch");
adminSearchBox.addEventListener('keyup', adminSearch);
