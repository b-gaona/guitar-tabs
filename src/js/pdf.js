function getColumnsWidth() {
  const tabs = document.querySelectorAll(".tabs");
  let sumArray = [];

  for (let i = 0; i < tabs.length; i++) {
    const cols = tabs[i].querySelectorAll(".tabs__column");
    sumArray[i] = 0;
    cols.forEach((col) => {
      sumArray[i] += +col.clientWidth;
    });
  }

  return Math.max(...sumArray);
}

function addingCapoAndInfo(copy) {
  const flexHeading = copy.querySelector("#heading");
  const capo = document.querySelector("#capo");
  const info = document.querySelector("#info");

  if (capo.value !== "") {
    const p = document.createElement("p");
    p.textContent = `Capo: ${capo.value}`;
    p.style.fontSize = "14px";
    p.style.fontWeight = "700";
    flexHeading.appendChild(p);
  }
  if (info.value !== "") {
    const p = document.createElement("p");
    p.textContent = `Info: ${info.value}`;
    p.style.fontSize = "14px";
    p.style.fontWeight = "700";
    flexHeading.appendChild(p);
  }
}

function modifyTextAndColors(copy, heading, songName) {
  copy.style.color = "black";
  heading.style.color = "black";
  heading.style.fontSize = "24px";
  heading.textContent = `GUITAR TABS: ${songName.value}`;

  copy.style.fontSize = "12px";

  if (getColumnsWidth() > 832) {
    copy.style.fontSize = "10px";
  }

  copy.querySelector(".content__description").style.display = "none";
}

function modifyStructure(copy, songName) {
  const heading = copy.querySelector(".main__heading");

  addingCapoAndInfo(copy);
  modifyTextAndColors(copy, heading, songName);
  removeActiveCell(copy);
}

function removeActiveCell(copy) {
  const activeCell = copy.querySelector(".tabs__cell-active");
  activeCell.classList.remove("tabs__cell-active");
}

function createFilename(songName) {
  return songName.value !== "" ? songName.value.toLowerCase() : "guitar_tabs";
}

function print() {
  const doc = document.querySelector(".content__tabs");
  const songName = document.querySelector("#songName");

  const copy = document.createElement("div");
  copy.classList.add("content__tabs");
  copy.innerHTML = doc.innerHTML;

  modifyStructure(copy, songName);

  const fileName = createFilename(songName);

  html2pdf()
    .set({
      margin: 1,
      filename: fileName,
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 3,
        letterRendering: true,
      },
      jsPDF: {
        unit: "cm",
        width: "21.6",
        height: "27.9",
        orientation: "portrait",
      },
    })
    .from(copy)
    .save()
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Saved");
    });
}
