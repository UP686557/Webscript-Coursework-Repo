var customersButton = document.getElementById("customerAdmin");
customersButton.addEventListener('click', customerSection);

var adminSection = document.getElementById("adminSection");

function customerSection(){
  displayCustomerAdmin();
}

function displayCustomerAdmin(){
  var xmlhttp = new XMLHttpRequest();
  var tableSection = document.getElementById("products");
  if(xmlhttp){
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var response = xmlhttp.responseText;
        var decodeResponse = JSON.parse(response);
        var output = "<h1>Customers</h1>";
        output += "<table><tr><th>ID</th><th>First Name</th><th>Surname</th><th>Email</th><th>Phone Number</th><th>Address</th><th>Town</th><th>County</th><th>Post Code</th></tr>";


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
        output += "</table>";
        adminSection.innerHTML = output;
      }
    }
    xmlhttp.open("GET", "displayCustomers.php", false);
    xmlhttp.send();
  }
}
