var noteArr = new Array();
var cell = 0; //Value is given to prevent the array from returning undefined and then NaN
var noteObj = "";


function loadNoteFromLocalStorage() { // Loads the note upon refreshing/opening the page again, activated via HTML in the body tag!.

    noteObj = localStorage.getItem("notes");
	noteArr = JSON.parse(noteObj);
    if (noteArr == null){
        noteArr = new Array();
    }
    var notePos = document.getElementById("notePos");
    notePos.innerHTML = noteArr;
    cell = localStorage.getItem("cell");
    if (cell == null) {
        cell = 0;
	}
    
    cell = parseInt(cell);
	
}

    var createNoteBtn = document.getElementById("createNoteBtn");
        createNoteBtn.addEventListener("click", function(){
            
        var dateBar = document.getElementById("dateBar");
        var timeBar = document.getElementById("timeBar");
        var warningBox = document.getElementById("warningBox");
        var textAreaInput = document.getElementById("textAreaInput");
        var notePos = document.getElementById("notePos");

            warningBox.innerText = ""; // Reset the 'error' span
            dateBar.style.border = ""; // Removes the red border from the blank boxes
            timeBar.style.border = ""; 
            textAreaInput.style.border = "";


        if(dateBar.value == "" || timeBar.value == "") { // Displays an error when the user did not enter time and date

            warningBox.innerText = "Please enter a date and time"; // Error Messge
            dateBar.style.border = "2px red solid";
            timeBar.style.border = "2px red solid";
            warningBox.indexOf(paintWarningBox());
                return;


        }
        if(textAreaInput.value == "") { // Displays an error when the user did not enter the note details

            warningBox.innerText = "Please enter a description";
            textAreaInput.style.border = "2px red solid";
            warningBox.indexOf(paintWarningBox());
                return;

        }


            noteArr.push("<div class='noteContainer'><span class='xButton' id='" + (noteArr.length) + "' onclick='removeNote()'></span><div class='noteDescription'>" + textAreaInput.value + "</div><div class='noteDateAndTime'>" + dateBar.value + "</br>" + timeBar.value + "</div></div>");
            notePos.innerHTML = noteArr;

            cell = cell + 1;


            /* This will reset all the the boxes after pressing the "Pin Note" button*/
            dateBar.value = "";
            timeBar.value = "";
            textAreaInput.value = "";

            saveNoteOnLocalStorage();
            
        });

function saveNoteOnLocalStorage() { // Saves the note upon creation
	
	var noteObj = JSON.stringify(noteArr);
		localStorage.setItem("notes", noteObj);
		localStorage.setItem("cell", cell);
	
}

function removeNote() {
	
    var id = event.srcElement.id;
    noteArr.splice(id, 1);
    var notePos = document.getElementById("notePos");
    notePos.innerHTML = noteArr;
	saveNoteOnLocalStorage();
}

	
function paintWarningBox() { // Saves font style/size/weight in one function and acitvates it via the main function, keeps order in the script!.

	warningBox.style.color = "red";
	warningBox.style.fontSize = "25px";
	warningBox.style.fontWeight = "bold";
	warningBox.style.fontFamily = "Comic Sans MS";
	
}

//Will load all the notes when the page is fully loaded.
window.onload = loadNoteFromLocalStorage();