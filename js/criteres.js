 var droppers = ["dropper","dropper2","dropper3","dropper4"];

/*  Returns the value of the criteria passed as a string, ex: getCriteriaValue("Sucre");
    If the criteria is not found, the function returns -1
*/
function getCriterionValue(criterion){
  for(i=0; i<droppers.length; i++){
    var dropper = document.getElementsByClassName(droppers[i])[0];
    var label = dropper.getElementsByClassName("id");
    if(label.length>0){
        if(label[0].innerText == criterion){
            return dropper.getElementsByClassName("slider")[0].value;
        }
    }
  }
  return -1;
}

var draggedElement = null;
document.addEventListener('dragstart',function(e){
  draggedElement = e.target;
  var parent = draggedElement.parentNode;
  if(parent.className != "dropper5"){
    parent.getElementsByClassName("red")[0].style.visibility = "hidden";
    e.dataTransfer.setData('Number',parent.getElementsByClassName("slider")[0].value);
  }
});

document.addEventListener('dragend',function(e){
  draggedElement = e.target;
  var parent = draggedElement.parentNode;
  if(parent.className != "dropper5"){
    parent.getElementsByClassName("red")[0].style.visibility = "visible";
  }
});

for(var idx=0; idx<droppers.length; idx++){
    var elements = document.getElementsByClassName(droppers[idx]);
    for(var i = 0; i < elements.length; i ++){
        var dropper = elements[i];
        dropper.addEventListener('drop',function(e){
          e.preventDefault();
          var parent = draggedElement.parentNode;
          if(parent.className != "dropper5" && droppers[idx]!="dropper5"){
            e.target.getElementsByClassName("slider")[0].value = e.dataTransfer.getData('Number');
            parent.getElementsByClassName("slider")[0].id = draggedElement.getElementsByClassName("id")[0].innerHTML
          }
          e.target.prepend(draggedElement);
        });

        dropper.addEventListener('dragenter', function(e) {
          e.preventDefault();
        });

        dropper.addEventListener('dragover', function(e) {
          e.preventDefault();
        });
    }
}


var drag = document.getElementsByClassName("draggable");
for(var i = 0; i < drag.length; i ++){
  drag[i].addEventListener('drop',function(e){
    e.stopPropagation();
    });
}
