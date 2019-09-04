let outerContainer = document.getElementById('outerContainer');

const gridSize = 2;

initializeInnerContainers();

function initializeInnerContainers() {
    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j < gridSize; j++) {
            let currentId = i.toString() + j.toString();
        }
    }
}