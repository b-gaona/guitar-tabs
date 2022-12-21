const undoArray=[],redoArray=[],MAX_COLUMNS="35",GUITAR_TECHNIQUES=["h","p","/","b","x","Backspace"];function updateDataInfo(){putDataTabs(),putDataColumns(),putDataStrings()}function putDataTabs(){const e=document.querySelectorAll(".tabs");let t=1;e.forEach(e=>{e.setAttribute("data-tab",t),t++})}function putDataColumns(){const e=document.querySelectorAll(".tabs__column");let t=1;e.forEach(e=>{e.setAttribute("data-col",t),t++})}function putDataStrings(){const e=document.querySelectorAll(".tabs__column .tabs__cell");let t=1;e.forEach(e=>{e.setAttribute("data-string",t),t++,7==t&&(t=1)})}function addTab(){deleteActiveCell();const e=document.querySelector(".content__tabs"),t=document.createElement("div");t.classList.add("tabs"),t.innerHTML='\n  <div class="tabs__column">\n    <span class="tabs__cell">E</span>\n    <span class="tabs__cell">B</span>\n    <span class="tabs__cell">G</span>\n    <span class="tabs__cell">D</span>\n    <span class="tabs__cell">A</span>\n    <span class="tabs__cell">E</span>\n  </div>\n  <div class="tabs__column">\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n  </div>\n  <div class="tabs__column">\n    <span class="tabs__cell tabs__cell-active">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n  </div>\n  ',e.appendChild(t)}function deleteTab(){document.querySelector(".content__tabs").lastChild.remove()}function saveCommand(e,t,n=!0){const{cellElement:a}=getActiveCell();undoArray.push({action:{fn:e,key:a.textContent},inverse:{revFn:t}}),n&&(redoArray.length=0)}function undo(){const e=undoArray.pop(),{cellElement:t}=getActiveCell(),n=t.textContent;if(t.textContent="—",e){const t=e.inverse.revFn;"move"!==t()&&addActiveCell(e.action.index),redoArray.push({action:{fn:t,key:n},inverse:{revFn:e.action.fn}})}}function redo(){const e=redoArray.pop(),{string:t,col:n,tab:a}=getActiveCell();if(e){const l=e.inverse.revFn;saveCommand(l,e.action.fn,!1),undoArray.length>0&&(undoArray[undoArray.length-1].action.index={string:t,col:n,tab:a}),l(),typeNotes(e.action.key),updateDataInfo()}}function addLine(){const{tabElement:e}=getActiveCell();if(!verifyColumn(e,35)){deleteActiveCell();const t=document.createElement("div");t.classList.add("tabs__column"),t.innerHTML='\n    <span class="tabs__cell tabs__cell-active">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n  ',e.appendChild(t)}}function deleteLine(){const{tabElement:e}=getActiveCell();e.lastChild.remove()}function addBlankCol(){const{tabElement:e}=getActiveCell();deleteActiveCell();const t=document.createElement("div"),n=document.createElement("div");t.classList.add("tabs__column"),n.classList.add("tabs__column"),t.innerHTML='\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n  ',n.innerHTML='\n    <span class="tabs__cell tabs__cell-active">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n  ',e.appendChild(t),e.appendChild(n)}function deleteBlankCol(){const{tabElement:e}=getActiveCell();e.lastChild.remove(),e.lastChild.remove()}function deleteActiveCell(){const{cellElement:e,string:t,col:n,tab:a}=getActiveCell();undoArray.length>0&&(undoArray[undoArray.length-1].action.index={string:t,col:n,tab:a}),e.classList.remove("tabs__cell-active")}function addActiveCell({string:e,col:t,tab:n}){document.querySelector(`div[data-tab='${n}']`).querySelector(`div[data-col='${t}']`).querySelector(`span[data-string='${e}']`).classList.add("tabs__cell-active")}function getActiveCell(){const e=document.querySelector(".tabs__cell-active"),t=e.parentElement,n=t.parentElement;return{string:e.dataset.string,col:t.dataset.col,tab:n.dataset.tab,tabElement:n,colElement:t,cellElement:e}}function moveDown(){const{cellElement:e,string:t,col:n,tab:a}=getActiveCell();return"6"!==t&&(undoArray.length>0&&(undoArray[undoArray.length-1].action.index={string:t,col:n,tab:a}),e.classList.remove("tabs__cell-active"),addActiveCell({string:+t+1,col:n,tab:a})),"move"}function moveUp(){const{cellElement:e,string:t,col:n,tab:a}=getActiveCell();return"1"!==t&&(e.classList.remove("tabs__cell-active"),addActiveCell({string:+t-1,col:n,tab:a})),"move"}function moveRight(){const{tabElement:e,cellElement:t,string:n,col:a,tab:l}=getActiveCell();return"35"!==a&&(t.classList.remove("tabs__cell-active"),verifyColumn(e,+a+1)?addActiveCell({string:n,col:+a+1,tab:l}):addActiveCell({string:n,col:a,tab:l})),"move"}function moveLeft(){const{tabElement:e,cellElement:t,string:n,col:a,tab:l}=getActiveCell();return"3"!==a&&(t.classList.remove("tabs__cell-active"),verifyColumn(e,+a-1)?addActiveCell({string:n,col:+a-1,tab:l}):addActiveCell({string:n,col:a,tab:l})),"move"}function verifyColumn(e,t){return e.querySelector(`div[data-col='${t}']`)}function typeNotes(e){const{cellElement:t}=getActiveCell(),n=t.textContent;if("|"!==n&&" "!==e){if("Backspace"!==e)return void(t.textContent=n.replace("—","")+e);if(1!==n.length)return void(t.textContent=n.substring(0,n.length-1));t.textContent="—"}}document.addEventListener("DOMContentLoaded",()=>{putDataTabs(),putDataStrings(),putDataColumns(),document.addEventListener("keydown",e=>{const{string:t,col:n}=getActiveCell(),{key:a}=e;switch(a){case"t":saveCommand(addTab,deleteTab),addTab(),updateDataInfo();break;case"q":undo();break;case"e":redo();break;case"Enter":"35"!==n&&(saveCommand(addLine,deleteLine),addLine(),updateDataInfo());break;case"l":saveCommand(addBlankCol,deleteBlankCol),addBlankCol(),updateDataInfo();break;case"s":"6"!==t&&(saveCommand(moveDown,moveUp),moveDown());break;case"w":"1"!==t&&(saveCommand(moveUp,moveDown),moveUp());break;case"a":"3"!==n&&(saveCommand(moveLeft,moveRight),moveLeft());break;case"d":"35"!==n&&(saveCommand(moveRight,moveLeft),moveRight())}isNaN(a)&&!GUITAR_TECHNIQUES.includes(a)||typeNotes(a);document.querySelector("#helper").textContent=JSON.stringify(undoArray);document.querySelector("#helper2").textContent=JSON.stringify(redoArray)})});
//# sourceMappingURL=app.js.map
