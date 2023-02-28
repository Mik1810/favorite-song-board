const button = document.querySelector("#test");
button.onclick = () => document.title = "Ciao";


/*document.getElementById("file-input").onchange = function (e) {
    console.log("Test");
    console.log(e.target);
    
}*/


function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
  
    var imgtag = document.getElementById("myimage");
    imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
      imgtag.src = event.target.result;
    };
  
    reader.readAsDataURL(selectedFile);
    const inputBro = document.querySelector("#input-file");
    inputBro.parentNode.removeChild(inputBro);
    document.getElementById("myimage").style.display = "block";
  }