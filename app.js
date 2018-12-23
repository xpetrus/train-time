$(document).ready(function(){
//intializing firebase
var config = {
    apiKey: "AIzaSyDiNIbOV_Ius1pu_YflEsZuzUnOzYvdsUo",
    authDomain: "train-time-87972.firebaseapp.com",
    databaseURL: "https://train-time-87972.firebaseio.com",
    projectId: "train-time-87972",
    storageBucket: "train-time-87972.appspot.com",
    messagingSenderId: "1045114609430"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //var trainsRef = database.ref("/trains");

  var tname = "";
  var destination = "";
  var ftt = "";
  var frequency = 0;

  var minTillTrain = 0;
  var nextArrival = "";
  

  console.log("Current Time: "+ moment().format("hh:mm"));

$("#submit").on("click", function(event){
    event.preventDefault();
    
    tname = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    ftt = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    var ftconverted = moment(ftt, "HH:mm").subtract(1, "years");
   

    var diffTime = moment().diff(moment(ftconverted), "minutes");
    //console.log("difference in minutes: "+diffTime);

    var tRemain = diffTime % frequency;
    //console.log(tRemain);

    minTillTrain = frequency - tRemain;
    console.log("Min till trains: "+minTillTrain);
    nextArrival = moment().add(minTillTrain, "minutes");
    var nextArrivalTime = moment(nextArrival).format("hh:mm");
    console.log("Next Arrival" + nextArrivalTime);


    database.ref().push({
        tname:tname,
        destination:destination,
        ftt:ftt,
        frequency:frequency,
        nextArrival:nextArrivalTime,
        minTillTrain:minTillTrain
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

    //console.log(trains);


});

database.ref().on("child_added", function(snap){
    console.log(snap.val().tname);
    console.log(snap.val().destination);
    console.log(snap.val().ftt);
    console.log(snap.val().frequency);

    var nrow = $("<tr>");
    nrow.append("<td>"+snap.val().tname+"</td>"
    +"<td>"+snap.val().destination+"</td>"
    +"<td>"+snap.val().frequency+"</td>"
    +"<td>"+snap.val().nextArrival+"</td>"
    +"<td>"+snap.val().minTillTrain+"</td>");
    
    
    $("#schedule").append(nrow);


    

})




});