
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


$("#submit").on("click", function (e) {
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

database.ref().on("child_added", function (snapshot) {

    var firstTime = snapshot.val().firstTime.split(':');
    var trainStart = moment().hour(firstTime[0]).minute(firstTime[1]).second(0);
    var sinceStart = moment().diff(trainStart,'minutes');
    Console.LOG(trainStart);
    var timeLeft = snapshot.val().freq - (sinceStart % snapshot.val().freq);
    var nextTrain = moment().add(timeLeft, 'minutes')
    var nextTrainFormatted = moment(nextTrain).format(" DD MMM  YYYY, h:mm a")


    //1.  attribute insert with first time and freq
    var insertRow = "<tr data-firstTime=><td>" + snapshot.val().trainName + "</td>" +
        "<td>" + snapshot.val().destLocate + "</td>" +
        "<td>" + snapshot.val().freq + "</td>" +
        "<td class='nextTrain'>" + nextTrainFormatted + "</td> " +
        "<td class='timeLeft'>" + timeLeft + "</td></tr> "

    $("#recordTable tbody").append(insertRow);
    
});

// setInterval(rowRefresh, 1000)


// //2.  loop thru the attri and update the html 
// function rowRefresh () { 

//     $("#recordTable tbody tr").each(function (i, row) { // loooking inside the recordTable with tbody and inside with tr
//         // console.log(row);
//         var minCol = $(row).find('.timeLeft'); // find class
//         var nextCol = $(row).find('.nextTrain'); // find class

        
//         minCol.text(67); //displaying the result
//         minCol.text(67);  
//         console.log()
//             // $(".nextTrain").text(nextTrainFormatted);
//             // $(".timeLeft").text(timeLeft);   

//     })
    
   

// }