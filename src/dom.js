/* eslint-disable no-console */
/* eslint-disable no-plusplus */
function createContainer() {
  const alphLabel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const container = document.createElement('div');
  const gameboard = document.createElement('div');
  const topCont = document.createElement('div');
  const sideCont = document.createElement('div');
  container.classList.add('container');
  gameboard.classList.add('gameboard');
  topCont.classList.add('topCont');
  sideCont.classList.add('sideCont');

  document.querySelector('body').appendChild(container);
  container.appendChild(gameboard);
  container.appendChild(topCont);
  container.appendChild(sideCont);

  for (let i = 0; i < 100; i++) {
    const span = document.createElement('span');
    span.classList.add('grid');
    gameboard.appendChild(span);
  }

  for (let i = 0; i < alphLabel.length; i++) {
    const topSpan = document.createElement('span');
    topSpan.textContent = alphLabel[i];
    topCont.appendChild(topSpan);

    const sideSpan = document.createElement('span');
    sideSpan.textContent = i + 1;
    sideCont.appendChild(sideSpan);
  }

  const dragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
  };

  const dragOver = (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
  };

  const dragLeave = (e) => {
    e.target.classList.remove('drag-over');
  };

  const drop = (e) => {
    e.target.classList.remove('drag-over');

    const dragged = document.querySelector('.dragged');

    e.target.appendChild(dragged);
    dragged.classList.remove('hide');
    dragged.classList.remove('dragged');
  };

  const grids = document.querySelectorAll('.gameboard > span');
  grids.forEach((grid) => {
    grid.addEventListener('dragenter', dragEnter);
    grid.addEventListener('dragover', dragOver);
    grid.addEventListener('dragleave', dragLeave);
    grid.addEventListener('drop', drop);
  });
}

function createBlocks() {
  const block = document.createElement('div');
  const btn = document.querySelector('button');
  block.classList.add('draggable');
  const grids = document.querySelectorAll('.grid');
  grids[Math.floor(Math.random() * 100)].appendChild(block);

  block.draggable = true;
  // randomize either height or width gets multiplied instead of rotating
  // length 4, vertical, left 0 - 90%; top 0 - 60%
  // length 3, vertical, left 0 - 90%, top 0 - 70%
  // length 2, vertical, left 0 - 90%, top 0 - 80%
  // length 4, horizontal, left 0 - 60%, top 0 - 90%
  // length 3, horizontal, left 0 - 70%, top 0 - 90%
  // length 2, horizontal, left 0 - 80%, top 0 - 90%
  // length 1, left 0 - 90%, top 0 - 90%
  const min = Math.ceil(1); // inclusive
  const max = Math.floor(8); // exclusive
  // block.style.left = '10%'; // `${Math.floor(Math.random() * (max - min) + min) * 10}%`;
  // block.style.top = '70%'; // `${Math.floor(Math.random() * (max - min) + min) * 10}%`;

  block.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragged');
    setTimeout(() => {
      e.target.classList.add('hide');
    }, 0);
  });

  btn.addEventListener('click', () => {
    const pos = block.getBoundingClientRect();
    const width = Math.ceil(pos.width / 40.91);
    const height = Math.ceil(pos.height / 40.91);
    const posTop = Math.floor(pos.top / 40.91) - 1;
    const posLeft = Math.floor(pos.left / 40.91) - 7;

    if (width > 1 || height > 1) {
      if (height > 1) {
        for (let i = 0; i < height; i++) {
          console.log(posLeft, posTop + i);
        }
      } else if (width > 1) {
        for (let i = 0; i < width; i++) {
          console.log(posLeft + i, posTop);
        }
      }
    } else {
      console.log(posLeft, posTop);
    }
  });
}

export { createContainer, createBlocks };
