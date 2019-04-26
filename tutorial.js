let tutorial = {
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
}

function update () {

}
