let screenContainer = document.getElementById('screenContainer');
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
    for (var i = 0; i < gridSize; i++){
        let rowContainer = document.createElement('div');
        populateRowIdentifiers(rowContainer, i);
        for (var j = 0; j < gridSize; j++) {
            let itemContainer = document.createElement('div');
            initializeItemDiv(itemContainer, i, j);
            rowContainer.appendChild(itemContainer);
        }
        screenContainer.appendChild(rowContainer);
    }
    let allRows = document.getElementsByClassName('rowContainer');
    console.log(allRows.length);
}

function populateRowIdentifiers(rowContainer, i) {
    rowContainer.className = rowContainerClassName;
    rowContainer.id = 'row' + i;
}

function initializeTopRow(){
    let topRow = document.createElement('div');
    topRow.className = 'topRowDiv';
    let reDrawButton = document.createElement('button');
    let scaleForm = document.createElement('input');
    initializeReDrawButton(reDrawButton);
    initializeScaleForm(scaleForm);

    topRow.appendChild(reDrawButton);
    topRow.appendChild(scaleForm);
    screenContainer.appendChild(topRow);
}

function initializeReDrawButton(reDrawButton) {
    reDrawButton.textContent = 'Redraw';
    reDrawButton.addEventListener('click', () => {
        reDraw();
    });
}

function reDraw() {
    let allItemContainers = document.getElementsByClassName('itemContainer');
    for (var i = 0; i < allItemContainers.length; i++) {
        clearItemContainerSettings(allItemContainers, i);
    }
    let sizeInGridForm = parseInt(document.getElementsByClassName('scaleForm')[0].value);
    if (sizeInGridForm != gridSize) {
        gridSize = sizeInGridForm;
        let rowElements = Array.from(document.getElementsByClassName('rowContainer'));
        for(var i = 0; i < rowElements.length; i++) {
            if(rowElements[i].className == 'rowContainer'){
                screenContainer.removeChild(rowElements[i]);
            }
        }
        initializeInnerContainers();
    }
}

function initializeScaleForm(scaleForm) {
    scaleForm.className = "scaleForm";
    scaleForm.defaultValue = gridSize;
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
    if (null != tintMap[currentContainer.id]) {
        tint = addTint(currentContainer, tint);
    }
    else {
        tintMap[currentContainer.id] = "grayscale(0%)";
    }
    currentContainer.style.filter = tintMap[currentContainer.id];
}

/*
Adding grayscale for now. Would be better to darken
*/
function addTint(currentContainer, tint) {
    let tintString = tintMap[currentContainer.id];
    tint = tintString.match(numberPattern);
    let tintNum = parseInt(tint[0]);
    tintNum += 20;
    let newTintString = "grayscale(" + tintNum + "%)";
    tintMap[currentContainer.id] = newTintString;
    return tint;
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