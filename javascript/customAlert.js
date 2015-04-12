function customAlert(){
  this.render = function(headerText, dialog){
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    overlay = document.getElementById("dialogOverlay");
    dialogBox = document.getElementById("dialogBox");

    overlay.style.display = "block";
    overlay.style.height = winH + "px";
    overlay.style.width = winW + "px";

    dialogBox.style.left = (winW/2) - (300/2)+"px";
    dialogBox.style.top = "150px";
    dialogBox.style.display = "block";

    var header = document.getElementById("dialogHead");
    var body = document.getElementById("dialogBody");
    var footer = document.getElementById("dialogFoot");

    header.innerHTML = headerText;
    body.innerHTML = dialog;
    footer.innerHTML = "<button id='dialogDone'>Done</button>";

    footer.addEventListener("click", Alert.done);
  }

  this.done = function(){
    overlay.style.display = "none";
    dialogBox.style.display = "none";
  }

}

var Alert = new customAlert();
