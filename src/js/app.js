const commands = [];

document.addEventListener("DOMContentLoaded", () => {
  putDataTabs();
  putDataStrings();
  putDataColumns();

  document.addEventListener("keydown", (evt) => {
    switch (evt.key) {
      case "t":
        addTab();
        break;
      case "q":
        console.log("Undo");
        break;
      case "e":
        console.log("Redo");
        break;
    }
  });
});

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

function saveCommand(evt) {
  commands.push({

  })
}