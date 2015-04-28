function addCustomer(){
  customer = localStorage.getItem('customer');
  jsonCustomer = JSON.parse(customer);

  var xmlhttp = new XMLHttpRequest();

  if(xmlhttp){
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        response = JSON.parse(xmlhttp.responseText);

        customerID = response[0].ID;
        customerFirstName = response[0].FirstName;
        customerSurname = response[0].LastName;
        customerEmail = response[0].Email;
        customerPhoneNumber = response[0].PhoneNumber;
        customerAddress = response[0].Address;
        customerTowm = response[0].Town;
        customerCounty = response[0].County;
        customerPostCode = response[0].PostCode;

        details = "<p>ID: " + customerID + "</p>" + "<p>First Name: " + customerFirstName + "</p>" + "<p>Surname: " + customerSurname + "</p>" + "<p>Email: " + customerEmail + "</p>" + "<p>Phone Number: " + customerPhoneNumber + "</p>" + "<p>Address: " + customerAddress + "</p>" +
                  "<p>Town: " +  + "</p>" + "<p>County: " + customerCounty + "</p>" + "<p>Post Code: " + customerPostCode + "</p>";
        Alert.render("Customer Added", details);

        addOrder(customerID);


      }
    }
  var url = "addCustomer.php?firstName=" + jsonCustomer.FirstName + "&surname=" + jsonCustomer.Surname + "&email=" + jsonCustomer.Email + "&phoneNumber=" + jsonCustomer.PhoneNumber + "&address=" + jsonCustomer.Address + "&town=" + jsonCustomer.Town + "&county=" + jsonCustomer.County + "&postCode=" + jsonCustomer.PostCode;
  xmlhttp.open("GET", url, false);
  xmlhttp.send();


  }
}


function addOrder(customerID){
  var xmlhttp = new XMLHttpRequest();


  if(xmlhttp){
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        console.log(xmlhttp.responseText);

        response = JSON.parse(xmlhttp.responseText);

        orderID = response[0].ID;
        orderDate = response[0].Date;
        orderPrice = response[0].TotalPrice;
        orderCustomerID = response[0].Customer_ID;


        details = "<p>ID: " + orderID + "</p>" + "<p>Date: " + orderDate + "</p>" + "<p>Total Price: " + orderPrice + "</p>" + "<p>Customer ID: " + orderCustomerID + "</p>";
        Alert.render("Order Added", details);

        addItemsToOrder(orderID);

      }
    }

    var url = "../Administration/Checkout/addOrder.php?customerID=" + customerID + "&totalPrice=" + totalPrice;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();

  }
}

function addItemsToOrder(orderID){
  basketStorage = localStorage.getItem("basket"); //This is in json format as a string so you need to parse it
  jsonBasket = JSON.parse(basketStorage);
  console.log(basketStorage);


  for(var i in jsonBasket){
    var itemPrice = parseFloat(jsonBasket[i].quantity * jsonBasket[i].Price).toFixed(2);
    var xmlhttp = new XMLHttpRequest();

    if(jsonBasket.hasOwnProperty(i)){
      if(xmlhttp){
        xmlhttp.onreadystatechange = function(){
          if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response);

          }
        }
        var url = "../Administration/Checkout/addOrderItem.php?productID=" + jsonBasket[i].ID + "&quantity=" + jsonBasket[i].quantity + "&orderID=" + orderID + "&totalPrice=" + itemPrice;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
  }
}

function displayOrders(){
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
        title.innerHTML = "Admin | Orders";
        var output = "<h1>Orders</h1>";
        // Set the heading of the table
        output += "<table><tr><th>ID</th><th>Date(YYYY/MM/DD) / Time</th><th>Total Price</th><th>Customer_ID (FK)</th></tr>";

        // Add data to the row, alternating the colour
        for(var i=0; i<decodeResponse.length; i++){
          var price = parseFloat(decodeResponse[i].Price);
          if(i % 2 == 0){
            output += "<tr>" +
                        "<td>" + decodeResponse[i].ID + "</td>" +
                        "<td>" + decodeResponse[i].Date + "</td>" +
                        "<td>£" + decodeResponse[i].TotalPrice + "</td>" +
                        "<td>" + decodeResponse[i].Customer_ID + "</td>" +
                      "<tr>";
          }
          else{
            output += "<tr>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].ID + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Date + "</td>" +
                        "<td class='tableAltColour'>£" + decodeResponse[i].TotalPrice + "</td>" +
                        "<td class='tableAltColour'>" + decodeResponse[i].Customer_ID + "</td>" +
                      "<tr>";
          }

        }
        // Close table and display
        output += "</table>";
        adminSection.innerHTML = output;
      }
    }
    // Send data to server
    xmlhttp.open("GET", "Checkout/displayOrders.php", true);
    xmlhttp.send();
  }
}
}
