let platforms
let extraAssets
let player
let cursors
let jumping
let playerY = 0
let playerYDelayed = 0
let letters = []
let collectedLetters = []
let timer
let finalScore
let scoreSorted = []
let spaceBar
let scoreData = []

let regLetters = /^[a-zA-Z\u0080-\u00FF]+$/
let regNumbers = /^[0-9]+$/

function addClass (id, theClass) {
  document.querySelector(id).classList += theClass
}

function removeClasses (id) {
  document.querySelector(id).classList = ''
}
