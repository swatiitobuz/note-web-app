let headlineText = document.getElementById("header");
let contentText = document.getElementById("description");
const displays = document.getElementById("display");
let noteDatas = document.querySelectorAll(".notes-data");
let tittle = document.querySelectorAll(".title");
let details = document.querySelectorAll(".details");
let save = document.getElementById("save-button");

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
    <img
      class="expand"
      src="./images/icons8-enlarge-32.png"
      alt="expand"
      onclick="expand()"
    />
    <h1 class="tittle">${response.data[i].headline}</h1>
    <p class="details">${response.data[i].description}</p>
    <input class="edit-button" type="button" value="edit" />
    <input
      class="delete-button"
      type="button"
      value="delete"
      onclick="showConfirmation()"
    />
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
  </div>`;
  }
}
display();

//addNote

async function addNote() {
  if (headlineText.value.trim().length === 0) {
    alert("please enter a note");
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
        console.log(json);
        headlineText.value = "";
        contentText.value = "";
      });
  }
  displays.innerHTML = "";
  display();
}

//edit

async function editNote(e) {
  console.log(e);
  e.querySelector(".edit-button").style.display = "none";
  e.querySelector(".save-button").style.display = "block";
  e.querySelector(".delete-button").style.display = "block";
  headlineText.value = e.querySelector("h1").innerText;
  contentText.value = e.querySelector("p").innerText;

  displayInput();
}

//save data

async function saveData(id) {
  if (
    headlineText.value.trim().length === 0 ||
    contentText.value.trim().length === 0
  ) {
    alert("please edit properly");
  } else {
    let editApi = "http://localhost:5000/" + id;
    console.log(editApi);
    await fetch(editApi, {
      method: "PATCH",
      body: JSON.stringify({
        headline: headlineText.value,
        description: contentText.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    headlineText.value = "";
    contentText.value = "";
    displays.innerHTML = "";
    display();
    document.querySelector("#submit-button").style.display = "block";
  }
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
  displayInput();
  document.querySelector(".notes").classList.add("toggle-class");
  document.querySelector(".text-right").style.display = "block";
}


//expand

function expand(){

}

//cancel

function cancelNote(){
  document.querySelector(".text-right").style.display = "none";
}

//pop up
