const ROWS = document.querySelectorAll('tr');
const ROWS_ARRAY = Array.apply(null, ROWS);
let grid = document.querySelector('.grid');
let reset = document.querySelectorAll('.reset');
const MODAL = document.querySelector('.modal');
const MODAL_TEXT = document.querySelector('.modal__text');
const WRAPPER = document.querySelector('.wrapper');

reset.forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    location.reload();
  })
});

grid.addEventListener('click', (e)=>{
  if(!grid.cnt){
    grid.cnt = 1;
  }

    if ( !e.target.classList.contains("dirty")){
      if(grid.cnt){
        ++grid.cnt;
      }
      let text = grid.cnt%2==0 ? 'x': 'o';
      e.target.innerText  = text;
      e.target.classList.add("dirty");
      e.target.classList.add(text);
    }
    checkBoxes();
});

const checkBoxes = ()=>{
  let flag = checkRows();
  if (!flag){
    flag = checkCols();
    if (!flag){
      checkDiagonals();
    }
  }
};
const checkRows =()=>{
  ROWS.forEach(row => {
    let boxes = [  ...Array.apply(null, row.querySelectorAll('td'))];
    checkWin(boxes);
  });
};

const checkWin =(boxes)=>{
  let winX = boxes.every(box=>{
    return box.classList.contains("x")
  });
  let winO = boxes.every(box=>{
    return box.classList.contains("o")
  });

  if (winX) {
    showModal('Победили Крестики');
  }
  if (winO) {
    showModal('Победили Нолики');
  }
  const BOXES = Array.apply(null,document.querySelectorAll('.box'));

  let draw = BOXES.every(box=>{
    return box.classList.contains("dirty")
  });
  if (draw ) {
    showModal('НИЧЬЯ');
  }
 return false;
};

const checkCols =()=>{
  console.log('checkCols');
  const boxes = [];
  ROWS.forEach(row=>{
    boxes.push(row.querySelector('td'))
  });
  return checkWin(boxes);
};
const checkDiagonals = ()=>{
  console.log('checkDiagonals');
  let boxesTLToBR = ROWS_ARRAY.map((row, i)=>{
    return (row.querySelectorAll('td'))[i];
  });
  let boxesTRToBL = ROWS_ARRAY.map((row, i)=>{
    return (row.querySelectorAll('td'))[ROWS_ARRAY.length -1 - i];
  });
  checkWin(boxesTLToBR);
  checkWin(boxesTRToBL);
};
const showModal = (text)=>{
  MODAL.classList.add('open');
  WRAPPER.classList.add('open');
  MODAL_TEXT.innerText = text;
};