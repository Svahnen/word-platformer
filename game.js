/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

let platforms
let player
let cursors
let facing

let game = new Phaser.Game(
  {
    width: 800,
    height: 600,
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
  this.load.image('background', 'assets/sky.png')
  this.load.image('platform', 'assets/platform.png')
  this.load.spritesheet('playerSprite', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 })
}

function create () {
  this.add.image(400, 300, 'background')

  platforms = this.physics.add.staticGroup()
  platforms.create(400, 568, 'platform').setScale(2).refreshBody()
  platforms.create(200, 425, 'platform')

  player = this.physics.add.sprite(100, 520, 'playerSprite')
  player.setBounce(0.2)
  player.setCollideWorldBounds(true)
  this.physics.add.collider(player, platforms)

  cursors = this.input.keyboard.createCursorKeys()

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('playerSprite', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('playerSprite', { start: 2, end: 3 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'idle-left',
    frames: this.anims.generateFrameNumbers('playerSprite', { start: 1, end: 1 }),
    frameRate: 10,
    repeat: 0
  })
  this.anims.create({
    key: 'idle-right',
    frames: this.anims.generateFrameNumbers('playerSprite', { start: 2, end: 2 }),
    frameRate: 10,
    repeat: 0
  })
}

function update () {
  player.body.velocity.x = 0
  if (cursors.left.isDown) {
    player.body.velocity.x = -200
    player.anims.play('left', true)
    facing = 'left'
  } else if (cursors.right.isDown) {
    player.body.velocity.x = +200
    player.anims.play('right', true)
    facing = 'right'
  } else {
    if (facing === 'left') {
      player.anims.play('idle-left', true)
    } else {
      player.anims.play('idle-right', true)
    }
  }
  if (cursors.up.isDown && player.body.onFloor()) {
    player.body.velocity.y = -300
  }
}
