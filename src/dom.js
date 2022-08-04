/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const createContainer = () => {
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
};

const createBlock = (length) => {
  const size = 40.91;
  const block = document.createElement('div');
  block.classList.add('draggable');
  block.draggable = true;
  const random = Math.floor(Math.random() * 2);
  // change the appendable grids depending on length
  if (random === 1) {
    block.style.width = `${size}px`;
    block.style.height = `${size * length}px`;
  } else {
    block.style.width = `${size * length}px`;
    block.style.height = `${size}px`;
  }

  return block;
};

const addFuncs = (block, orientation) => {
  // activate these functions during dragstart
  // get length of block that is being dragged
  // change drop targets according to length
  const grids = document.querySelectorAll('.grid');
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

  grids.forEach((grid) => {
    grid.addEventListener('dragenter', dragEnter);
    grid.addEventListener('dragover', dragOver);
    grid.addEventListener('dragleave', dragLeave);
    grid.addEventListener('drop', drop);
  });

  block.addEventListener('click', () => {
    const grid = block.parentNode;
    const index = Array.prototype.indexOf.call(grids, grid);
    const pos = [];
    for (
      let k = 0;
      // prettier-ignore
      k < Math.round(
        (random === 1 ? block.offsetHeight : block.offsetWidth) / size
      );
      k++
    ) {
      pos.push(index + (random === 1 ? k * 10 : k));
    }
    console.log(pos.join(', '));
  });

  block.addEventListener('dragstart', (e) => {
    // add drag properties to grid on dragstart
    // follow percentage below for grids allowed to be placed on
    // remove drag properties on grids after dropping
    // add checker so blocks won't overlap
    e.target.classList.add('dragged');
    setTimeout(() => {
      e.target.classList.add('hide');
    }, 0);
  });
};

export { createContainer, createBlock, addFuncs };
