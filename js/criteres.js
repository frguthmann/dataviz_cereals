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

var draggedElement = null;
document.addEventListener('dragstart',function(e){
  draggedElement = e.target;
});


var elements = document.getElementsByClassName("dropper");
var isDropped = false;
for(var i = 0; i < elements.length; i ++){
  var dropper = elements[i];
  dropper.addEventListener('drop',function(e){
    if(! isDropped){
      e.preventDefault();
      e.target.append(draggedElement);
    }
  });
  dropper.addEventListener('dragenter', function(e) {
    if(! isDropped){
      e.preventDefault();
    }
    else{
      return(true);
    }
  });
  dropper.addEventListener('dragover', function(e) {
    if(! isDropped){
      e.preventDefault();
    }
    else{
      return(true);
    }
  });
}




var elements = document.getElementsByClassName("dropper2");
var isDropped2 = false;
for(var i = 0; i < elements.length; i ++){
  var dropper2 = elements[i];
  dropper2.addEventListener('drop',function(e){
    if(! isDropped2){
      e.preventDefault();
      e.target.append(draggedElement);
    }
    else{
      return(true);
    }
  });
  dropper2.addEventListener('dragenter', function(e) {
    if(! isDropped2){
      e.preventDefault();
    }
    else{
      return(true);
    }
  });
  dropper2.addEventListener('dragover', function(e) {
    if(! isDropped2){
      e.preventDefault();
    }
    else{
      return(true);
    }
  });
}


var elements = document.getElementsByClassName("dropper3");
var isDropped3 = false;
for(var i = 0; i < elements.length; i ++){
  var dropper3 = elements[i];
  dropper3.addEventListener('drop',function(e){
    if(! isDropped3){
      e.preventDefault();
      e.target.append(draggedElement);
    }
    else{
      return(true);
    }
  });
  dropper3.addEventListener('dragenter', function(e) {
    if(! isDropped3){
      e.preventDefault();
    }
    else{
      return(true);
    }
  });
  dropper3.addEventListener('dragover', function(e) {
    if(! isDropped3){
      e.preventDefault();
    }
    else{
      return(true);
    }
  });
}


var elements = document.getElementsByClassName("dropper4");
var isDropped4 = false;
for(var i = 0; i < elements.length; i ++){
  var dropper4 = elements[i];
  dropper4.addEventListener('drop',function(e){
    if(! isDropped4){
      e.preventDefault();
      e.target.append(draggedElement);
    }
    else{
      return(true);
    }
  });
  dropper4.addEventListener('dragenter', function(e) {
    if(! isDropped4){
      e.preventDefault();
    }
    else{
      return(true);
    }
  });
  dropper4.addEventListener('dragover', function(e) {
    if(! isDropped4){
      e.preventDefault();
    }
    else{
      return(true);
    }
  });
}


var drag = document.getElementsByClassName("draggable");
for(var i = 0; i < drag.length; i ++){
  drag[i].addEventListener('drop',function(e){
    e.stopPropagation();
  });
}
