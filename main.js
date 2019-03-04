var arrNotes = [];

// On load
$( document ).ready(function() {
    $('#datetimepicker1').datetimepicker({
        useCurrent : true,
        format:'DD/MM/YYYY HH:mm:ss',
        minDate: getFormattedDate(new Date())
     });

    arrNotes = JSON.parse(localStorage.getItem("arrNotes") || "[]");
    setAllNotesOnScreen();
});

function getFormattedDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString().slice(2);
    return month + '-' + day + '-' + year;
}

function addNewNote(){
    //  make new note
   var dateinput = document.querySelector("#example-datetime-local-input");
   if (dateinput.value=="" || $('textarea#txtNote').val() =="" ) {
       alert("Empty date and time field");
       return;
    } else {
    var newNoteText,newNoteDate, newNoteTime;
    newNoteText = $('textarea#txtNote').val().replace(/\n/g, "<br />");
    newNoteDate = $('#example-datetime-local-input').val().substring(0, 10);
    newNoteTime = $('#example-datetime-local-input').val().substring(11, 19);
    var note = {'text': newNoteText, 'time' : newNoteTime, 'date' : newNoteDate};

    // save in local storage
    addNoteToLocalStorage(note);

    // show on screen
    setAllNotesOnScreen();
}}


function addNoteToLocalStorage(note){
    if (typeof(Storage) !== "undefined") {
        arrNotes.push(note);
        localStorage.setItem("arrNotes", JSON.stringify(arrNotes));

      } else {
        console.log("Sorry, your browser does not support Web Storage...");
      }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

function removeNote(id){
    arrNotes.splice(id,1);
    localStorage.setItem("arrNotes", JSON.stringify(arrNotes));
    setAllNotesOnScreen();

}
function setAllNotesOnScreen(){
    $("#notesContainer").html('');
    for (var i in arrNotes){
        $("#notesContainer").append("<div class='card bgnote' style='width: 18rem;'>" +
                                        "<button type='button' onclick='removeNote("+i+")' class='close rightText' aria-label='Close'>" +
                                            "<span aria-hidden='true'>&times;</span>" +
                                        "</button>"+
                                        "<div class='card-body'>"+
                                            "<p class='card-text'>"+arrNotes[i].text+ "</p>" +
                                            "<div>"+arrNotes[i].time+"</div>" +
                                            "<div>"+arrNotes[i].date+"</div>" +
                                        "</div>"+
                                    "</div>");
    }
    
}