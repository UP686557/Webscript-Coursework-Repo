<!DOCTYPE HTML>
<html>
  <head>
    <title id="title">Admin | Products</title>
    <link rel="stylesheet" type="text/css" href="../CSS/style.css">
    <link rel="stylesheet" type="text/css" href="../CSS/searchbar.css">
    <link rel="stylesheet" type="text/css" href="../CSS/navigation.css">
    <link rel="stylesheet" type="text/css" href="../CSS/administration.css">
    <link rel="stylesheet" type="text/css" href="../CSS/dialogBox.css">
    <meta charset="UTF-8">
  </head>

  <body class="adminBody">
    <div id="dialogOverlay"></div>
    <div id="dialogBox">
      <div id="dialogHead"></div>
      <div id="dialogBody"></div>
      <div id="dialogFoot"></div>
    </div>

    <div id='adminNav'>
      <a class='adminNavButton' href="../">Home</a>
      <a class='adminNavButton' href="../Administration/">Products</a>
      <a id='customerAdmin' class='adminNavButton'>Customers</a>
      <a id='orderAdmin' class='adminNavButton'>Orders</a>
    </div>

    <article id="adminSection">
      <h1>Administration</h1>

      <section id="controls">
        <section id="add">
          <fieldset class="fieldSet">
            <legend>Add</legend>
            <form id="addProductForm">
              <p><label>Name:* </label><input type=text name=productName id="addProductName" placeholder="Product Name..." required></p>
              <p><label>Price:* </label><input type=number step="any" name=productPrice id="addProductPrice" placeholder="Price..." required></p>
              <p><label>Quantity:* </label><input type=number name=productQuantity id="addProductQuantity"placeholder="Quantity..." required></p>
              <p><label>Description:* </label><textarea name=productDescription id="addProductDescription" placeholder="Description..." required></textarea></p>
              <p><label>Category:* </label><input name=productCategory id="addProductCategory" placeholder="Category..." required></p>
              <p><label>Image: </label><input type=file size=20 id="addProductPhoto"></p>
            </form>
            <p id="productAdded"></p>
          </fieldset>
        </section>

        <section id="remove">
          <fieldset class="fieldSet">
            <legend>Remove</legend>
            <form id="removeProductForm">
              <p>Enter the ID of the product you wish to remove from the database and comfirm this action with the "Remove Product" button.</p>
              <p><label>ID:* </label><input type=text name=productID id="removeProductID" placeholder="Product ID..." required></p>
            </form>
            <p id="productRemoved"></p>
          </fieldset>
        </section>

        <section id="update">
          <fieldset class="fieldSet">
            <legend>Update</legend>
            <form id="updateProductForm">
              <p><label>ID:* </label><input type=text id=updateProductID placeholder="Product ID..." required></p>
              <p>Enter the id of the product you wish to edit, and the new details following. Not all fields need to be full.</p>
              <p><label>Name: </label><input type=text id=updateProductName placeholder="Product Name..."></p>
              <p><label>Quantity: </label><input type=number id=updateProductQuantity placeholder="Quantity..."></p>
              <p><label>Price: </label><input type=text id=updateProductPrice placeholder="Price..."></p>
              <p><label>Description: </label><textarea name=productDescription id=updateProductDescription placeholder="Description..."></textarea></p>
              <p><label>Category: </label><input name=productCategory id="updateProductCategory" placeholder="Category..." required></p>
              <p><label>Image: </label><input type=file id=updateProductPhoto></p>
            </form>
            <p id="productUpdated"></p>
          </fieldset>
        </section>

        <p><button type=button id="addButton" class="adminButton">Add Product</button></p>
        <p><button type=button id="removeButton" class="adminButton">Remove Product</button></p>
        <p><button type=button id="updateButton" class="adminButton">Update Product</button></p>

      </section>

      <section>
        <h1>Products</h1>
        <p><input type=text id=adminSearchBox placeholder='Search Items...'></p>

        <section id="products">
        </section>

      </section>
    </article>

    <?php include '../footer.php' ?>

    <script type="text/javascript" src="../javascript/Administration/editProducts.js"></script>
    <script type="text/javascript" src="../javascript/customAlert.js"></script>
    <script type="text/javascript" src="../javascript/Administration/adminSearch.js"></script>
    <script type="text/javascript" src="../javascript/Administration/customersAdmin.js"></script>
    <script type="text/javascript" src="../javascript/Administration/order.js"></script>

  </body>

</html>
