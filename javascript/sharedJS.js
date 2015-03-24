function updateBasketNumber(){
  var basketStorage = localStorage.getItem("basket"); //This is in json format as a string so you need to parse it
  jsonBasket = JSON.parse(basketStorage);
  var totalItems = 0;

  for (var i in jsonBasket){
    totalItems ++;
  }

  basketIcon = document.getElementById("numItems");
  basketIcon.innerHTML = totalItems;
}
