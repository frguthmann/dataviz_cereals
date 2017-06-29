// Constants:
var rowsModelSize = [3,10,20,44];
var rowsViewSize = [1,3,5,8];

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

var rowFillerleft = [];
var rowFillerright = [];

console.log("pyramid");
console.log(pyramid);
console.log("cereals_data");
console.log(cereals_data);

var vitesseAnim = 0.3;
var animOk = true;

var treeheight=0;

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
        }
    }
}

// Gather the DOM elements representing the pyramid and fill them with pictures
function firstPyramidSetup(){
  /*  Lets fill the viewRows section of the pyramid with the DOM elements that are the pictures of it
      Plus we change the pictures on the fly so that we don't always have the same one everywhere
  */
  var tree = document.getElementById("pyramid");
  treeheight=tree.clientHeight;
	for(r=0; r<pyramid.modelRows.length; r++){

		//Creation ligne
		var HTMLrow = document.createElement("ul");
		tree.appendChild(HTMLrow);
		HTMLrow.setAttribute("style","margin-left: auto;margin-right: auto;text-align: center;");
		HTMLrow.setAttribute("id","PyramidRow"+r);

		//add event ofr wheel (multisupport found on https://www.sitepoint.com/html5-javascript-mouse-wheel/)
		if (HTMLrow.addEventListener) {
			// IE9, Chrome, Safari, Opera
			HTMLrow.addEventListener("mousewheel", MouseWheelHandler, false);
			// Firefox
			HTMLrow.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
		}



		//Creation button gauche
		if(rowsViewSize[r]!==1){
			var li = document.createElement("li");
			var button = document.createElement("button");
			button.type = "button";
			button.innerHTML = "&laquo;";
      button.style.marginRight = "15px";
			button.setAttribute("class","buttonpyramid");
			button.setAttribute("onclick","rotateRow("+r+",1);")
			li.appendChild(button);
			HTMLrow.appendChild(li);
		}

		//console.log("r = "+r)
		var tempRow = [];

	//Remplissage de la ligne
    for(im=0; im<rowsViewSize[r]; im++){
		//console.log("img = "+im)
		tempRow.push(createCell(r,im,HTMLrow));
    }

    pyramid.viewRows.push(tempRow);

	//Creation du bouton droit
	if(rowsViewSize[r]!==1){
		var li = document.createElement("li");
		var button = document.createElement("button");
		button.setAttribute("onclick","rotateRow("+r+",-1);")
		button.type = "button";
		button.innerHTML = "&raquo;";
    button.style.marginLeft = "15px";
		button.setAttribute("class","buttonpyramid");
		li.appendChild(button);
		HTMLrow.appendChild(li);
	}
  }
}

//Ajoute un paquet de céréale à la ligne donnée
function createCell(r,im,row){

	var HTMLli = document.createElement("li");

	var image = document.createElement("img");
	image.src = pyramid.modelRows[r][im].source;
	image.setAttribute("class", "pyramidImage");
  	image.id = "r" + r + "im" + im;

	if(im==0){
		var filler = document.createElement("img");
		filler.src = pyramid.modelRows[r][im].source;
		filler.setAttribute("class", "pyramidImage");
		filler.setAttribute("style", "opacity:0;margin-left:-500%;position:absolute;visibility:hidden;");
		rowFillerleft[r]=filler;
	}

	if(im==rowsViewSize[r]-1){
		var filler2 = document.createElement("img");
		filler2.src = pyramid.modelRows[r][im].source;
		filler2.setAttribute("class", "pyramidImage");
		filler2.setAttribute("style", "opacity:0;position:absolute;visibility:hidden;margin-left:300%;");
		rowFillerright[r]=filler2;
	}

  var globalDataId = parseInt(image.src.match(/images\/(\d+)/)[1]) - 1;
	var txt = document.createElement("span");
	var chart = document.createElement("div");
	txt.appendChild(chart);
	chart.setAttribute("class", "chart");
	//txt.innerHTML = cereals_data[globalDataId].name;

    //image.setAttribute("id",globalDataId);

	var link = document.createElement("a");
	link.setAttribute("href", "#");
	link.setAttribute("class", "description");
	link.appendChild(image);
	if(im==0){
		link.appendChild(filler);
	}
	if(im==rowsViewSize[r]-1){
		link.appendChild(filler2);
	}
	link.appendChild(txt);

	var cell = document.createElement("span");
	cell.appendChild(link);
	cell.setAttribute("class", "pyramidPicture");
	var width = 80/(pyramid.modelRows.length*2);
	var height = (25-4*r);
	width = height/1.9;
	//var height = (document.documentElement.clientHeight-80)/(pyramid.modelRows.length);
	cell.setAttribute("style","width:"+width+"%; height:"+height+"vh;")

	//console.log(cell)
	HTMLli.appendChild(cell);
	row.appendChild(HTMLli);
	return image;
}

/*  This function changes the pictures displayed on the page by rotating them by one following the modeRows
    Row: wich row of the pyramid is supposed to be changed
    Direction: +1 for left and -1 for right. (A bit counter intuitive I know)
*/
function rotateRow(row, direction){
	if(rowsViewSize[row]==1){
		return;
	}
	animOk=false;
	console.log("rotate")
  // What were we displaying before and where are we going
  var startIdx = pyramid.idxModel[row] + direction;
  var modelRowLength = pyramid.modelRows[row].length;

  // Solves problem of negative index
  if(startIdx == -1){
    startIdx = modelRowLength - 1;
  }

  if(direction ==-1){
	  rowFillerleft[row].setAttribute("style","transform:translate(100%,0px); transition:all "+vitesseAnim+"s;margin-left:-200%;position:absolute;")
	  rowFillerleft[row].src = pyramid.modelRows[row][(startIdx) % modelRowLength].source;
	  rowFillerleft[row].addEventListener("transitionend", function(event) {
		  this.setAttribute("style","margin-left:-500%;position:absolute;opacity:0;visibility:hidden;");
		  animOk=true;
		}, false);
  }

  if(direction == 1){
	  rowFillerright[row].setAttribute("style","transform:translate(-100%,0px); transition:all "+vitesseAnim+"s;position:absolute;");
	  rowFillerright[row].src = pyramid.modelRows[row][(startIdx+pyramid.viewRows[row].length-1) % modelRowLength].source;
	  rowFillerright[row].addEventListener("transitionend", function(event) {
		  this.setAttribute("style","position:absolute;opacity:0;visibility:hidden;margin-left:300%");
		  animOk=true;
		}, false);
  }

  // Rotate through the model and update the view
  for(im=0; im<pyramid.viewRows[row].length; im++){
	pyramid.viewRows[row][im].setAttribute("style","transition:all 0s;")
    idx = (startIdx + im) % modelRowLength;
	//var height = (document.documentElement.clientHeight-80)/(pyramid.modelRows.length);
	pyramid.viewRows[row][im].setAttribute("alt",pyramid.modelRows[row][idx].source)
	if(direction ==-1){
		pyramid.viewRows[row][im].setAttribute("style","transform:translate(100%,0px); transition:all "+vitesseAnim+"s;")
		if(im==pyramid.viewRows[row].length-1){
			pyramid.viewRows[row][im].setAttribute("style","transform:translate(100%,0px); transition:all "+vitesseAnim+"s; opacity:0;")
		}
	}
	else {
		pyramid.viewRows[row][im].setAttribute("style","transform:translate(-100%,0px); transition:all "+vitesseAnim+"s;")
		if(im==0){
			pyramid.viewRows[row][im].setAttribute("style","transform:translate(-100%,0px); transition:all "+vitesseAnim+"s; opacity:0;")
		}
	}
	pyramid.viewRows[row][im].addEventListener("transitionend", endAnimefct , false);
  }
  // Don't forget to update the pyramid: we moved through the model
  pyramid.idxModel[row] = startIdx % modelRowLength;
}

function updateView(){
  cpt = 0;
  for(row=0; row<pyramid.viewRows.length; row++){
    for(cell=0; cell<pyramid.viewRows[row].length; cell++){
      infos = [row, cell];
      setTimeout(animateCell, cpt*25, infos);
      cpt++;
    }
  }
}

function animateCell(infos){
  row = infos[0];
  cell = infos[1];
  pyramid.viewRows[row][cell].setAttribute("style","animation-name: fadeOut; animation-duration: 0.25s;");
  pyramid.viewRows[row][cell].addEventListener("animationend", function(event) {
    row = this.id.match(/\d+/)[0];
    str = (this.id.replace( /^\D+/g, '')).replace(row,'');
    cell = str.match(/\d+/)[0];
    this.src = pyramid.modelRows[row][cell].source;
    this.setAttribute("style","animation-name: fadeIn; animation-duration: 0.25s;");
  }, false);
}

window.onresize = function(event) {
	treeheight=document.documentElement.clientHeight;
  console.log("treeheight");
	console.log(treeheight);
}

function endAnimefct(event){
	//console.log("Aya")
	event.target.setAttribute("style","");
	event.target.src = this.alt;
	//event.target.removeEventListener("transitionend", endAnimefct);
}

function findbox(idx){
  for(var i = 0; i < cereals_data.length; i ++){
    if(cereals_data[i].id == idx){
      console.log(cereals_data[i]);
      return(cereals_data[i]);
    }
  }
  return([]);
}


function displayDescription(obj){
  var idxImage = parseInt(obj.getElementsByClassName("pyramidImage")[0].src.match(/\d+\./)[0].match(/\d+/)[0]);
  var box = findbox(idxImage);
  var information = document.getElementById("info");

  var titre = document.createElement("h4");
  titre.innerHTML = box.name;
  information.setAttribute("style","visibility: visible;");
  information.appendChild(titre);

  var img = document.createElement("img");
  img.setAttribute("class","imageInfo");
  img.src = obj.getElementsByClassName("pyramidImage")[0].src;
  var width = 80;
  height = width * 1.5;
  img.setAttribute("width",width + "px");
  img.setAttribute("height",height + "px");
  img.setAttribute("style","margin-top: 5px");
  information.appendChild(img);
  var infos = document.createElement("div");
  var description = document.createElement("p");

  if(Math.floor(box.score)){
    description.innerHTML= ("Score : " + Math.floor(box.score) + "<br>");
  }
  else{
    description.innerHTML = "Score : 0 " + "<br>";
  }

  for(var i = 0; i < pref.length; i ++){
    if(pref[i].criterion != "NA"){
      description.innerHTML += (reversePrefMap[pref[i].criterion]  + " : " + box[pref[i].criterion]);
      if(pref[i].criterion == "protein" || pref[i].criterion == "fat" || pref[i].criterion == "fiber" || pref[i].criterion == "carbo" || pref[i].criterion == "sugars"){
        description.innerHTML += " g";
      }else if(pref[i].criterion == "sodium" || pref[i].criterion == "potass"){
        description.innerHTML += " mg";
      }else if(pref[i].criterion == "vitamins"){
        description.innerHTML += " %";
      }
      description.innerHTML += "<br>";
    }
  }
  infos.appendChild(description);

  information.appendChild(infos);

  var att = document.createElement("span");
  att.id = "texteinfo";
  att.innerHTML = "* Un score bas indique une bonne correspondance avec vos choix";
  information.appendChild(att);
}

function hideDescription(obj){
  var information = document.getElementById("info");
  while(information.firstChild){
    information.removeChild(information.firstChild);
  }
  information.setAttribute("style","visibility: hidden;");
}

// Détection du mouseover
$( ".pyramidPicture" )
  .mouseover(function() {
    displayDescription(this);
  })
  .mouseout(function() {
    hideDescription(this);
  });

function MouseWheelHandler(e) {
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	if(animOk){
		rotateRow(e.target.id.match(/PyramidRow(\d)/)[1], delta);
	}
	return false;
}
