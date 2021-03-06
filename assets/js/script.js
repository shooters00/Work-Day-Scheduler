var savedInfo = [];

//Get the date from moment.js
var day = moment().format("dddd, MMM Do");
$("#currentDay").text(day);



//Get data from local storage and put into the calendar in the correct location
function init() {
    calColors();

    if (localStorage.getItem("savedInfo") === null) {
        return;
    } else {
        savedInfo = JSON.parse(localStorage.getItem("savedInfo"));
        for (var i=0; i < savedInfo.length; i++) {
            var returnTask = savedInfo[i].task;
            var returnTime = "#"+savedInfo[i].hour;
            $(returnTime).children(".description").val(returnTask);
        }
        return savedInfo;
    }
    
}

//When save button is clicked, this function pulls the value and id from the correct block.
function saveMyStuff(event) {

    event.preventDefault();
  
    var textLine = $(this).siblings(".description").val();
    var timeLine = $(this).parent().attr("id")

    var found = savedInfo.findIndex(x => x.hour === timeLine);
    if (found !== -1) {
        savedInfo.splice(found, 1);
    }


    var mySavedInfo = {
        hour: timeLine,
        task: textLine
    }
 
    savedInfo.push(mySavedInfo);

    localStorage.setItem("savedInfo", JSON.stringify(savedInfo));
}


function calColors() {
    //Get the time of day
    var time = moment().format("kk");

    //Based upon the time of day, add the appropriate class to the time blocks that will style them.
    for (var i=9; i <= 17; i++) {
        //(i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        if (i < 10) {
            i="0" + i;
        }
        if (i < time) {
            $("#"+i).children(".description").addClass("past");
        } else if (i === time) {
            $("#"+i).children(".description").addClass("present");
        } else {
            $("#"+i).children(".description").addClass("future");
        }
    }
}


//Initialize
init();

//Wait for the save button to be clicked
$(".saveBtn").on("click", saveMyStuff);


