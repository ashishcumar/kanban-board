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
const addTaskFormRef = document.getElementById("add-task-form-btn");
const taskNameInputRef = document.getElementById("taskName");
const statusOptionContainerRef = document.getElementById("status-options");

// Onload Functions
const clearBoard = () => {
  defaultData.forEach((data) => {
    const container = document.getElementById(data.status);
    if (container) {
      container.innerHTML = ""; // Clear all children
    }
  });
};

const attachDragEvents = () => {
  defaultData.forEach((data) => {
    const card = document.getElementById(`card-${data.id}`);
    if (card) {
      card.addEventListener("dragstart", (event) => {
        onDragStart(event);
      });
    }
  });
};

const kanbanCards = (defaultData) => {
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

  attachDragEvents();
};

document.addEventListener("DOMContentLoaded", addTabsAndData);

// Add Card Functions

const openAddTaskModal = () => {
  modalContainerRef.style.display = "grid";
  document.body.style.overflow = "hidden";
  taskNameInputRef.focus()
};

const verifyAndAddCard = (event) => {
  event.preventDefault();
  const taskName = taskNameInputRef.value;
  const selectedStatus = document.querySelector(
    'input[name="status"]:checked'
  ).value;
  const newCard = {
    id: defaultData.length + 1,
    todo: taskName,
    status: selectedStatus,
    profilePic: profilePicApi[Math.floor(Math.random() * profilePicApi.length)],
    tags: taskName
      .split(" ")
      .filter((word) => word.length > 3 && word.toLowerCase()),
  };
  const temp = [...defaultData, newCard];
  clearBoard();
  localStorage.setItem("vanilla-boardData", JSON.stringify(temp));
  kanbanCards(temp);

  modalContainerRef.style.display = "none";
  document.body.style.overflow = "auto";
  taskNameInputRef.value = "";
  attachDragEvents();
  window.location.reload();
};

addTaskRef.addEventListener("click", openAddTaskModal);
addTaskFormRef.addEventListener("click", verifyAndAddCard);

// Drag Functions
const onDragStart = (event) => {
  console.log("drag strt", event.target);
  event.dataTransfer.setData("text/plain", event.target.id);
};

const onDrop = (event) => {
  event.preventDefault();
  const cardId = event.dataTransfer.getData("text/plain");
  const card = document.getElementById(cardId);

  if (card) {
    // Only proceed if card exists
    const closestBoard = event.target.closest(".board");
    closestBoard.appendChild(card);

    const newCount = document.getElementById(closestBoard.id + "-board-count");
    newCount.innerText = closestBoard.children.length - 1;

    const selectedCardObject = defaultData.find(
      (data) => `card-${data.id}` === cardId
    );
    const prevBoardId = selectedCardObject.status;
    const updateCountRef = document.getElementById(
      prevBoardId + "-board-count"
    );
    updateCountRef.innerText = Number(updateCountRef.innerText) - 1;

    selectedCardObject.status = closestBoard.id;
    localStorage.setItem("vanilla-boardData", JSON.stringify(defaultData));
  } else {
    console.error("Card not found for ID:", cardId);
  }
};

const onDropOver = (event) => {
  event.preventDefault();
};

// Search Functions
const removeExtraChildren = () => {
  tabsId.forEach((tabId) => {
    const tabElement = document.getElementById(tabId);
    // Check if the tab element exists and has more than one child
    if (tabElement && tabElement.children.length > 1) {
      while (tabElement.children.length > 1) {
        tabElement.removeChild(tabElement.lastChild);
      }
    }
  });
};
const searchCards = () => {
  const searchInput = searchInputRef.value;
  const searchResults = defaultData.filter((data) => {
    return data.todo.toLowerCase().includes(searchInput.toLowerCase());
  });
  console.log({ searchInputRef: searchResults.length, searchInput });
  if (searchResults.length) {
    removeExtraChildren();
    kanbanCards(searchResults);
  } else {
    removeExtraChildren();
  }
};

searchInputRef.addEventListener("input", searchCards);
