/*  The pyramid contains three thing:
    Paths to the pictures it might display: modelRows. There are more than actually displayed
    References to the DOM elements of the pyramid (img with ids rXimY): viewRows.
    An index to have an idea what part of the model is displayed at the time

    => All this will be fed automatically from the data file
*/
var pyramid = {
  modelRows: [
    [{source: "images/allbran.jpg"}],
    [{source: "images/100-bran-1.jpg"},{source: "images/43_KIX.jpg"},{source: "images/46_MAYPO.jpg"},{source: "images/56_PRODUCT_19.jpg"},{source: "images/allbran.jpg"}],
    [{source: "images/clusters.jpg"},{source: "images/57_PUFFED_RICE.jpg"},{source: "images/Total_Corn_Flakes.jpg"},{source: "images/Wheat_Chex.jpg"},{source: "images/allbranbuds.jpg"}, {source: "images/allbranfibreplus.jpg"},{source: "images/almonddelight.jpg"},{source: "images/appljacks.jpg"},{source: "images/basic4.jpg"},{source: "images/branchex.jpg"}]
  ],
  viewRows: [
  ["DOM_ELEMENT"],
  ["DOM_ELEMENT","DOM_ELEMENT","DOM_ELEMENT"],
  ["DOM_ELEMENT","DOM_ELEMENT","DOM_ELEMENT","DOM_ELEMENT","DOM_ELEMENT"],
  ],
  idxModel:[0,0,0]
};

console.log(pyramid);

/*  Lets fill the viewRows section of the pyramid with something better than "DOM_ELEMENT"
    Plus we change the pictures on the fly so that we don't always have the same one everywhere
*/
for(r=0; r<pyramid.modelRows.length; r++){
  for(im=0; im<pyramid.viewRows[r].length; im++){
    pyramid.viewRows[r][im] = document.getElementById("r" + r + "im" + im);
    pyramid.viewRows[r][im].src = pyramid.modelRows[r][im].source;
  }
}

/*  This function changes the pictures displayed on the page by rotating them by one following the modeRows
    Row: wich row of the pyramid is supposed to be changed
    Direction: +1 for left and -1 for right. (A bit counter intuitive I know) 
*/
function rotateRow(row, direction){
  
  // What were we displaying before and where are we going
  var startIdx = pyramid.idxModel[row] + direction;
  var modelRowLength = pyramid.modelRows[row].length;
  
  // Solves problem of negative index
  if(startIdx == -1){
    startIdx = modelRowLength - 1;
  }

  // Rotate through the model and update the view
  for(im=0; im<pyramid.viewRows[row].length; im++){
    idx = (startIdx + im) % modelRowLength;
    pyramid.viewRows[row][im].src = pyramid.modelRows[row][idx].source;
  }
  // Don't forget to update the pyramid: we moved through the model
  pyramid.idxModel[row] = startIdx % modelRowLength;
}