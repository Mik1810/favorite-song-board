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
  const table = document.querySelector("#bacheca");

  //Creating the row
  const newTableRow = document.createElement("tr");

  //Adding the new row to the table
  table.appendChild(newTableRow);
  
  //Creating the cells of the row
  const newImageBox = document.createElement("td");
  const newTitleBox = document.createElement("td");
  const newArtistBox = document.createElement("td");
  const newDescriptionBox = document.createElement("td");

  //Adding the table cells to the row
  newTableRow.append(newImageBox, newTitleBox, newArtistBox, newDescriptionBox);

  //Creating the elements for the cells
  const newTitle = document.createElement("p");
  const newArtist = document.createElement("p");
  const newDescription = document.createElement("p");
  const newImg = document.createElement("img");

  //Adding data to the table cells
  newImageBox.appendChild(newImg);
  newTitleBox.appendChild(newTitle);
  newArtistBox.appendChild(newArtist);
  newDescriptionBox.appendChild(newDescription);

  //Styiling the image of the row
  newImg.classList.add("imgSong");
  
  //Setting the datas
  newImg.setAttribute('src', song.image);
  newArtist.classList.add("text-wrap");
  newTitle.classList.add("text-wrap");
  newDescription.classList.add("text-wrap");
  
  newTitle.innerText = song.title;
  newArtist.innerText = song.artist;
  newDescription.innerText = song.description;

  //Resetting the input field
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
  localStorage.setItem("counterDB",counterDB);
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


