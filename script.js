let outerContainer = document.getElementById('screenContainer');

let gridSize = 12;
const rowContainerClassName = 'rowContainer';
const itemContainerClassName = 'itemContainer';
const numberPattern = /\d+/g
let tintMap = [];

initializeInnerContainers();

function initializeInnerContainers() {
    if(document.getElementsByClassName('topRowDiv').length === 0){
        initializeTopRow();
    }
    for (let i = 0; i < gridSize; i++){
        let rowContainer = document.createElement('div');
        rowContainer.className = rowContainerClassName;
        rowContainer.id = 'row' + i;

        for (let j = 0; j < gridSize; j++) {
            let itemContainer = document.createElement('div');
            itemContainer.className = itemContainerClassName;
            initializeGridDivs(itemContainer, i, j);
            rowContainer.appendChild(itemContainer);
        }
        outerContainer.appendChild(rowContainer);
    }
}

function initializeTopRow(){
    let topRow = document.createElement('div');
    topRow.className = 'topRowDiv';
    let reDrawButton = document.createElement('button');
    reDrawButton.textContent = 'Redraw';
    reDrawButton.addEventListener('click', () => {
        let allContainers = document.getElementsByClassName('itemContainer');
        for(var i = 0; i < allContainers.length; i++) {
            allContainers[i].style.backgroundColor = 'white';
            allContainers[i].style.filter = "";
            tintMap[allContainers[i].id] = null;
        }
        if(document.getElementsByClassName('scaleForm')[0].innerHTML != gridSize){
            console.log('Changed');
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

function initializeGridDivs(itemContainer, i, j) {
    itemContainer.id = i.toString() + j.toString();
    itemContainer.textContent = '';
    itemContainer.addEventListener('mouseover', () => {
        executeHoverEffects(itemContainer);
    });
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