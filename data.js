let scoreData = []

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyANSdO0NqlVbbw0Rw-egbRAe0x9k_eNSjQ',
    projectId: 'word-platformer'
  });
  
  var db = firebase.firestore();
  
  firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  

// Write
let writeScore = (name, time, callback1, callback2) => {
return db.collection("score").add({
    name: name,
    time: time
    })
    .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    if (callback1 != undefined) {
        callback1(callback2)
    }
    })
    .catch(function(error) {
    console.error("Error adding document: ", error);
    });
}

function test () {
    console.log('opening modal')
}

// Read
let readScore = (callback) => {
    scoreData = []
    return db.collection("score").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            scoreData.push(doc.data());
        });
        if (callback != undefined) {
            callback()
        }
        console.log(scoreData)
    });
}