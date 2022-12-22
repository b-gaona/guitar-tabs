const MIN_STRING="1",MAX_STRING="6",MIN_COLUMN="3",MAX_COLUMNS="32",GUITAR_TECHNIQUES=["h","H","p","P","/","b","B","x","X","Backspace"],undoArray=[],redoArray=[];function updateDataInfo(){putDataTabs(),putDataStrings()}function putDataTabs(){const e=document.querySelectorAll(".tabs");let t=1;e.forEach(e=>{putDataColumns(e),e.setAttribute("data-tab",t),t++})}function putDataColumns(e){const t=e.querySelectorAll(".tabs__column");let a=1;t.forEach(e=>{e.setAttribute("data-col",a),a++})}function putDataStrings(){const e=document.querySelectorAll(".tabs__column .tabs__cell");let t=1;e.forEach(e=>{e.setAttribute("data-string",t),t++,7==t&&(t=1)})}function addTab(){deleteActiveCell();const e=document.querySelector(".content__tabs"),t=document.createElement("div");t.classList.add("tabs"),t.innerHTML='\n  <div class="tabs__column">\n    <span class="tabs__cell">E</span>\n    <span class="tabs__cell">B</span>\n    <span class="tabs__cell">G</span>\n    <span class="tabs__cell">D</span>\n    <span class="tabs__cell">A</span>\n    <span class="tabs__cell">E</span>\n  </div>\n  <div class="tabs__column">\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n  </div>\n  <div class="tabs__column">\n    <span class="tabs__cell tabs__cell-active">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n  </div>\n  ',e.appendChild(t)}function deleteTab(){document.querySelector(".content__tabs").lastChild.remove()}function saveCommand(e,t,a=!0){const{cellElement:n}=getActiveCell();undoArray.push({action:{fn:e,key:n.textContent},inverse:{revFn:t}}),a&&(redoArray.length=0)}function undo(){const e=undoArray.pop(),{cellElement:t}=getActiveCell(),a=t.textContent;if(t.textContent="—",e){const t=e.inverse.revFn;"move"!==t()&&addActiveCell(e.action.index),redoArray.push({action:{fn:t,key:a},inverse:{revFn:e.action.fn}})}}function redo(){const e=redoArray.pop(),{string:t,col:a,tab:n}=getActiveCell();if(e){const s=e.inverse.revFn;saveCommand(s,e.action.fn,!1),modifyUndoArray({string:t,col:a,tab:n}),s(),typeNotes(e.action.key),updateDataInfo()}}function addLine(){const{tabElement:e}=getActiveCell();if(!verifyColumn(e,"32")){deleteActiveCell();const t=document.createElement("div");t.classList.add("tabs__column"),t.innerHTML='\n    <span class="tabs__cell tabs__cell-active">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n  ',e.appendChild(t)}}function deleteLine(){const{tabElement:e}=getActiveCell();e.lastChild.remove()}function addBlankCol(){const{tabElement:e}=getActiveCell();deleteActiveCell();const t=document.createElement("div"),a=document.createElement("div");t.classList.add("tabs__column"),a.classList.add("tabs__column"),t.innerHTML='\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n    <span class="tabs__cell">|</span>\n  ',a.innerHTML='\n    <span class="tabs__cell tabs__cell-active">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n    <span class="tabs__cell">—</span>\n  ',e.appendChild(t),e.appendChild(a)}function deleteBlankCol(){const{tabElement:e}=getActiveCell();e.lastChild.remove(),e.lastChild.remove()}function deleteActiveCell(){const{cellElement:e,string:t,col:a,tab:n}=getActiveCell();modifyUndoArray({string:t,col:a,tab:n}),e.classList.remove("tabs__cell-active")}function addActiveCell({string:e,col:t,tab:a}){document.querySelector(`div[data-tab='${a}']`).querySelector(`div[data-col='${t}']`).querySelector(`span[data-string='${e}']`).classList.add("tabs__cell-active")}function getActiveCell(){const e=document.querySelector(".tabs__cell-active"),t=e.parentElement,a=t.parentElement;return{string:e.dataset.string,col:t.dataset.col,tab:a.dataset.tab,tabElement:a,colElement:t,cellElement:e}}function moveDown(){const{cellElement:e,string:t,col:a,tab:n}=getActiveCell();return"6"!==t?(modifyUndoArray({string:t,col:a,tab:n}),e.classList.remove("tabs__cell-active"),addActiveCell({string:+t+1,col:a,tab:n})):verifyTab(+n+1)&&(e.classList.remove("tabs__cell-active"),addActiveCell({string:"1",col:"3",tab:+n+1})),"move"}function moveUp(){const{cellElement:e,string:t,col:a,tab:n}=getActiveCell();return"1"!==t?(e.classList.remove("tabs__cell-active"),addActiveCell({string:+t-1,col:a,tab:n})):verifyTab(+n-1)&&(e.classList.remove("tabs__cell-active"),addActiveCell({string:"6",col:"3",tab:+n-1})),"move"}function moveRight(){const{tabElement:e,cellElement:t,string:a,col:n,tab:s}=getActiveCell();return"32"!==n&&(t.classList.remove("tabs__cell-active"),verifyColumn(e,+n+1)?addActiveCell({string:a,col:+n+1,tab:s}):addActiveCell({string:a,col:n,tab:s})),"move"}function moveLeft(){const{tabElement:e,cellElement:t,string:a,col:n,tab:s}=getActiveCell();return"3"!==n&&(t.classList.remove("tabs__cell-active"),verifyColumn(e,+n-1)?addActiveCell({string:a,col:+n-1,tab:s}):addActiveCell({string:a,col:n,tab:s})),"move"}function verifyColumn(e,t){return e.querySelector(`div[data-col='${t}']`)}function verifyTab(e){return document.querySelector(`div[data-tab='${e}']`)}function typeNotes(e){const{cellElement:t}=getActiveCell(),a=t.textContent;if("|"!==a&&" "!==e){if("Backspace"!==e)return void(t.textContent=a.replace("—","")+e);if(1!==a.length)return void(t.textContent=a.substring(0,a.length-1));t.textContent="—"}}function modifyUndoArray({string:e,col:t,tab:a}){undoArray.length>0&&(undoArray[undoArray.length-1].action.index={string:e,col:t,tab:a})}document.addEventListener("DOMContentLoaded",()=>{updateDataInfo(),document.addEventListener("keydown",e=>{const{string:t,col:a,tab:n}=getActiveCell(),{key:s,target:l}=e;if("BODY"===l.tagName){switch(s){case"t":case"T":saveCommand(addTab,deleteTab),addTab(),updateDataInfo();break;case"q":case"Q":undo();break;case"e":case"E":redo();break;case"Enter":"32"!==a&&(saveCommand(addLine,deleteLine),addLine(),updateDataInfo());break;case"l":case"L":saveCommand(addBlankCol,deleteBlankCol),addBlankCol(),updateDataInfo();break;case"s":case"S":case"ArrowDown":("6"===t&&verifyTab(+n+1)||"6"!==t)&&saveCommand(moveDown,moveUp),moveDown();break;case"w":case"W":case"ArrowUp":("1"===t&&verifyTab(+n-1)||"1"!==t)&&saveCommand(moveUp,moveDown),moveUp();break;case"a":case"A":case"ArrowLeft":"3"!==a&&(saveCommand(moveLeft,moveRight),moveLeft());break;case"d":case"D":case"ArrowRight":"32"!==a&&(saveCommand(moveRight,moveLeft),moveRight())}isNaN(s)&&!GUITAR_TECHNIQUES.includes(s)||typeNotes(s)}})});
//# sourceMappingURL=app.js.map
