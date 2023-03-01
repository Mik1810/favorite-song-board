import {Song} from "./class.js";

const input = document.getElementById("input-file");
const myImage = document.getElementById("myimage");
const imagePublished = document.getElementById("imagePublished");

input.addEventListener('change', (event) => {
  const imageS = event.target.files[0];

  const reader = new FileReader();
  console.log(imageS);

  let x = reader.readAsDataURL(imageS);
  console.log(reader.result);

  reader.addEventListener('load', () => {
    localStorage.setItem('input-file', reader.result);
    var thumbnail = localStorage.getItem("input-file");
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

const firstColumn = document.querySelector("#songPublished");
const secondColumn = document.querySelector("#artistPublished");
const thirdColumn = document.querySelector("#descriptionPublished");
function publishContent() {
  
  let song = new Song(inputTitle.value, inputArtist.value, inputDescription.value, localStorage.getItem("input-file"));
  console.log(song._title);
  const newImage = document.createElement("img");
  const newTitle = document.createElement("p");
  const newArtist = document.createElement("p");
  const newDescription = document.createElement("p");
  newImage.setAttribute("height", 128);
  newImage.setAttribute("width", 128);
  newImage.style.margin = "10px"
  
  newImage.setAttribute('src', song._image);
  imagePublished.appendChild(newImage);
  newTitle.innerHTML = song._title;
  newArtist.innerHTML = song._artist;
  newDescription.innerHTML = song._description;

  firstColumn.appendChild(newTitle);
  secondColumn.appendChild(newArtist);
  thirdColumn.appendChild(newDescription);

  input.style.display = "block";
  myImage.style.display = "none";
  input.value = "";
}