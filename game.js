let word = [
  {
    letter: 'B',
    x: 470,
    y: 100
  },
  {
    letter: 'I',
    x: 280,
    y: 200
  },
  {
    letter: 'L',
    x: 660,
    y: 200
  }
]

let game = new Phaser.Game(
  {
    width: 1024,
    height: 768,
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: false
      }
    },
    scene: world
  })
