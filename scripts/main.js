import {Song} from "./class.js";

const input = document.getElementById("input-file");
const myImage = document.getElementById("myimage");
const imagePublished = document.getElementById("imagePublished");

input.addEventListener('change', (event) => {
  const imageS = event.target.files[0];

  const reader = new FileReader();

  reader.readAsDataURL(imageS);

  reader.addEventListener('load', () => {
    localStorage.setItem('input-file', reader.result);
  });

  const thumbnail = localStorage.getItem("input-file");
  myImage.setAttribute('src', thumbnail);
  myImage.style.display = "block";
  input.parentNode.removeChild(input);
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
const inpuDescription = document.querySelector("#description-area");
function publishContent() {
  
  let song = new Song(inputTitle.value, inputArtist.value, inpuDescription.value, localStorage.getItem("input-file"));

  const newImage = document.createElement("img");
  newImage.setAttribute("height", 128);
  newImage.setAttribute("width", 128);
  newImage.style.margin = "10px"
  
  newImage.setAttribute('src', song._image);
  imagePublished.appendChild(newImage);
}