let tutorial = {
  preload: preload,
  create: create
}

function preload () {
  this.scene.add('world', world)
  // Background assets
  this.load.image('background', 'assets/background/bg_layer2.png')
}

function create () {
  // Set background color and background
  this.cameras.main.setBackgroundColor('#ffffff')
  this.add.image(500, 350, 'background').setScale(0.55)

  let runTutorial = () => {
    setTimeout(() => {
      tutorialWalkRight()
    }, 1000)
    setTimeout(() => {
      tutorialWalkLeft()
    }, 4500)
    setTimeout(() => {
      tutorialJump()
    }, 8000)
    setTimeout(() => {
      document.querySelector('#tutorial').classList = 'displayNone'
      this.scene.start('world', world)
    }, 12000)
  }
  document.querySelector('#preload').addEventListener('load', runTutorial())
}
