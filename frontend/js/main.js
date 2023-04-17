const headlineText = document.getElementById("header");
const contentText = document.getElementById("description");
const displays = document.getElementById("display");
const noteDatas = document.querySelectorAll(".notes-data");
const tittle = document.querySelectorAll(".title");
const details = document.querySelectorAll(".details");
const save = document.getElementById("save-button");

//display

async function display() {
  const response = await fetch("http://localhost:5000/read", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
  for (let i = 0; i < response.data.length; i++) {
    document.getElementById(
      "display"
    ).innerHTML += `<div class="notes-data" onclick="editNote(this)">
    <h1 class="tittle">${response.data[i].headline}</h1>
    <p class="details">${response.data[i].description}</p>
    <div class="buttons"><img class="edit-button" src="./images/icons8-edit-30.png" alt="edit">
    <img class="delete-button" src="./images/icons8-delete-24.png" alt="delete" onclick="showConfirmation()"></div>
    <div class="text-right confirm">
      <p class="details">Are you sure?</p>
      <button class="cancel" onclick="cancelNote()">Cancel</button>
      <button class="ok" onclick="deleteNote('${response.data[i]._id}')">
        Ok
      </button>
    </div>
    <input
      class="save-button"
      type="button"
      style="display: none"
      value="save"
      onclick="saveData('${response.data[i]._id}')"
    />
    <p class="date-time"></p>
  </div>`;
  }
}
display();

//addNote

async function addNote() {
  if (headlineText.value.trim().length === 0 ||
  contentText.value.trim().length === 0) {
    toast("Please add note");
  } else {
    await fetch("http://localhost:5000/create", {
      method: "POST",
      body: JSON.stringify({
        headline: headlineText.value,
        description: contentText.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        headlineText.value = "";
        contentText.value = "";
      });
      toast("Added successfully");
  }
  displays.innerHTML = "";
  display();
  displayInput();
  document.getElementById("submit-button").style.display = "block";
}

//edit

async function editNote(e) {
  e.querySelector(".edit-button").style.display = "none";
  e.querySelector(".save-button").style.display = "block";
  e.querySelector(".delete-button").style.display = "none";
  headlineText.value = e.querySelector("h1").innerText;
  contentText.value = e.querySelector("p").innerText;
  displayInput();
  document.getElementById("submit-button").style.display = "none";
  document.querySelector(".direction").innerText = "Let's edit";
}

//save data

async function saveData(id) {
  if (
    headlineText.value.trim().length === 0 ||
    contentText.value.trim().length === 0
  ) {
    toast("Please edit properly");
  } else {
    let editApi = "http://localhost:5000/" + id;
    await fetch(editApi, {
      method: "PATCH",
      body: JSON.stringify({
        headline: headlineText.value,
        description: contentText.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    headlineText.value = "";
    contentText.value = "";
    displays.innerHTML = "";
    display();
    toast("updated successfully");
  }
  document.getElementById("submit-button").style.display = "block";
  document.querySelector(".direction").innerText = "Let's create a note";
  
}

//delete

async function deleteNote(id) {
  let api = "http://localhost:5000/" + id;
  await fetch(api, {
    method: "DELETE",
  });
  displays.innerHTML = "";
  headlineText.value = "";
  contentText.value = "";
  display();
  displayInput();
  document.getElementById("submit-button").style.display = "block";
  document.querySelector(".direction").innerText = "Let's create a note";
  toast("deleted successfully");
}

//inputBox

function displayInput() {
  let inputDetails = document.querySelector(".notes");
  if (inputDetails.classList.contains("toggle-class")) {
    inputDetails.classList.remove("toggle-class");
  } else {
    inputDetails.classList.add("toggle-class");
  }
}

//confirmation

function showConfirmation() {
  document.querySelector(".notes").classList.add("toggle-class");
  document.querySelector(".text-right").style.display = "block";
  document.querySelector(".notes").classList.add("toggle-class");
  displayInput();
}

//cancel

function cancelNote() {
  document.querySelector(".text-right").style.display = "none";
}

//date-time
// function timeDate(){
//   let date = new Date().toLocaleDateString();
//   document.querySelector(".date-time").innerText = date;
// }
// timeDate()

function toast(value){
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.innerText = value
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}
