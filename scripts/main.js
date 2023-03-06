import {Song} from "./class.js";

const input = document.getElementById("input-file");
const myImage = document.getElementById("myimage");
const imagePublished = document.getElementById("imagePublished");

fetchLocalDB();
fetchPost();

input.addEventListener('change', (event) => {
  const imageS = event.target.files[0];

  const reader = new FileReader();
  console.log(imageS);

  let x = reader.readAsDataURL(imageS);
  //console.log(reader.result);

  reader.addEventListener('load', () => {
    localStorage.setItem("image", reader.result);
    var thumbnail = localStorage.getItem("image");
    myImage.setAttribute('src', thumbnail);
    myImage.style.display = "block";
    input.style.display = "none";
  });
});


let header = document.querySelector("#header");
function setUserName() {
  let myName = prompt("Please enter your name.");
  if(myName === null || myName === "") { 
    alert("Devi selezionare un nome valide");
    setUserName();
  }
  localStorage.setItem("name", myName);
  header.textContent = `Bentornato, ${myName}`;
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  header.textContent = `Bentornato, ${storedName}`;
}

let publishButton = document.querySelector("#publish");
publishButton.addEventListener("click", publishContent);

const bacheca = document.querySelector("#bacheca");
const inputTitle = document.querySelector("#song-name");
const inputArtist = document.querySelector("#artist-name") 
const inputDescription = document.querySelector("#description-area");

function loadPost(song) {
  const mainDiv = document.querySelector("#bacheca");
  const newDiv = document.createElement("div");
  const newImage = document.createElement("img");
  const newTitle = document.createElement("p");
  const newArtist = document.createElement("p");
  const newDescription = document.createElement("p");
  newImage.setAttribute("height", 128);
  newImage.setAttribute("width", 128);
  newImage.style.margin = "10px"
  
  newImage.setAttribute('src', song.image);
  newDiv.appendChild(newImage);
  newTitle.innerHTML = song.title;
  newArtist.innerHTML = song.artist;
  newDescription.innerHTML = song.description;

  newDiv.appendChild(newTitle);
  newDiv.appendChild(newArtist);
  newDiv.appendChild(newDescription);
  newDiv.style.display = "flex";
  newDiv.style.flexDirection = "row";
  newDiv.style.justifyContent = "space-around";
  newDiv.style.alignItems = "center";
  mainDiv.appendChild(newDiv);

  input.style.display = "block";
  myImage.style.display = "none";
  input.value = "";
}
function publishContent() {
  let counterDB = fetchLocalDB();
  let song = {title: inputTitle.value, artist: inputArtist.value, 
    description: inputDescription.value, image: localStorage.getItem("image")};
  localStorage.setItem("song"+counterDB, JSON.stringify(song));
  console.log(JSON.parse(localStorage.getItem("song"+counterDB)));
  counterDB++;
  localStorage.setItem("counterDB",counterDB);  console.log(song._title);
  loadPost(song);
}

function fetchLocalDB(counterDB) {
  if(!localStorage.getItem("counterDB")) {
    localStorage.setItem("counterDB",1);
    //console.log("Il localDB non contiene il contatore");
  } else return parseInt(localStorage.getItem("counterDB"));
}

function fetchPost() {
  let counterDB = parseInt(localStorage.getItem("counterDB"));
  for(let i = 1; i < counterDB; i++) {
    loadPost(JSON.parse(localStorage.getItem("song"+i)));
  }
}
