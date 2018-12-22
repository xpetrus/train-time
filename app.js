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
  var frequency = "";

$("#submit").on("click", function(event){
    event.preventDefault();
    
    tname = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    ftt = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        tname:tname,
        destination:destination,
        ftt:ftt,
        frequency:frequency
    });

    

    //console.log(trains);


});

database.ref().on("child_added", function(snap){
    console.log(snap.val().tname);
})




});