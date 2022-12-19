const undoArray = [];
const redoArray = [];
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
    }
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

  if (lastCommand) {
    const fn = lastCommand.inverse.revFn;
    fn();
    saveCommand(fn, lastCommand.action.fn, false); //False to avoid reset the redo
    updateDataInfo();
  }
}
