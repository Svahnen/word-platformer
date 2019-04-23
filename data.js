let scoreData = []

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyANSdO0NqlVbbw0Rw-egbRAe0x9k_eNSjQ',
  projectId: 'word-platformer'
})

let db = firebase.firestore()

firebase.auth().signInAnonymously().catch(function (error) {
  let errorCode = error.code
  let errorMessage = error.message
  return (errorCode, errorMessage)
})

// Write
let writeScore = (name, time, callback1, callback2) => {
  if (reg.test(document.querySelector('#nameField').value)) {
    return db.collection('score').add({
      name: name,
      time: time
    })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
        if (callback1 !== undefined) {
          callback1(callback2)
        }
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }
}

// Read
let readScore = (callback) => {
  loadingScreen()
  scoreData = []
  return db.collection('score').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      scoreData.push(doc.data())
      console.log(doc.id, doc.data())
    })
    if (callback !== undefined) {
      callback()
    }
  })
}

// Delete specific score
let deleteScore = (id) => {
  db.collection('score').doc(id).delete().then(function () {
    console.log('Document successfully deleted!')
  }).catch(function (error) {
    console.error('Error removing document: ', error)
  })
}

// Delete all scores
let wipeAllScores = () => {
  return db.collection('score').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      deleteScore(doc.id)
    })
  })
}
