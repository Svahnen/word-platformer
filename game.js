/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

let platforms
let player
let cursors
let facing = 'right'
let a
let diamonds

let game = new Phaser.Game(
  {
    width: 1024,
    height: 768,
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
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

  this.load.image('background', 'assets/sky.png')
  this.load.image('platform', 'assets/platform.png')
}

function create () {
  this.add.image(400, 300, 'background').setScale(1.6)

  platforms = this.physics.add.staticGroup()
  platforms.create(500, 750, 'platform').setScale(3).refreshBody()
  platforms.create(200, 500, 'platform')
  platforms.create(400, 600, 'platform')

  let style = { font: '48px Arial', fill: '#000000', align: 'center' }

  a = this.add.text(300, 400, 'A', style)
  this.physics.world.enable(a)

  this.physics.add.collider(a, platforms)

  player = this.physics.add.sprite(100, 600, 'bunny2_walk1').setScale(0.3)
  player.setBounce(0.3)
  player.setCollideWorldBounds(true)
  this.physics.add.collider(player, platforms)
  this.physics.add.overlap(player, a, collectLetter)

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
      { key: 'bunny2_walk1' }
    ],
    frameRate: 10,
    repeat: 0
  })
}

function update () {
  player.body.velocity.x = 0
  if (cursors.left.isDown) {
    player.body.velocity.x = -200
    player.anims.play('bunny2-walk', true).setScale(0.3)
    facing = 'left'
    player.scaleX *= -1
  } else if (cursors.right.isDown) {
    player.body.velocity.x = +200
    player.anims.play('bunny2-walk', true).setScale(0.3)
    facing = 'right'
  } else {
    if (facing === 'left') {
      player.anims.play('bunny2-idle', true).setScale(0.3)
      player.scaleX *= -1
    } else {
      player.anims.play('bunny2-idle', true).setScale(0.3)
    }
  }
  if (cursors.up.isDown && player.body.onFloor()) {
    player.body.velocity.y = -300
  }
}

function collectLetter (player, item) {
  item.destroy()
}
