let outerContainer = document.getElementById('screenContainer');

const gridSize = 64;
const rowContainerClassName = 'rowContainer';
const itemContainerClassName = 'itemContainer';
const numberPattern = /\d+/g
let tintMap = [];

initializeInnerContainers();

function initializeInnerContainers() {
    for (let i = 0; i < gridSize; i++){
        let rowContainer = document.createElement('div');
        rowContainer.className = rowContainerClassName;
        rowContainer.id = 'row' + i;

        for (let j = 0; j < gridSize; j++) {
            let itemContainer = document.createElement('div');
            itemContainer.className = itemContainerClassName;
            itemContainer.id = i.toString() + j.toString();
            itemContainer.textContent = '';
            itemContainer.addEventListener('mouseover', () => {
                let currentContainer = document.getElementById(itemContainer.id);
                let color = getRandomColor();
                let tint = "";
                let tintNum = 0;
                currentContainer.style.backgroundColor = color;
                if(null != tintMap[currentContainer.id]) {
                    let tintString = tintMap[currentContainer.id];
                    tint = tintString.match(numberPattern);
                    let tintNum = parseInt(tint[0]);
                    tintNum += 50;
                    let newTintString = "grayscale(" + tintNum + "%)";
                    tintMap[currentContainer.id] = newTintString;
                } else {
                    tintMap[currentContainer.id] = "grayscale(0%)";
                }
                currentContainer.style.filter = tintMap[currentContainer.id];
                //console.log(tintMap[currentContainer.id]);
                console.log(currentContainer.style.filter.toString());
            });
            rowContainer.appendChild(itemContainer);
        }
        let lineBreak = document.createElement('br');
        rowContainer.appendChild(lineBreak);
        outerContainer.appendChild(rowContainer);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}