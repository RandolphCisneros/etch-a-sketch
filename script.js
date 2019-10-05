let outerContainer = document.getElementById('outerContainer');

const gridSize = 3;
const gridSquareClassName = "gridSquare";
const rowClassName = 'rowContainer';


initializeInnerContainers();

function initializeInnerContainers() {
    for (let i = 0; i < gridSize; i++){
        let rowDiv = document.createElement('div');
        rowDiv.className = rowClassName;
        rowDiv.id = 'row' + i;

        for (let j = 0; j < gridSize; j++) {
            let gridDiv = document.createElement('div');
            gridDiv.className = gridSquareClassName;
            let currentId = i.toString() + j.toString();
            gridDiv.id = currentId;
            gridDiv.textContent = currentId;
            rowDiv.appendChild(gridDiv);
        }
        let lineBreak = document.createElement('br');
        rowDiv.appendChild(lineBreak);
        outerContainer.appendChild(rowDiv);
    }
}