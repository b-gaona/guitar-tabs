const undoArray = [];
const redoArray = [];
let flag = true;

document.addEventListener("DOMContentLoaded", () => {
  putDataTabs();
  putDataStrings();
  putDataColumns();

  document.addEventListener("keydown", (evt) => {
    switch (evt.key) {
      case "t":
        saveCommand(addTab, deleteTab);
        addTab();
        updateDataInfo();
        break;
      case "q":
        undo();
        break;
      case "e":
        redo();
        break;
      case "Enter":
        saveCommand(addLine, deleteLine);
        addLine();
        updateDataInfo();
        break;
      case "l":
        saveCommand(addBlankCol, deleteBlankCol);
        addBlankCol();
        updateDataInfo();
        break;
    }
    const id = document.querySelector("#helper");
    id.textContent = JSON.stringify(undoArray);
    const id2 = document.querySelector("#helper2");
    id2.textContent = JSON.stringify(redoArray);
  });
});

function updateDataInfo() {
  putDataTabs();
  putDataColumns();
  putDataStrings();
}

function putDataTabs() {
  const tabs = document.querySelectorAll(".tabs");
  let cont = 1;

  tabs.forEach((tab) => {
    tab.setAttribute("data-tab", cont);
    cont++;
  });
}

function putDataColumns() {
  const tabs = document.querySelectorAll(".tabs__column");
  let cont = 1;

  tabs.forEach((tab) => {
    tab.setAttribute("data-col", cont);
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
    <span class="tabs__cell tabs__cell-active">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
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
  undoArray.push({
    action: {
      fn,
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

  if (lastCommand) {
    const fn = lastCommand.inverse.revFn;
    fn();

    addActiveCell(lastCommand.action.index);

    //We add the undo function to the redo array
    redoArray.push({
      action: {
        fn,
      },
      inverse: {
        revFn: lastCommand.action.fn,
      },
    });
  }
}

function redo() {
  const lastCommand = redoArray.pop();
  const currCell = document.querySelector(".tabs__cell-active");
  const col = currCell.parentElement;
  const tab = col.parentElement;

  if (lastCommand) {
    const fn = lastCommand.inverse.revFn;
    saveCommand(fn, lastCommand.action.fn, false); //False to avoid reset the redo

    if (undoArray.length > 0) {
      undoArray[undoArray.length - 1].action.index = {
        string: currCell.dataset.string,
        col: col.dataset.col,
        tab: tab.dataset.tab,
      };
    }

    fn();
    updateDataInfo();
  }
}

function addLine() {
  const currCell = document.querySelector(".tabs__cell-active");

  deleteActiveCell();

  const col = currCell.parentElement;
  const tab = col.parentElement;
  const newCol = document.createElement("div");
  newCol.classList.add("tabs__column");
  newCol.innerHTML = `
    <span class="tabs__cell tabs__cell-active">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
  `;
  tab.appendChild(newCol);
}

function deleteLine() {
  const currCell = document.querySelector(".tabs__cell-active");
  const col = currCell.parentElement;
  const tab = col.parentElement;

  tab.lastChild.remove();
}

function addBlankCol() {
  const currCell = document.querySelector(".tabs__cell-active");

  deleteActiveCell();

  const col = currCell.parentElement;
  const tab = col.parentElement;

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
    <span class="tabs__cell tabs__cell-active">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
    <span class="tabs__cell">-</span>
  `;

  tab.appendChild(blankCol);
  tab.appendChild(newCol);
}

function deleteBlankCol() {
  const currCell = document.querySelector(".tabs__cell-active");
  const col = currCell.parentElement;
  const tab = col.parentElement;

  tab.lastChild.remove();
  tab.lastChild.remove();
}

function deleteActiveCell() {
  const currCell = document.querySelector(".tabs__cell-active");
  const col = currCell.parentElement;
  const tab = col.parentElement;

  console.log(undoArray[0]);

  if (undoArray.length > 0) {
    undoArray[undoArray.length - 1].action.index = {
      string: currCell.dataset.string,
      col: col.dataset.col,
      tab: tab.dataset.tab,
      //activated: "del",
    };
  }
  currCell.classList.remove("tabs__cell-active");
}

function addActiveCell({ string, col, tab }) {
  const currTab = document.querySelector(`div[data-tab='${tab}']`);
  const currCol = currTab.querySelector(`div[data-col='${col}']`);
  const currString = currCol.querySelector(`span[data-string='${string}']`);

  currString.classList.add("tabs__cell-active");
}
