/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

let platforms
let player
let cursors
let letterA
let diamonds
let airborn
let playerY = 0
let playerYDelayed = 0
let letters = []

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
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  })

function preload () {
  this.load.image('bunny2_walk1', 'assets/players/bunny2_walk1.png')
  this.load.image('bunny2_walk2', 'assets/players/bunny2_walk2.png')
  this.load.image('bunny2_jump', 'assets/players/bunny2_jump.png')
  this.load.image('bunny2_stand', 'assets/players/bunny2_stand.png')

  this.load.image('background', 'assets/background/bg_layer4.png')
  this.load.image('ground_grass', 'assets/environment/ground_grass.png')
  this.load.image('ground_grass_small', 'assets/environment/ground_grass_small.png')
}

function create () {
  let style = {
    font: '48px Lilita One',
    fill: '#e5c100',
    align: 'center'
  }
  let createLetter = (letter, x, y) => {
    let theLetter = this.add.text(x, y, letter, style)
    this.physics.world.enable(theLetter)
    theLetter.setShadow(0, 0, 'yellow', 10)
    this.physics.add.collider(theLetter, platforms)
    letters.push(theLetter)
  }

  this.cameras.main.setBackgroundColor('#ffffff')
  this.add.image(500, 350, 'background').setScale(0.55)

  platforms = this.physics.add.staticGroup()
  platforms.create(250, 750, 'ground_grass')
  platforms.create(600, 650, 'ground_grass_small')
  platforms.create(300, 550, 'ground_grass_small')

  // Create all letters
  createLetter('B', 250, 200)
  createLetter('I', 350, 200)
  createLetter('L', 600, 200)

  player = this.physics.add.sprite(100, 600, 'bunny2_stand').setScale(0.3)

  player.setCollideWorldBounds(true)
  this.physics.add.collider(player, platforms)

  // Add collectLetters func to all letters
  for (let i = 0; i < letters.length; i++) {
    this.physics.add.overlap(player, letters[i], collectLetter)
  }

  cursors = this.input.keyboard.createCursorKeys()

  this.anims.create({
    key: 'bunny2-walk',
    frames: [
      { key: 'bunny2_walk1' },
      { key: 'bunny2_walk2' }
    ],
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'bunny2-idle',
    frames: [
      { key: 'bunny2_stand' }
    ],
    frameRate: 1,
    repeat: 0
  })
  this.anims.create({
    key: 'bunny2-jump',
    frames: [
      { key: 'bunny2_jump' }
    ],
    frameRate: 1,
    repeat: 0
  })
  console.log(game)
}

function update () {
  player.body.velocity.x = 0
  if (cursors.left.isDown) {
    player.body.velocity.x = -200
    player.flipX = true
  } else if (cursors.right.isDown) {
    player.body.velocity.x = +200
    player.flipX = false
  }

  if (cursors.up.isDown && player.body.onFloor()) {
    player.body.velocity.y = -350
  }
  if (cursors.up.isDown) {
    airborn = true
  }

  if (airborn) {
    player.anims.play('bunny2-jump', true).setScale(0.3)
  } else if (!airborn && cursors.left.isDown) {
    player.anims.play('bunny2-walk', true).setScale(0.3)
  } else if (!airborn && cursors.right.isDown) {
    player.anims.play('bunny2-walk', true).setScale(0.3)
  } else {
    player.anims.play('bunny2-idle', true).setScale(0.3)
  }

  // Set airborn variable for the jumping animation
  playerY = Math.trunc(player.y)
  setTimeout(() => {
    playerYDelayed = Math.trunc(player.y)
  }, 50)

  if (playerY > playerYDelayed) {
    airborn = false
  }
  // Debuggers
  this.input.keyboard.on('keydown_P', function (event) {
    console.log(player)
  })
}

function collectLetter (player, item) {
  item.destroy()
}
