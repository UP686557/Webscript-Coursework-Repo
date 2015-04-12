var xmlhttp, addButton, removeButton, updataButton;


function addProduct(){
  var xmlhttp = new XMLHttpRequest();
  var productName = document.getElementById("addProductName");
  var productDescription = document.getElementById("addProductDescription");
  var productQuantity = document.getElementById("addProductQuantity");
  var productPrice = document.getElementById("addProductPrice");
  var productPhoto = document.getElementById("addProductPhoto");
  if(productName.value != "" && productDescription != "" && productQuantity != "" && productPrice != ""){
    var url = "insert.php?productName=" + productName.value + "&productDescription=" + productDescription.value + "&productQuantity=" + productQuantity.value + "&productPrice=" + productPrice.value + "&productPhoto=Images/Products/" + productPhoto.value;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();

    Alert.render("Product Added", xmlhttp.responseText);
    document.getElementById("addProductForm").reset();
  }
  else{
    Alert.render("Enter Fields", "Please enter values into the add product fields.");
  }
}

function removeProduct(){
  var xmlhttp = new XMLHttpRequest();
  var productID = document.getElementById("removeProductID");

  if(productID.value != ""){
    var url = "remove.php?productID=" + productID.value;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();

    Alert.render("Product Removed", xmlhttp.responseText);
    document.getElementById("removeProductForm").reset();
  }
  else{
    Alert.render("Enter Fields", "Please enter values into the remove product fields.");
  }
}

function updateProduct(){
  var xmlhttp = new XMLHttpRequest();
  var productID = document.getElementById("updateProductID").value;
  var productName = document.getElementById("updateProductName").value;
  var productDescription = document.getElementById("updateProductDescription").value;
  var productQuantity = document.getElementById("updateProductQuantity").value;
  var productPrice = document.getElementById("updateProductPrice").value;

  if(productID != "" && (productName != "" || productDescription != "" || productQuantity != "" || productPrice != "")){
    var url = "update.php?productID=" + productID + "&productName=" + productName + "&productDescription=" + productDescription + "&productQuantity=" + productQuantity + "&productPrice=" + productPrice;

    xmlhttp.open("GET", url, false);
    xmlhttp.send();

    Alert.render("Product Updated", xmlhttp.responseText);
    document.getElementById("updateProductForm").reset();
  }
  else{
    Alert.render("Enter Fields", "Please enter values into the update product fields.");
  }
}

function displayProducts(){
  var xmlhttp = new XMLHttpRequest();
  var tableSection = document.getElementById("products");
  if(xmlhttp){
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var response = xmlhttp.responseText;
        var decodeResponse = JSON.parse(response);
        var output = "<table><tr><th>ID</th><th>Name</th><th>Description</th><th>Quantity</th><th>Price</th></tr>";


        for(var i=0; i<decodeResponse.length; i++){
          var price = parseFloat(decodeResponse[i].Price);
          if(i % 2 == 0){
            output += "<tr>" +
                        "<td>" + decodeResponse[i].ID + "</td>" +
                        "<td>" + decodeResponse[i].Name + "</td>" +
                        "<td>" + decodeResponse[i].Description + "</td>" +
                        "<td>" + decodeResponse[i].Quantity + "</td>" +
                        "<td>£" + price.toFixed(2) + "</td>" +
                      "<tr>";
          }
          else{
            output += "<tr>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].ID + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Name + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Description + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Quantity + "</td>" +
                        "<td class='tableAltColour'>£" + price.toFixed(2) + "</td>" +
                      "<tr>";
          }
        }
        output += "</table>";
        tableSection.innerHTML = output;
      }
    }
    xmlhttp.open("GET", "../Administration/display.php", false);
    xmlhttp.send();
  }
}

window.addEventListener("load", displayProducts);


addButton = document.getElementById("addButton");
addButton.addEventListener("click", addProduct);
addButton.addEventListener("click", displayProducts);

removeButton = document.getElementById("removeButton");
removeButton.addEventListener("click", removeProduct);
removeButton.addEventListener("click", displayProducts);


updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", updateProduct);
updateButton.addEventListener("click", displayProducts);
