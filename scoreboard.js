let scoreboard = {
  preload: preload,
  create: create,
  update: update
}

function preload () {
  // Background assets
  this.load.image('background', 'assets/background/bg_layer2.png')
}

function create () {
  // Set background color and background
  this.cameras.main.setBackgroundColor('#ffffff')
  this.add.image(500, 350, 'background').setScale(0.55)

  removeClasses('#score')

  document.querySelector('#nameField').addEventListener('keyup', event => {
    if (event.key !== 'Enter') return
    document.querySelector('#nameButton').click()
    event.preventDefault()
  })
}

function update () {

}

function addClass (id, theClass) {
  document.querySelector(id).classList += theClass
}

function removeClasses (id) {
  document.querySelector(id).classList = ''
}

function theScoreboard () {
  sortScore()
  document.querySelector('#score').innerHTML = (
    '<h2>Topplista' +
    '</h2>' +
    '<ol>' +
    '</ol>'
  )
  for (let i = 0; i < scoreData.length; i++) {
    document.querySelector('#score > ol').innerHTML += (
      '<li>' + scoreSorted[i].name + ' ' + scoreSorted[i].time + '</li>'
    )
  }
}

function sortScore () {
  scoreSorted = scoreData.sort(function (a, b) {
    return a.time - b.time
  })
}

function loadingScreen () {
  sortScore()
  document.querySelector('#score').innerHTML = (
    'Loading'
  )
}
