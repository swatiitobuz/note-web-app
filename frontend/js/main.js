let headlineText = document.getElementById("header");
let contentText = document.getElementById("description");
const displays = document.getElementById("display");
let noteDatas = document.querySelectorAll(".notes-data");
let tittle = document.querySelectorAll(".title");
let details = document.querySelectorAll(".details");
let save = document.getElementById("save-button");

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
    document.getElementById("display").innerHTML += `<div class = "notes-data">
  <h1 class="tittle">${response.data[i].headline}</h1>
  <p class="details">${response.data[i].description}</p>
  <input id="edit-button" type="button" value="edit" onclick="editNote()" />
  <input id="delete-button" type="button" value="delete" onclick="deleteNote('${response.data[i]._id}')" />
  <input id="save-button" type="button" style="display:none;" value="save" onclick="saveData('${response.data[i]._id}')" />
  </div>`;
  }
}
display();

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

async function editNote() {
  document.querySelector("#edit-button").style.display = "none";
  document.querySelector("#save-button").style.display = "block";
  document.querySelector("#submit-button").style.display = "none";
}

async function saveData(id) {
  console.log(id);
  if(headlineText.value.trim().length === 0 || contentText.value.trim().length === 0){
    alert("please edit properly");
  }
  else{
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
  display();
}
