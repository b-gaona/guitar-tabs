const undoArray=[],redoArray=[];let flag=!0;function updateDataInfo(){putDataTabs(),putDataColumns(),putDataStrings()}function putDataTabs(){const a=document.querySelectorAll(".tabs");let e=1;a.forEach(a=>{a.setAttribute("data-tab",e),e++})}function putDataColumns(){const a=document.querySelectorAll(".tabs__column");let e=1;a.forEach(a=>{a.setAttribute("data-col",e),e++})}function putDataStrings(){const a=document.querySelectorAll(".tabs__column .tabs__cell");let e=1;a.forEach(a=>{a.setAttribute("data-string",e),e++,7==e&&(e=1)})}function addTab(){deleteActiveCell();const a=document.querySelector(".content__tabs"),e=document.createElement("div");e.classList.add("tabs"),e.innerHTML='\n  <div class="tabs__column">\n    <span class="tabs__cell">E</span>\n    <span class="tabs__cell">B</span>\n    <span class="tabs__cell">G</span>\n    <span class="tabs__cell">D</span>\n    <span class="tabs__cell">A</span>\n    <span class="tabs__cell">E</span>\n  </div>\n  <div class="tabs__column">\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n  </div>\n  <div class="tabs__column">\n    <span class="tabs__cell tabs__cell-active">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n  </div>\n  ',a.appendChild(e)}function deleteTab(){document.querySelector(".content__tabs").lastChild.remove()}function saveCommand(a,e,n=!0){undoArray.push({action:{fn:a},inverse:{revFn:e}}),n&&(redoArray.length=0)}function undo(){const a=undoArray.pop();if(a){const e=a.inverse.revFn;e(),addActiveCell(a.action.index),redoArray.push({action:{fn:e},inverse:{revFn:a.action.fn}})}}function redo(){const a=redoArray.pop(),e=document.querySelector(".tabs__cell-active"),n=e.parentElement,t=n.parentElement;if(a){const s=a.inverse.revFn;saveCommand(s,a.action.fn,!1),undoArray.length>0&&(undoArray[undoArray.length-1].action.index={string:e.dataset.string,col:n.dataset.col,tab:t.dataset.tab}),s(),updateDataInfo()}}function addLine(){const a=document.querySelector(".tabs__cell-active");deleteActiveCell();const e=a.parentElement.parentElement,n=document.createElement("div");n.classList.add("tabs__column"),n.innerHTML='\n    <span class="tabs__cell tabs__cell-active">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n  ',e.appendChild(n)}function deleteLine(){document.querySelector(".tabs__cell-active").parentElement.parentElement.lastChild.remove()}function addBlankCol(){const a=document.querySelector(".tabs__cell-active");deleteActiveCell();const e=a.parentElement.parentElement,n=document.createElement("div"),t=document.createElement("div");n.classList.add("tabs__column"),t.classList.add("tabs__column"),n.innerHTML='\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n  ',t.innerHTML='\n    <span class="tabs__cell tabs__cell-active">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n    <span class="tabs__cell">-</span>\n  ',e.appendChild(n),e.appendChild(t)}function deleteBlankCol(){const a=document.querySelector(".tabs__cell-active").parentElement.parentElement;a.lastChild.remove(),a.lastChild.remove()}function deleteActiveCell(){const a=document.querySelector(".tabs__cell-active"),e=a.parentElement,n=e.parentElement;console.log(undoArray[0]),undoArray.length>0&&(undoArray[undoArray.length-1].action.index={string:a.dataset.string,col:e.dataset.col,tab:n.dataset.tab}),a.classList.remove("tabs__cell-active")}function addActiveCell({string:a,col:e,tab:n}){document.querySelector(`div[data-tab='${n}']`).querySelector(`div[data-col='${e}']`).querySelector(`span[data-string='${a}']`).classList.add("tabs__cell-active")}document.addEventListener("DOMContentLoaded",()=>{putDataTabs(),putDataStrings(),putDataColumns(),document.addEventListener("keydown",a=>{switch(a.key){case"t":saveCommand(addTab,deleteTab),addTab(),updateDataInfo();break;case"q":undo();break;case"e":redo();break;case"Enter":saveCommand(addLine,deleteLine),addLine(),updateDataInfo();break;case"l":saveCommand(addBlankCol,deleteBlankCol),addBlankCol(),updateDataInfo()}document.querySelector("#helper").textContent=JSON.stringify(undoArray);document.querySelector("#helper2").textContent=JSON.stringify(redoArray)})});
//# sourceMappingURL=app.js.map
