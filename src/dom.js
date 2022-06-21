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
}

function createBlocks() {
  const block = document.createElement('div');
  const btn = document.querySelector('button');
  block.classList.add('draggable');
  document.querySelector('.gameboard').appendChild(block);

  block.draggable = true;
  block.style.left = `${Math.floor(Math.random() * 8 + 1) * 10}%`;
  block.style.top = '0%'; // `${Math.floor(Math.random() * 9 + 1) * 10}%`;
  console.log(block.style.left, block.style.top);

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
