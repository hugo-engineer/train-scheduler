
/*

Subtraction not working between 2 dates


*/

var config = {
    apiKey: "AIzaSyAro2JXQnnp9Olis9lm81dz0dWKY1xEWzM",
    authDomain: "counter-bcd54.firebaseapp.com",
    databaseURL: "https://counter-bcd54.firebaseio.com",
    projectId: "counter-bcd54",
    storageBucket: "counter-bcd54.appspot.com",
    messagingSenderId: "616273325424",
    appId: "1:616273325424:web:a56aa6460588f5e4d9b3b5"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();



$("#submit").on("click", function(e){
    e.preventDefault();
    var trainName = $("#train-name").val().trim();
    var destLocate = $("#destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var freq = $("#frequency").val().trim();


database.ref().push({
    trainName: trainName,
    destLocate: destLocate,
    firstTime: firstTime,
    freq: freq
}); 
});

database.ref().on("child_added", function(snapshot) {//.limitToLast(1);

// var nextArrival = moment.duration();


var todayTime = moment().format("DD/MM/YYYY");
var trainStart = moment(todayTime + " " + snapshot.val().firstTime).format('DD MM YYYY, h:mm:ss a');
var today = moment().format('DD MM YYYY, h:mm:ss a');


//Subtraction not working
var sinceStart = moment(today).diff(moment(trainStart));

var nextTrainTime = moment().format('h:mm a');
                // https://stackoverflow.com/questions/22938300/convert-milliseconds-to-hours-and-minutes-using-momentjs


console.log(sinceStart);
console.log(trainStart);
console.log(trainStart);

// var momentTest = snapshot.val().startdate;
// var monthsWorked = moment().diff(moment(momentTest),"months");


//JS method
// var msWorked = new Date() - new Date(snapshot.val().startdate);
// var monthsWorked = (msWorked / (24 * 60 * 60 * 1000))/30;

// var totalBilled = monthsWorked * snapshot.val().rate;
// var RoundedBilled = totalBilled.toFixed(0)

console.log(snapshot.val().trainName);

var insertRow = "<tr><td>" + snapshot.val().trainName + "</td>" +
                "<td>" + snapshot.val().destLocate + "</td>" +
                "<td>" + snapshot.val().freq + "</td>" +
                "<td>" + nextTrainTime + "</td> " +
                "<td>" + todayTime + "</td></tr> "
                // "<td>" + snapshot.val().rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>" +
                // "<td>" + RoundedBilled.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td></tr> "
              
                
$("#recordTable").append(insertRow);


});

