let world = {
  preload: preload,
  create: create,
  update: update
}

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

function preload () {
  // Add more scenes
  this.scene.add('scoreboard', scoreboard)

  // Player assets
  this.load.image('bunny2_walk1', 'assets/players/bunny2_walk1.png')
  this.load.image('bunny2_walk2', 'assets/players/bunny2_walk2.png')
  this.load.image('bunny2_jump', 'assets/players/bunny2_jump.png')
  this.load.image('bunny2_stand', 'assets/players/bunny2_stand.png')

  // Background assets
  this.load.image('background', 'assets/background/bg_layer2.png')

  // Ground assets
  this.load.image('ground_grass', 'assets/environment/ground_grass.png')
  this.load.image('ground_grass_small', 'assets/environment/ground_grass_small.png')

  // Extra assets
  this.load.image('cactus', 'assets/environment/cactus.png')
  this.load.image('grass1', 'assets/environment/grass1.png')
  this.load.image('grass2', 'assets/environment/grass2.png')
  this.load.image('mushroom_brown', 'assets/environment/mushroom_brown.png')
}

function create () {
  let style = {
    font: '48px Lilita One',
    fill: '#ffd700',
    align: 'center'
  }
  let showAtTop = (item) => {
    let letter = item.text
    let x
    for (let i = 0; i < word.length; i++) {
      if (word[i].letter === item.text) {
        if (word[i].x === item.x) {
          x = 50 * i + 50
          let theLetter = this.add.text(x, 50, letter, style)
          theLetter.setShadow(0, 0, 'black', 2)
          collectedLetters.push(letter)
        }
      }
    }
  }
  let createLetter = (letter, x, y) => {
    let theLetter = this.add.text(x, y, letter, style)
    this.physics.world.enable(theLetter)
    theLetter.setShadow(0, 0, 'black', 2)
    this.physics.add.collider(theLetter, platforms)
    letters.push(theLetter)
  }

  function collectLetter (player, item) {
    showAtTop(item)
    item.destroy()
  }

  // Set timer start number to 0
  timer = this.add.text(900, 50, '0', style)

  let showTimer = (seconds) => {
    timer.destroy()
    timer = this.add.text(900, 50, seconds, style)
    timer.setShadow(0, 0, 'black', 2)
  }
  setInterval(() => {
    showTimer(parseInt(timer.text, 10) + 1)
  }, 1000)

  cursors = this.input.keyboard.createCursorKeys()

  // Set background color and background
  this.cameras.main.setBackgroundColor('#ffffff')
  this.add.image(500, 350, 'background').setScale(0.55)

  // Make extra stationary
  extraAssets = this.physics.add.staticGroup()

  // Place extra assets
  extraAssets.create(230, 460, 'cactus').setScale(0.5)
  extraAssets.create(830, 690, 'grass1').setScale(0.5)
  extraAssets.create(890, 690, 'grass1').setScale(0.5)
  extraAssets.create(220, 690, 'grass2').setScale(0.5)
  extraAssets.create(260, 690, 'grass2').setScale(0.5)
  extraAssets.create(300, 690, 'grass2').setScale(0.5)
  extraAssets.create(860, 680, 'mushroom_brown').setScale(0.5)

  // Make platforms stationary
  platforms = this.physics.add.staticGroup()

  // Place platforms
  platforms.create(170, 750, 'ground_grass')
  platforms.create(860, 750, 'ground_grass')
  platforms.create(500, 660, 'ground_grass_small')
  platforms.create(230, 550, 'ground_grass_small')
  platforms.create(640, 480, 'ground_grass_small')

  // Create all letters
  for (let i = 0; i < word.length; i++) {
    createLetter(word[i].letter, word[i].x, word[i].y)
  }

  // Spawn the player
  player = this.physics.add.sprite(100, 600, 'bunny2_stand').setScale(0.3)

  player.setCollideWorldBounds(true)
  this.physics.add.collider(player, platforms)

  // Add collectLetter function to all letters
  for (let i = 0; i < letters.length; i++) {
    this.physics.add.overlap(player, letters[i], collectLetter)
  }

  // Animations
  this.anims.create({
    key: 'bunny2-walk',
    frames: [{
      key: 'bunny2_walk1'
    },
    {
      key: 'bunny2_walk2'
    }
    ],
    frameRate: 8,
    repeat: -1
  })
  this.anims.create({
    key: 'bunny2-idle',
    frames: [{
      key: 'bunny2_stand'
    }],
    frameRate: 1,
    repeat: 0
  })
  this.anims.create({
    key: 'bunny2-jump',
    frames: [{
      key: 'bunny2_jump'
    }],
    frameRate: 1,
    repeat: 0
  })

  // Debuggers
  this.input.keyboard.on('keydown_U', function (event) {
    player.body.velocity.y = -350
  })
  this.input.keyboard.on('keydown_S', (event) => {
    finalScore = timer.text
    this.scene.start('scoreboard', scoreboard)
  })
  this.input.keyboard.on('keydown_P', function (event) {
    console.log(player)
  })
}

function update () {
  // Load scoreboard if all letters are collected
  if (word.length === collectedLetters.length) {
    finalScore = timer.text
    this.scene.start('scoreboard', scoreboard)
  }

  // Keybindnings
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

  // Set jumping variable for the jumping animation
  if (cursors.up.isDown) {
    jumping = true
  }
  playerY = Math.trunc(player.y)
  setTimeout(() => {
    playerYDelayed = Math.trunc(player.y)
  }, 50)
  if (playerY > playerYDelayed) {
    jumping = false
  }

  // Show animations
  if (jumping) {
    player.anims.play('bunny2-jump', true).setScale(0.3)
  } else if (!jumping && cursors.left.isDown) {
    player.anims.play('bunny2-walk', true).setScale(0.3)
  } else if (!jumping && cursors.right.isDown) {
    player.anims.play('bunny2-walk', true).setScale(0.3)
  } else {
    player.anims.play('bunny2-idle', true).setScale(0.3)
  }
}
