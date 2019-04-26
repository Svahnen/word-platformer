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

function tutorialJump () {
  document.querySelector('#spaceBar').classList = 'selected'
  document.querySelector('#upArrow').classList = 'selected'
  document.querySelector('#player').classList = 'jump'
  setTimeout(() => {
    document.querySelector('#player').classList = 'idle'
    document.querySelector('#spaceBar').classList = ''
    document.querySelector('#upArrow').classList = ''
  }, 3000)
}

function tutorialWalkLeft () {
  document.querySelector('#leftArrow').classList = 'selected'
  document.querySelector('#player').classList = 'walkLeft'
  setTimeout(() => {
    document.querySelector('#player').classList = 'idle'
    document.querySelector('#leftArrow').classList = ''
  }, 3000)
}

function tutorialWalkRight () {
  document.querySelector('#rightArrow').classList = 'selected'
  document.querySelector('#player').classList = 'walkRight'
  setTimeout(() => {
    document.querySelector('#player').classList = 'idle'
    document.querySelector('#rightArrow').classList = ''
  }, 3000)
}
