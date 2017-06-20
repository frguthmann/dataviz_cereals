 var droppers = ["dropper1","dropper2","dropper3","dropper4"];

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

/*  Add listenners for when a slider is released.
    It updates the pref variable with the current value
*/
var sliders = document.getElementsByClassName("slider")
for(i=0; i<sliders.length; i++){
    sliders[i].addEventListener("change", function(e) {
        var dropper = e.path[4];
        criterion = dropper.getElementsByClassName('draggable')[0].innerText;
        var idx = parseInt(dropper.className.match(/\d+/)[0]) - 1;
        value = getCriterionValue(criterion);
        
        // Update pref with the slider value and criterion
        pref[idx].choice = value;
        pref[idx].criterion = prefMap[criterion];
        console.log(pref);

        // Sort and update view
        sortCereals(pref);
        //console.log("crit: " + criterion + " value: " + value + " drop Nbr: " + idx);
    }, false);
}

for(var idx=0; idx<droppers.length; idx++){
    var dropperName = droppers[idx];
    var dropper = document.getElementsByClassName(dropperName)[0];

    dropper.addEventListener('drop',function(e){
      
      // Check if spot is full before continuing
      if(e.target.getElementsByClassName("draggable").length > 0){
        return;
      }
      
      e.preventDefault();
      var parent = draggedElement.parentNode;
      var idxTarget = parseInt(e.target.className.match(/\d+/)[0]) - 1;
      if(parent.className != "dropper5"){
        e.target.getElementsByClassName("slider")[0].value = e.dataTransfer.getData('Number');
        parent.getElementsByClassName("slider")[0].id = draggedElement.getElementsByClassName("id")[0].innerHTML;
        
        // Switch pref according to new placement to update score
        var idxParent = parseInt(parent.className.match(/\d+/)[0]) - 1;
        
        var criterion = pref[idxParent].criterion;
        var value = pref[idxParent].choice;
        pref[idxParent].criterion = pref[idxTarget].criterion;
        pref[idxParent].choice = pref[idxTarget].choice;
        pref[idxTarget].criterion = criterion;
        pref[idxTarget].choice = value;
      }else{
        value = e.target.getElementsByClassName("slider")[0].value;
        criterion = prefMap[draggedElement.getElementsByClassName("id")[0].innerText];
        pref[idxTarget].criterion = criterion;
        pref[idxTarget].choice = value;
      }

      // Update view as we shuffled criteria
      sortCereals(pref);
      console.log(pref);

      e.target.prepend(draggedElement);
    });

    dropper.addEventListener('dragenter', function(e) {
      e.preventDefault();
    });

    dropper.addEventListener('dragover', function(e) {
      e.preventDefault();
    });

}

var elements = document.getElementsByClassName("dropper5");
for(var i = 0; i < elements.length; i ++){
  var dropper5 = elements[i];
  dropper5.addEventListener('drop',function(e){
      e.preventDefault();

      // Update pref and view as we removed a criterion from the computation 
      var idxParent = parseInt(draggedElement.parentNode.className.match(/\d+/)[0]) - 1;
      pref[idxParent].criterion = "NA";
      pref[idxParent].choice = -1;
      sortCereals(pref);
      console.log(pref);

      e.target.prepend(draggedElement);
  });
  dropper5.addEventListener('dragenter', function(e) {
      e.preventDefault();
  });
  dropper5.addEventListener('dragover', function(e) {
      e.preventDefault();
  });
}



var drag = document.getElementsByClassName("draggable");
for(var i = 0; i < drag.length; i ++){
  drag[i].addEventListener('drop',function(e){
    e.stopPropagation();
    });
}
