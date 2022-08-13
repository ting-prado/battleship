/* eslint-disable default-case */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const createContainer = (player) => {
  const alphLabel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const containersDiv = document.querySelector('.containers');
  const container = document.createElement('div');
  const gameboard = document.createElement('div');
  const topCont = document.createElement('div');
  const sideCont = document.createElement('div');
  container.classList.add('container');
  gameboard.classList.add('gameboard');
  topCont.classList.add('topCont');
  sideCont.classList.add('sideCont');

  containersDiv.appendChild(container);
  container.appendChild(gameboard);
  container.appendChild(topCont);
  container.appendChild(sideCont);

  for (let i = 0; i < 100; i++) {
    const span = document.createElement('span');
    span.classList.add(player.type === 'human' ? 'grid' : 'aigrid');
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

const createBlock = (player, length) => {
  const size = 40.91;
  const block = document.createElement('div');
  if (player.type === 'human') {
    block.classList.add('draggable');
    block.draggable = true;
  } else {
    block.classList.add('aiblock');
    block.style.visibility = 'hidden';
  }
  const random = Math.floor(Math.random() * 2);
  if (random === 1) {
    block.style.width = `${size}px`;
    block.style.height = `${size * length}px`;
  } else {
    block.style.width = `${size * length}px`;
    block.style.height = `${size}px`;
  }

  return block;
};

const getOptions = (block) => {
  const arr = [];
  if (block.orientation === 'portrait') {
    switch (block.length) {
      case 4:
        for (let i = 0; i < 70; i++) {
          arr.push(i);
        }
        break;
      case 3:
        for (let i = 0; i < 80; i++) {
          arr.push(i);
        }
        break;
      case 2:
        for (let i = 0; i < 90; i++) {
          arr.push(i);
        }
        break;
      case 1:
        for (let i = 0; i < 100; i++) {
          arr.push(i);
        }
        break;
    }
  } else {
    let limits;
    switch (block.length) {
      case 4:
        limits = [7, 8, 9];
        break;
      case 3:
        limits = [8, 9];
        break;
      case 2:
        limits = [9];
        break;
    }
    for (let i = 0; i < 100; i++) {
      const numStr = i.toString();
      let avail = true;
      limits.forEach((num) => {
        if (i === num || numStr[1] == num) {
          avail = false;
        }
      });
      if (avail) {
        arr.push(i);
      }
    }
  }
  return arr;
};

const getNewPos = (block, startingPt) => {
  const newPos = [];
  // prettier-ignore
  for (let j = 0; j < block.length; j++) {
    newPos.push(
      startingPt + (block.orientation === 'portrait' ? j * 10 : j)
    );
  }
  return newPos;
};

const checkPos = (mode, player, pos, oldPos) => {
  let avail = true;
  const arr = player.gameboard.getAllPos();
  if (mode === 'existing') {
    for (let i = 0; i < oldPos.length; i++) {
      arr.splice(arr.indexOf(oldPos[i]), 1);
    }
  }
  pos.forEach((item) => {
    if (arr.includes(item)) {
      avail = false;
    }
  });
  return avail;
};

const addBlockEvents = (block, ship, player) => {
  const options = getOptions(block);
  const grids = document.querySelectorAll('.grid');
  // activate these functions during dragstart
  // get length of block that is being dragged
  // change drop targets according to block length and orientation
  const dragEnter = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('droppable')) {
      e.target.classList.add('drag-over');
    }
  };

  // add drag&drop properties to all grids
  // get block previous position on dragstart
  // add specific class on non-droppable grids
  // check if grid is included in options when dragging over/dropping
  // if yes, add drag-over class and allow drop
  // if no, do not display drag-over class
  // also check if the rest of the block occupies another block
  // if yes, return block to previous position
  // if a block is dropped on non-option grid,
  // return block to previous position
  const dragOver = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('droppable')) {
      e.target.classList.add('drag-over');
    }
  };

  const dragLeave = (e) => {
    e.target.classList.remove('drag-over');
  };

  const drop = (e) => {
    e.target.classList.remove('drag-over');
    const dragged = document.querySelector('.dragged');
    let newPos;
    if (e.target.classList.contains('grid')) {
      newPos = getNewPos(block, Array.prototype.indexOf.call(grids, e.target));
      const avail = checkPos('existing', player, newPos, block.pos);
      if (avail && e.target.classList.contains('droppable')) {
        e.target.appendChild(dragged);
        ship.changePos(newPos);
        block.pos = newPos;
      } else {
        grids[block.pos[0]].appendChild(dragged);
      }
    } else {
      grids[block.pos[0]].appendChild(dragged);
    }

    dragged.classList.remove('hide');
    dragged.classList.remove('dragged');
    grids.forEach((grid) => {
      grid.classList.remove('droppable');
      grid.classList.remove('non-droppable');
      grid.removeEventListener('dragenter', dragEnter);
      grid.removeEventListener('dragover', dragOver);
      grid.removeEventListener('dragleave', dragLeave);
      grid.removeEventListener('drop', drop);
    });
  };

  block.addEventListener('dragstart', (e) => {
    // add drag properties to grid on dragstart
    // follow percentage below for grids allowed to be placed on
    // remove drag properties on grids after dropping
    // add checker so blocks won't overlap
    e.target.classList.add('dragged');
    let j = 0;
    for (let i = 0; i < 100; i++) {
      if (i === options[j]) {
        grids[i].classList.add('droppable');
        j++;
      } else {
        grids[i].classList.add('non-droppable');
      }
    }
    grids.forEach((grid) => {
      grid.addEventListener('dragenter', dragEnter);
      grid.addEventListener('dragover', dragOver);
      grid.addEventListener('dragleave', dragLeave);
      grid.addEventListener('drop', drop);
    });
    setTimeout(() => {
      e.target.classList.add('hide');
    }, 0);
  });
};

const removeBlockEvents = () => {
  const blocks = document.querySelectorAll('.draggable');
  blocks.forEach((block) => {
    const clone = block.cloneNode(true);
    clone.draggable = false;
    clone.style.cursor = 'auto';
    block.parentNode.replaceChild(clone, block);
  });
};

export {
  createContainer,
  createBlock,
  addBlockEvents,
  removeBlockEvents,
  getNewPos,
  getOptions,
  checkPos,
};
