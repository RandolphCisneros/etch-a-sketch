let outerContainer = document.getElementById('screenContainer');

const gridSize = 3;
const rowContainerClassName = 'rowContainer';
const itemContainerClassName = 'itemContainer';

initializeInnerContainers();

function initializeInnerContainers() {
    for (let i = 0; i < gridSize; i++){
        let rowContainer = document.createElement('div');
        rowContainer.className = rowContainerClassName;
        rowContainer.id = 'row' + i;
        //rowContainer.textContent = 'row' + i;

        for (let j = 0; j < gridSize; j++) {
            let itemContainer = document.createElement('div');
            itemContainer.className = itemContainerClassName;
            let currentId = i.toString() + j.toString();
            itemContainer.id = currentId;
            itemContainer.textContent = '';
            itemContainer.addEventListener('mouseover', () => {
                let currentContainer = document.getElementById(itemContainer.id);
                console.log(contId.id);
            });
            rowContainer.appendChild(itemContainer);
        }
        let lineBreak = document.createElement('br');
        rowContainer.appendChild(lineBreak);
        outerContainer.appendChild(rowContainer);
    }
}