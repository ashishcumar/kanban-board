// Imports
import {
  boardSectionsAndDetails,
  profilePicApi,
  tabsId,
  tagShades,
  defaultData,
} from "./staticData.js";

// Ref Declarations
const boardContainerRef = document.getElementById("board-container");
const searchInputRef = document.getElementById("search-input");
const appRef = document.getElementById("app");
const addTaskRef = document.getElementById("add-task");
const modalContainerRef = document.getElementById("add-task-modal-container");
const addTaskFormRef = document.getElementById('kanbanAddTaskForm')
const taskNameInputRef = document.getElementById('taskName')
const statusOptionContainerRef = document.getElementById('status-options')

// Onload Functions
const kanbanCards = (defaultData) => {
  if(!defaultData.length) return
  defaultData.forEach((data) => {
    document.getElementById(data.status).innerHTML += `
    <div class="card" id="card-${data.id}"  draggable="true" >
      <p>${data.todo}</p>
      <div class="card-tag">
        <div class="tag-row">
        ${data.tags
          .map(
            (tag) =>
              `<div class="tag" style="background-color:${
                tagShades[Math.floor(Math.random() * tagShades.length)].light
              };color:${
                tagShades[Math.floor(Math.random() * tagShades.length)].dark
              }">${tag}</div>`
          )
          .join("")}
        </div>
        <div class="profile-pic-container">
          <img src="${data.profilePic}" alt="profile" />
        </div>
      </div>
    </div>
    `;
  });
};
const addTabsAndData = async () => {
  if (!boardContainerRef) return;
  for (let i = 0; i < boardSectionsAndDetails.length; i++) {
    boardContainerRef.innerHTML += `
        <div class="board" id="${boardSectionsAndDetails[i].id}">
          <div class="board-title-container">
            <h3 class="board-title">${boardSectionsAndDetails[i].title}</h3>
            <p class="board-count" id="${boardSectionsAndDetails[i].id}-board-count">${boardSectionsAndDetails[i].count}</p>
          </div>
        </div>
    `;
  }

  if (!defaultData.length) return;
  defaultData.forEach((data) => {
    document.getElementById(data.status).innerHTML += `
    <div class="card" id="card-${data.id}"  draggable="true" >
      <p>${data.todo}</p>
      <div class="card-tag">
        <div class="tag-row">
        ${data.tags
          .map(
            (tag) =>
              `<div class="tag" style="background-color:${
                tagShades[Math.floor(Math.random() * tagShades.length)].light
              };color:${
                tagShades[Math.floor(Math.random() * tagShades.length)].dark
              }">${tag}</div>`
          )
          .join("")}
        </div>
        <div class="profile-pic-container">
          <img src="${data.profilePic}" alt="profile" />
        </div>
      </div>
    </div>
    `;
  });

  tabsId.forEach((tabID) => {
    const tab = document.getElementById(tabID);
    const tabCount = document.getElementById(`${tabID}-board-count`);
    tab.addEventListener("dragover", onDropOver);
    tab.addEventListener("drop", onDrop);
    tabCount.innerText = tab.children.length - 1;
  });

  defaultData.forEach((data) => {
    const card = document.getElementById(`card-${data.id}`);
    card?.addEventListener("dragstart", (event) => {
      onDragStart(event);
    });
  });
};

document.addEventListener("DOMContentLoaded", addTabsAndData);

// Drag Functions
const onDragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
};

const onDrop = (event) => {
  event.preventDefault();
  const cardId = event.dataTransfer.getData("text/plain");
  const card = document.getElementById(cardId);

  // current board changes
  const closestBoard = event.target.closest(".board");
  closestBoard.appendChild(card);
  const newChildCount = closestBoard.children.length - 1;
  const newCount = document.getElementById(closestBoard.id + "-board-count");
  newCount.innerText = newChildCount;

  const selectedCardObject = defaultData.find(
    (data) => data.todo === card.firstChild.nextSibling.innerText
  );

  // prev board changes
  const prevBoardId = selectedCardObject.status;
  const updateCountRef = document.getElementById(prevBoardId + "-board-count");
  updateCountRef.innerHTML = Number(updateCountRef.innerHTML) - 1;

  // new status changes
  const newDataInLocalStore = defaultData.map((data) => {
    if (data.todo === selectedCardObject.todo) {
      data.status = closestBoard.id;
    }
    return data;
  });
  localStorage.setItem(
    "vanilla-boardData",
    JSON.stringify(newDataInLocalStore)
  );
};

const onDropOver = (event) => {
  event.preventDefault();
};

// Search Functions
const searchCards = () => {
  const searchInput = searchInputRef.value;
  const searchResults = defaultData.filter((data) => {
    return data.todo.toLowerCase().includes(searchInput.toLowerCase());
  });
  if (searchResults.length) {
    defaultData.forEach((data) => {
      const container = document.getElementById(data.status);
      if (container && container.children.length > 1) {
        while (container.children.length > 1) {
          container.removeChild(container.lastChild);
        }
      }
    });
    kanbanCards(searchResults);
  } else {
    console.log("else case calling", searchResults);
    kanbanCards(defaultData);
  }
};

searchInputRef.addEventListener("input", searchCards);

// Add Card Functions

const openAddTaskModal = () => {
  modalContainerRef.style.display = "grid";
  document.body.style.overflow = "hidden";
};

const verifyAndAddCard = (event) => {
  event.preventDefault();
  const taskName = taskNameInputRef.value;
  // const status = statusOptionContainerRef.children;
  console.log(taskName,);
}

addTaskRef.addEventListener("click", openAddTaskModal);
addTaskFormRef.addEventListener("click",verifyAndAddCard)