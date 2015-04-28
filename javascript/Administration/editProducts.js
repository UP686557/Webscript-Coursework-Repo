// Set variables for admin buttons
var addButton, removeButton, updataButton;


function addProduct(){
  // Get new request
  var xmlhttp = new XMLHttpRequest();
  // Get all input elements
  var productName = document.getElementById("addProductName");
  var productDescription = document.getElementById("addProductDescription");
  var productQuantity = document.getElementById("addProductQuantity");
  var productCategory = document.getElementById("addProductCategory");
  var productPrice = document.getElementById("addProductPrice");
  var productPhoto = document.getElementById("addProductPhoto");
  // If all input elements filled execute
  if(productName.value != "" && productDescription != "" && productQuantity != "" && productPrice != "" && productCategory != ""){
    // Set the url to send to the server
    var url = "insert.php?productName=" + productName.value + "&productDescription=" + productDescription.value + "&productCategory=" + productCategory.value + "&productQuantity=" + productQuantity.value + "&productPrice=" + productPrice.value + "&productPhoto=Images/Products/" + productPhoto.value;
    // Send data to server
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    // Alert to the user what was added
    Alert.render("Product Added", xmlhttp.responseText);
    // Reset input elements to empty
    document.getElementById("addProductForm").reset();
    displayProducts();
  }
  else{
    // If data missing, alert the user
    Alert.render("Enter Fields", "Please enter values into the add product fields.");
  }
}

function removeProduct(){
  // Get new request
  var xmlhttp = new XMLHttpRequest();
  // Get ID input element
  var productID = document.getElementById("removeProductID");

  // If ID element value not empty, execute
  if(productID.value != ""){
    // Set the data to send
    var url = "remove.php?productID=" + productID.value;
    // Send to the server
    xmlhttp.open("GET", url, false);
    xmlhttp.send();

    // Alert conformation to the user
    Alert.render("Product Removed", xmlhttp.responseText);
    // Reset input elements to empty
    document.getElementById("removeProductForm").reset();
    displayProducts();
  }
  else{
    // Alert Error to the user
    Alert.render("Enter Fields", "Please enter values into the remove product fields.");
  }
}

function updateProduct(){
  // Get new request
  var xmlhttp = new XMLHttpRequest();
  // Get all input elements
  var productID = document.getElementById("updateProductID").value;
  var productName = document.getElementById("updateProductName").value;
  var productDescription = document.getElementById("updateProductDescription").value;
  var productCategory = document.getElementById("updateProductCategory");
  var productQuantity = document.getElementById("updateProductQuantity").value;
  var productPrice = document.getElementById("updateProductPrice").value;

  // If all input elements filled execute
  if(productID != "" && (productName != "" || productDescription != "" || productQuantity != "" || productPrice != "" || productCategory != "")){
    // Set the url to send to the server
    var url = "update.php?productID=" + productID + "&productName=" + productName + "&productDescription=" + productDescription + "&productCategory=" + productCategory.value + "&productQuantity=" + productQuantity + "&productPrice=" + productPrice;

    // Send to the server
    xmlhttp.open("GET", url, false);
    xmlhttp.send();

    // Alert conformation to the user
    Alert.render("Product Updated", xmlhttp.responseText);
    // Reset input elements to empty
    document.getElementById("updateProductForm").reset();
    displayProducts();
  }
  else{
    Alert.render("Enter Fields", "Please enter values into the update product fields.");
  }
}

function displayProducts(){
  // Get new request
  var xmlhttp = new XMLHttpRequest();
  // Get dynamic table section
  var tableSection = document.getElementById("products");
  if(xmlhttp){
    // If ready, execute
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        // Get response from server
        var response = xmlhttp.responseText;
        // Decode the response
        var decodeResponse = JSON.parse(response);
        // Set the table heading
        var output = "<table><tr><th>ID</th><th>Name</th><th>Description</th><th>Category</th><th>Quantity</th><th>Price</th></tr>";

        // Set each table row
        for(var i=0; i<decodeResponse.length; i++){
          var price = parseFloat(decodeResponse[i].Price);
          if(i % 2 == 0){
            output += "<tr>" +
                        "<td>" + decodeResponse[i].ID + "</td>" +
                        "<td>" + decodeResponse[i].Name + "</td>" +
                        "<td class='adminDescription'>" + decodeResponse[i].Description + "</td>" +
                        "<td>" + decodeResponse[i].Category + "</td>" +
                        "<td class='tableQuantity'>" + decodeResponse[i].Quantity + "</td>" +
                        "<td>£" + price.toFixed(2) + "</td>" +
                      "<tr>";
          }
          else{
            output += "<tr>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].ID + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Name + "</td>" +
                        "<td class='tableAltColour adminDescription'>" + decodeResponse[i].Description + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Category + "</td>" +
                        "<td class='tableAltColour tableQuantity'>" + decodeResponse[i].Quantity + "</td>" +
                        "<td class='tableAltColour'>£" + price.toFixed(2) + "</td>" +
                      "<tr>";
          }

        }
        // Close and display table
        output += "</table>";
        tableSection.innerHTML = output;

        // Set the background colour of the table if quantity below 10
        var lowQuantity = document.querySelectorAll(".tableQuantity");
        for(var i=0; i<lowQuantity.length; i++){
          if(lowQuantity[i].innerHTML < 10){
            lowQuantity[i].style.background = "rgba(255, 0, 0, 0.7)";
            lowQuantity[i].style.borderTop = "1px solid #DEDEDE";
          }
        }
      }
    }
    // Send data to server
    xmlhttp.open("GET", "../Administration/display.php", true);
    xmlhttp.send();
  }
}

// Add events to window and buttons
window.addEventListener("load", displayProducts);

addButton = document.getElementById("addButton");
addButton.addEventListener("click", addProduct);

removeButton = document.getElementById("removeButton");
removeButton.addEventListener("click", removeProduct);


updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", updateProduct);
