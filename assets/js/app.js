var config = {
    apiKey: "AIzaSyDqfjsFwbAYqhY3Srz9QaYUGtFJ8rIG6J8",
    authDomain: "choo-choo-time.firebaseapp.com",
    databaseURL: "https://choo-choo-time.firebaseio.com",
    storageBucket: "choo-choo-time.appspot.com",
    messagingSenderId: "199296430708"
  };

firebase.initializeApp(config);

var trainData = firebase.database();


$("#addTrainBtn").on("click", function(){
	// Grabs user input
	var name = $("#train-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var time = $("#time-input").val().trim();
	var frequency = $("#frequency-input").val().trim();

	console.log($("#time-input").val().trim());

	var newTrain = {
		name: name,
		destination: destination,
		time: time,
		frequency: frequency
	}

	console.log(newTrain);

	trainData.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#train-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#frequency-input").val("");

	return false;
});

trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var name = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequency;

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(time,"HH:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		var nextArrival = moment(nextTrain).format("hh:mm");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	console.log(name);
	console.log(destination);
	console.log(time);
	console.log(frequency);

	$("#time").html("Current Time: " + currentTime.format("hh:mm"));
	$("#trainTable tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});