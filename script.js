let outerContainer = document.getElementById('screenContainer');
const rowContainerClassName = 'rowContainer';
const itemContainerClassName = 'itemContainer';

let gridSize = 12;
const numberPattern = /\d+/g
let tintMap = [];

initializeInnerContainers();

function initializeInnerContainers() {
    if(document.getElementsByClassName('topRowDiv').length === 0){
        initializeTopRow();
    }
    for (let i = 0; i < gridSize; i++){
        let rowContainer = document.createElement('div');
        populateRowIdentifiers(rowContainer, i);
        for (let j = 0; j < gridSize; j++) {
            let itemContainer = document.createElement('div');
            initializeItemDiv(itemContainer, i, j);
            rowContainer.appendChild(itemContainer);
        }
        outerContainer.appendChild(rowContainer);
    }
}

function populateRowIdentifiers(rowContainer, i) {
    rowContainer.className = rowContainerClassName;
    rowContainer.id = 'row' + i;
}

function initializeTopRow(){
    let topRow = document.createElement('div');
    topRow.className = 'topRowDiv';
    let reDrawButton = document.createElement('button');
    reDrawButton.textContent = 'Redraw';
    reDrawButton.addEventListener('click', () => {
        let allItemContainers = document.getElementsByClassName('itemContainer');
        for(var i = 0; i < allItemContainers.length; i++) {
            clearItemContainerSettings(allItemContainers, i);
        }
        let sizeInGridForm = parseInt(document.getElementsByClassName('scaleForm')[0].value);
        if(sizeInGridForm != gridSize){
            gridSize = sizeInGridForm;
            let rowElements = document.getElementsByClassName('rowContainer');
            for(var i = 0; i < rowElements.length; i++) {
                console.log("should remove");
                rowElements[i].parentNode.removeChild(rowElements[0]);
            }
            initializeInnerContainers();
            /*
            Remove all elements outside top row and call initialize to re-draw with the new scale.
            */
        }
    });
    let scaleForm = document.createElement('input');
    scaleForm.className = "scaleForm";
    scaleForm.defaultValue = gridSize;

    topRow.appendChild(reDrawButton);
    topRow.appendChild(scaleForm);
    outerContainer.appendChild(topRow);
}

function clearItemContainerSettings(allItemContainers, i) {
    allItemContainers[i].style.backgroundColor = 'white';
    allItemContainers[i].style.filter = "";
    tintMap[allItemContainers[i].id] = null;
}

function initializeItemDiv(itemContainer, i, j) {
    itemContainer.className = itemContainerClassName;
    setContainerId(i, itemContainer, j);
    itemContainer.addEventListener('mouseover', () => {
        executeHoverEffects(itemContainer);
    });
}

/*
Need to make this more dynamic but for now just using for > 10 rows
*/
function setContainerId(i, itemContainer, j) {
    itemContainer.id = i > 10 ? "0" : "";
    itemContainer.id += i.toString() + j.toString();
}

function executeHoverEffects(itemContainer) {
    let currentContainer = document.getElementById(itemContainer.id);
    randomizeColor(currentContainer);
    let tint = "";
    let tintNum = 0;
    if (null != tintMap[currentContainer.id]) {
        let tintString = tintMap[currentContainer.id];
        tint = tintString.match(numberPattern);
        let tintNum = parseInt(tint[0]);
        tintNum += 20;
        let newTintString = "grayscale(" + tintNum + "%)";
        tintMap[currentContainer.id] = newTintString;
    }
    else {
        tintMap[currentContainer.id] = "grayscale(0%)";
    }
    currentContainer.style.filter = tintMap[currentContainer.id];
    console.log(currentContainer.style.filter.toString());
}

function randomizeColor(currentContainer) {
    let color = getRandomColor();
    currentContainer.style.backgroundColor = color;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}