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

  // TODO: Push the scoreboard in here
  document.querySelector('#score').innerHTML = '<h1>hi</h1>'
}

function update () {

}
