// Constants:
var rowsModelSize = [5,30,42];
var rowsViewSize = [1,3,5];

/*  The pyramid contains three thing:
    Paths to the pictures it might display: modelRows. There are more than actually displayed
    References to the DOM elements of the pyramid (img with ids rXimY): viewRows.
    An index to have an idea what part of the model is displayed at the time

    => All this will be fed automatically from the data file
*/
var pyramid = {
  modelRows: [],
  viewRows: [],
  idxModel:[]
};

console.log(pyramid);
console.log(cereals_data);

loadData();
firstPyramidSetup();

// Loads the images into the pyramid modelRows and sets the start index for what should be displayed in idxModel
function loadData(){
    var row = 0;
    var im = 0;
    var tempRow = [];
    for(idx=0; idx < cereals_data.length; idx++){
        // Let's load the image supposed to go with this
        var cell = {};
        cell.source = "images/" + cereals_data[idx].id + ".jpg";
        //console.log("images/" + cereals_data[idx].id + ".jpg");
        tempRow.push(cell);
        im++;
        // Check if we loaded all the images for this row. In this case, push the row and go to the next one
        if(im == rowsModelSize[row]){
            pyramid.modelRows.push(tempRow);
            pyramid.idxModel.push(0);
            tempRow = [];
            im = 0;
            row++;
            console.log(pyramid);
        }
    }
}

// Gather the DOM elements representing the pyramid and fill them with pictures
function firstPyramidSetup(){
  /*  Lets fill the viewRows section of the pyramid with the DOM elements that are the pictures of it
      Plus we change the pictures on the fly so that we don't always have the same one everywhere
  */
  for(r=0; r<pyramid.modelRows.length; r++){
    var tempRow = [];
    for(im=0; im<rowsViewSize[r]; im++){
      var cell = document.getElementById("r" + r + "im" + im);
      cell.src = pyramid.modelRows[r][im].source;
      tempRow.push(cell);
    }
    pyramid.viewRows.push(tempRow);
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
