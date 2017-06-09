function getSucre(){
  var s = document.getElementById("sucre");
  console.log(s.value);
  return(s.value);
}

function getSale(){
  var s = document.getElementById("sale");
  return(s.value);
}

function getGraisse(){
  var s = document.getElementById("graisse");
  return(s.value);
}

function getCalories(){
  var s = document.getElementById("calories");
  return(s.value);
}

var elements = document.getElementsByClassName("dropper");
for(var i = 0; i < elements.length; i ++){
  var dropper = elements[i];
  dropper.addEventListener('drop',function(e){
    e.preventDefault();
  });
  dropper.addEventListener('dragenter', function(e) {
      e.preventDefault();
  });


  dropper.addEventListener('dragover', function(e) {
      e.preventDefault();
  });


}
