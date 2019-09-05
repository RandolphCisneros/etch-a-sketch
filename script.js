let outerContainer = document.getElementById('outerContainer');

const gridSize = 2;
const gridSquareClassName = "gridSquare";


initializeInnerContainers();

function initializeInnerContainers() {
    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j < gridSize; j++) {
            let gridDiv = document.createElement('div');
            gridDiv.className = gridSquareClassName;
            let currentId = i.toString() + j.toString();
            gridDiv.id = currentId;
            gridDiv.textContent = currentId;
            outerContainer.appendChild(gridDiv);
        }
    }
}