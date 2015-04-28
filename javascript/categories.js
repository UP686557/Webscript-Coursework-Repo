var categoryHeading = document.getElementById('categoriesNav');

function categoriesDropList(){
  // Get new XMLHttpRequest
  var xmlhttp = new XMLHttpRequest();

  if(xmlhttp){
    // if ready execute
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

        var response = JSON.parse(xmlhttp.responseText);
        dropList = document.createElement("ul");
        dropList.setAttribute("id", "categoriesDrop");
        categoryHeading.appendChild(dropList);
        dropList.style.display = "none";
        // Create an array to store the categories
        var categories = [];


        for(var i=0; i< response.length; i++){
          // If the categories array already contains the category given, skip the iteration
          if (categories.contains(response[i].Category)){
            i += 0;
          }
          else{
            // Else add the category to the list and append the child
            categories.push(response[i].Category);
            var li = document.createElement("li");
            li.classList.add("categoryListItem");
            dropList.appendChild(li);
            li.innerHTML = response[i].Category;
          }
        }

        categoryHeading.addEventListener('click', displayCategoriesPage);

        categoryHeading.addEventListener("mouseover", function(){
          if(dropList){
            dropList.style.display = "block";
          }
        });

        categoryHeading.addEventListener("mouseout", function(){
          if(dropList){
            dropList.style.display = "none";
          }
        });

        var categoryListItems = document.getElementsByClassName("categoryListItem");

        for(var i=0; i<categoryListItems.length; i++){
          categoryListItems[i].addEventListener("click", function(e){
            e.stopPropagation();
            displaySingleCategory(e);
          });
        }

      }
    };
    // Execute code in "displayCategories.php"
    xmlhttp.open("GET", "../Administration/Categories/displayCategories.php", true);
    xmlhttp.send(null);
  }
}

// Checks if a given element is within an array
Array.prototype.contains = function(elem)
  {
     for (var i in this)
     {
         if (this[i] == elem) return true;
     }
     return false;
  }


function displayCategoriesPage(){
  // Get new XMLHttpRequest
  var xmlhttp = new XMLHttpRequest();
  if(xmlhttp){
    // if ready execute
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var response = JSON.parse(xmlhttp.responseText);
        var homeSection = document.getElementById("dynamicArticle");
        homeSection.innerHTML = '';
        var categories = [];

        var heading = document.createElement("h1");
        heading.setAttribute("id", "categoriesHeading");
        homeSection.appendChild(heading);
        heading.textContent = "Categories";




        for(var i=0; i<response.length; i++){
          // If the categories array already contains the category given, skip the iteration
          if (categories.contains(response[i].Category)){
            i += 0;
          }
          else{
            // Else add the category to the list and append the child
            categories.push(response[i].Category);
            section = document.createElement("section");
            section.classList.add("categoryPageSection");
            homeSection.appendChild(section);
            section.innerHTML = "<p>" + response[i].Category + "</p>";
          }
        }

        categorySections = document.getElementsByClassName("categoryPageSection");

        for(var i=0; i<categorySections.length; i++){
          categorySections[i].addEventListener("click", displaySingleCategory);
        }

      }
    };
    // Execute code in "displayCategories.php"
    xmlhttp.open("GET", "../Administration/Categories/displayCategories.php", true);
    xmlhttp.send(null);
  }
}


function displaySingleCategory(e){
  var xmlhttp = new XMLHttpRequest();
  targetSection = e.target.textContent;
  if(xmlhttp){
    // if ready execute
    xmlhttp.onreadystatechange = function(e){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var response = JSON.parse(xmlhttp.responseText);
        var homeSection = document.getElementById("dynamicArticle");

        homeSection.innerHTML = '';

        var heading = document.createElement("h1");
        homeSection.appendChild(heading);
        heading.textContent = "Category: " + targetSection;

        var categoriesSection = document.createElement("section");
        categoriesSection.setAttribute("id", "categoryItems");
        homeSection.appendChild(categoriesSection);



        for(var i=0; i<response.length; i++){
          var price = parseFloat(response[i].Price).toFixed(2);
          var section = document.createElement("section");
          section.classList.add("categoryItem");
          section.dataset.detail = JSON.stringify(response[i]);
          categoriesSection.appendChild(section);

          section.innerHTML = '<div class="imageContainer"><img class="resultsImage" src="' + response[i].Photo + '"></div><p class="resultsName">' + response[i].Name + '</p><p class="resultsPrice">£' + price + '</p>';
        }

        categoryItems = document.getElementsByClassName("categoryItem");

        for(var i=0; i<categoryItems.length; i++){
          categoryItems[i].addEventListener("click", selectedProduct);
        }

      }
    };
    // Execute code in "displayIndividualCategory.php"
    xmlhttp.open("GET", "../Administration/Categories/displayIndividualCategory.php?category=" + targetSection, true);
    xmlhttp.send(null);
  }
}
