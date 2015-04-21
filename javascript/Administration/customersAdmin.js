// Get button to change to customer section
var customersButton = document.getElementById("customerAdmin");
customersButton.addEventListener('click', customerSection);

// Get admin section for dynamic content
var adminSection = document.getElementById("adminSection");

// Get title
var title = document.getElementById("title");



function customerSection(){
  displayCustomerAdmin();
}

function displayCustomerAdmin(){
  // Get new request
  var xmlhttp = new XMLHttpRequest();
  // Get table section
  var tableSection = document.getElementById("products");
  //
  if(xmlhttp){
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        // Get server response
        var response = xmlhttp.responseText;
        // Parse the string response into objects
        var decodeResponse = JSON.parse(response);
        // Set the title
        title.innerHTML = "Admin | Cutomers";
        var output = "<h1>Customers</h1>";
        // Set the heading of the table
        output += "<table><tr><th>ID</th><th>First Name</th><th>Surname</th><th>Email</th><th>Phone Number</th><th>Address</th><th>Town</th><th>County</th><th>Post Code</th></tr>";

        // Add data to the row, alternating the colour
        for(var i=0; i<decodeResponse.length; i++){
          var price = parseFloat(decodeResponse[i].Price);
          if(i % 2 == 0){
            output += "<tr>" +
                        "<td>" + decodeResponse[i].ID + "</td>" +
                        "<td>" + decodeResponse[i].FirstName + "</td>" +
                        "<td>" + decodeResponse[i].LastName + "</td>" +
                        "<td>" + decodeResponse[i].Email + "</td>" +
                        "<td>" + decodeResponse[i].PhoneNumber + "</td>" +
                        "<td>" + decodeResponse[i].Address + "</td>" +
                        "<td>" + decodeResponse[i].Town + "</td>" +
                        "<td>" + decodeResponse[i].County + "</td>" +
                        "<td>" + decodeResponse[i].PostCode + "</td>" +
                      "<tr>";
          }
          else{
            output += "<tr>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].ID + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].FirstName + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].LastName + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Email + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].PhoneNumber + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Address + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Town + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].County + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].PostCode + "</td>" +
                      "<tr>";
          }

        }
        // Close table and display
        output += "</table>";
        adminSection.innerHTML = output;
      }
    }
    // Send data to server
    xmlhttp.open("GET", "displayCustomers.php", false);
    xmlhttp.send();
  }
}
