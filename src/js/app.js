const MIN_STRING = "1";
const MAX_STRING = "6";
const MIN_COLUMN = "3";
const MAX_COLUMNS = "35";

const GUITAR_TECHNIQUES = [
  "h",
  "H",
  "p",
  "P",
  "/",
  "b",
  "B",
  "x",
  "X",
  "Backspace",
];

const undoArray = [];
const redoArray = [];

document.addEventListener("DOMContentLoaded", () => {
  updateDataInfo();

  document.addEventListener("keydown", (evt) => {
    const { string, col, tab } = getActiveCell();
    const { key, target } = evt;

    if (target.tagName === "BODY") {
      switch (key) {
        case "t":
        case "T":
          saveCommand(addTab, deleteTab);
          addTab();
          updateDataInfo();
          break;
        case "q":
        case "Q":
          undo();
          break;
        case "e":
        case "E":
          redo();
          break;
        case "Enter":
          if (col !== MAX_COLUMNS) {
            saveCommand(addLine, deleteLine);
            addLine();
            updateDataInfo();
          }
          break;
        case "l":
        case "L":
          saveCommand(addBlankCol, deleteBlankCol);
          addBlankCol();
          updateDataInfo();
          break;
        case "s":
        case "S":
        case "ArrowDown":
          if (
            (string === MAX_STRING && verifyTab(+tab + 1)) ||
            string !== MAX_STRING
          ) {
            saveCommand(moveDown, moveUp);
          }
          moveDown();
          break;
        case "w":
        case "W":
        case "ArrowUp":
          if (
            (string === MIN_STRING && verifyTab(+tab - 1)) ||
            string !== MIN_STRING
          ) {
            saveCommand(moveUp, moveDown);
          }
          moveUp();
          break;
        case "a":
        case "A":
        case "ArrowLeft":
          if (col !== MIN_COLUMN) {
            saveCommand(moveLeft, moveRight);
            moveLeft();
          }
          break;
        case "d":
        case "D":
        case "ArrowRight":
          if (col !== MAX_COLUMNS) {
            saveCommand(moveRight, moveLeft);
            moveRight();
          }
          break;
      }

      if (!isNaN(key) || GUITAR_TECHNIQUES.includes(key)) {
        typeNotes(key);
      }
    }
  });
});

function updateDataInfo() {
  putDataTabs();
  putDataStrings();
}

function putDataTabs() {
  const tabs = document.querySelectorAll(".tabs");
  let cont = 1;

  tabs.forEach((tab) => {
    putDataColumns(tab);
    tab.setAttribute("data-tab", cont);
    cont++;
  });
}

function putDataColumns(tab) {
  const columns = tab.querySelectorAll(".tabs__column");
  let cont = 1;

  columns.forEach((col) => {
    col.setAttribute("data-col", cont);
    cont++;
  });
}

function putDataStrings() {
  const tabs = document.querySelectorAll(".tabs__column .tabs__cell");
  let cont = 1;

  tabs.forEach((tab) => {
    tab.setAttribute("data-string", cont);
    cont++;

    if (cont == 7) {
      cont = 1;
    }
  });
}

function addTab() {
  deleteActiveCell();

  const section = document.querySelector(".content__tabs");
  const newTab = document.createElement("div");

  newTab.classList.add("tabs");

  newTab.innerHTML = `
  <div class="tabs__column">
    <span class="tabs__cell">E</span>
    <span class="tabs__cell">B</span>
    <span class="tabs__cell">G</span>
    <span class="tabs__cell">D</span>
    <span class="tabs__cell">A</span>
    <span class="tabs__cell">E</span>
  </div>
  <div class="tabs__column">
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
  </div>
  <div class="tabs__column">
    <span class="tabs__cell tabs__cell-active">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
  </div>
  `;

  section.appendChild(newTab);
}

function deleteTab() {
  const section = document.querySelector(".content__tabs");
  const lastChild = section.lastChild;
  lastChild.remove();
}

function saveCommand(fn, revFn, keep = true) {
  const { cellElement } = getActiveCell();
  undoArray.push({
    action: {
      fn,
      key: cellElement.textContent,
    },
    inverse: {
      revFn,
    },
  });

  //When something it's added the the redo array is restarted. This because we only need the redo after a undo, not after adding something.
  if (keep) {
    redoArray.length = 0;
  }
}

function undo() {
  const lastCommand = undoArray.pop();

  const { cellElement } = getActiveCell();
  const key = cellElement.textContent;
  cellElement.textContent = "—";

  if (lastCommand) {
    const fn = lastCommand.inverse.revFn;

    const result = fn();

    //We add this conditional to avoid multiple calls to the addActiveCell function. The function that is going to be called is the one that is inside fn()
    if (result !== "move") {
      addActiveCell(lastCommand.action.index);
    }

    //We add the undo function to the redo array
    redoArray.push({
      action: {
        fn,
        key,
      },
      inverse: {
        revFn: lastCommand.action.fn,
      },
    });
  }
}

function redo() {
  const lastCommand = redoArray.pop();
  const { string, col, tab } = getActiveCell();

  if (lastCommand) {
    const fn = lastCommand.inverse.revFn;
    saveCommand(fn, lastCommand.action.fn, false); //False to avoid reset the redo

    modifyUndoArray({ string, col, tab });

    fn();
    typeNotes(lastCommand.action.key);
    updateDataInfo();
  }
}

function addLine() {
  const { tabElement } = getActiveCell();

  if (!verifyColumn(tabElement, MAX_COLUMNS)) {
    deleteActiveCell();
    const newCol = document.createElement("div");
    newCol.classList.add("tabs__column");
    newCol.innerHTML = `
    <span class="tabs__cell tabs__cell-active">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
  `;
    tabElement.appendChild(newCol);
  }
}

function deleteLine() {
  const { tabElement } = getActiveCell();

  tabElement.lastChild.remove();
}

function addBlankCol() {
  const { tabElement } = getActiveCell();

  deleteActiveCell();

  const blankCol = document.createElement("div");
  const newCol = document.createElement("div");

  blankCol.classList.add("tabs__column");
  newCol.classList.add("tabs__column");

  blankCol.innerHTML = `
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
    <span class="tabs__cell">|</span>
  `;

  newCol.innerHTML = `
    <span class="tabs__cell tabs__cell-active">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
    <span class="tabs__cell">—</span>
  `;

  tabElement.appendChild(blankCol);
  tabElement.appendChild(newCol);
}

function deleteBlankCol() {
  const { tabElement } = getActiveCell();

  tabElement.lastChild.remove();
  tabElement.lastChild.remove();
}

function deleteActiveCell() {
  const { cellElement, string, col, tab } = getActiveCell();

  modifyUndoArray({ string, col, tab });

  cellElement.classList.remove("tabs__cell-active");
}

function addActiveCell({ string, col, tab }) {
  const currTab = document.querySelector(`div[data-tab='${tab}']`);
  const currCol = currTab.querySelector(`div[data-col='${col}']`);
  const currString = currCol.querySelector(`span[data-string='${string}']`);

  currString.classList.add("tabs__cell-active");
}

function getActiveCell() {
  const cell = document.querySelector(".tabs__cell-active");
  const col = cell.parentElement;
  const tab = col.parentElement;

  return {
    string: cell.dataset.string,
    col: col.dataset.col,
    tab: tab.dataset.tab,
    tabElement: tab,
    colElement: col,
    cellElement: cell,
  };
}

function moveDown() {
  const { cellElement, string, col, tab } = getActiveCell();

  if (string !== MAX_STRING) {
    modifyUndoArray({ string, col, tab });
    cellElement.classList.remove("tabs__cell-active");
    addActiveCell({ string: +string + 1, col, tab });
  } else if (verifyTab(+tab + 1)) {
    cellElement.classList.remove("tabs__cell-active");
    addActiveCell({ string: MIN_STRING, col: MIN_COLUMN, tab: +tab + 1 });
  }
  return "move";
}

function moveUp() {
  const { cellElement, string, col, tab } = getActiveCell();

  if (string !== MIN_STRING) {
    cellElement.classList.remove("tabs__cell-active");
    addActiveCell({ string: +string - 1, col, tab });
  } else if (verifyTab(+tab - 1)) {
    cellElement.classList.remove("tabs__cell-active");
    addActiveCell({ string: MAX_STRING, col: MIN_COLUMN, tab: +tab - 1 });
  }
  return "move";
}

function moveRight() {
  const { tabElement, cellElement, string, col, tab } = getActiveCell();

  if (col !== MAX_COLUMNS) {
    cellElement.classList.remove("tabs__cell-active");
    if (verifyColumn(tabElement, +col + 1)) {
      addActiveCell({ string, col: +col + 1, tab });
    } else {
      addActiveCell({ string, col, tab });
    }
  }
  return "move";
}

function moveLeft() {
  const { tabElement, cellElement, string, col, tab } = getActiveCell();

  if (col !== MIN_COLUMN) {
    cellElement.classList.remove("tabs__cell-active");
    if (verifyColumn(tabElement, +col - 1)) {
      addActiveCell({ string, col: +col - 1, tab });
    } else {
      addActiveCell({ string, col, tab });
    }
  }
  return "move";
}

function verifyColumn(tabElement, col) {
  return tabElement.querySelector(`div[data-col='${col}']`);
}

function verifyTab(tab) {
  return document.querySelector(`div[data-tab='${tab}']`);
}

function typeNotes(note) {
  const { cellElement } = getActiveCell();
  const txt = cellElement.textContent;

  if (txt !== "|" && note !== " ") {
    if (note !== "Backspace") {
      cellElement.textContent = txt.replace("—", "") + note;
      return;
    }

    if (txt.length !== 1) {
      cellElement.textContent = txt.substring(0, txt.length - 1);
      return;
    }

    cellElement.textContent = "—";
  }
}

function modifyUndoArray({ string, col, tab }) {
  if (undoArray.length > 0) {
    undoArray[undoArray.length - 1].action.index = { string, col, tab };
  }
}
