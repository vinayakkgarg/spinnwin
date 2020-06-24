// Create basic skeleton of the game using Gameloop

let prizes_config = {
  count: 12,
  prize_names: [
    "3000 Credits",
    "35% Off",
    "Hard Luck",
    "70% Off",
    "Swagpack",
    "100% Off",
    "Netflix",
    "50% Off",
    "Amazon Voucher",
    "2 Extra Spin",
    "CB Tshirt",
    "CB Book",
  ],
};

let config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  backgroundColor: 0xffcc00,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  audio: {
    disableWebAudio: true,
  },
};

let game = new Phaser.Game(config);

function preload() {
  console.log("Inside preload");

  // using load object of scene object
  this.load.image("background", "../assets/back.jpg");
  this.load.image("wheel", "../assets/wheel.png");
  this.load.image("pin", "../assets/pin.png");
  this.load.image("stand", "../assets/stand.png");
  this.load.image("button", "../assets/button.png");
  this.load.audio("theme", ["assets/coffin.mp3"]);
}

function create() {
  console.log("create");

  let W = game.config.width;
  let H = game.config.height;

  // create bg
  let background = this.add.sprite(0, 0, "background");
  background.setPosition(W / 2, H / 2);
  background.setScale(0.2);

  // create pin
  let pin = this.add.sprite(W / 2, H / 2 - 250, "pin");
  //   wheel.setPosition(W / 2, H / 2);
  pin.setScale(0.25);
  pin.depth = 1;

  // create stand
  let stand = this.add.sprite(W / 2, H / 2 + 250, "stand");
  //   wheel.setPosition(W / 2, H / 2);
  stand.setScale(0.25);

  // create wheel
  this.wheel = this.add.sprite(0, 0, "wheel");
  this.wheel.setPosition(W / 2, H / 2);
  this.wheel.setScale(0.25);

  // create text object
  font_style = {
    font: "bold 30px Arial",
    color: "red",
    align: "center",
  };
  this.game_text = this.add.text(10, 10, "Welcome to spin n win", font_style);

  //create button
  this.button = this.add.sprite(W - 100, H - 100, "button").setInteractive();
  this.button.setScale(0.06);
  // event listener for mouseclick
  this.button.on("pointerdown", spinwheel, this);
}

function update() {
  console.log("Update");

  //   this.wheel.angle += 1;
  //   this.wheel.scaleX += 0.01;
  //   this.wheel.scaleY += 0.01;
  //   this.wheel.alpha -= 0.01;
}

function spinwheel() {
  var music = this.sound.add("theme");
  music.play();
  console.log("You clicked the mouse.");
  console.log("Start spinnign");

  // setTimeout(this.button.setScale(0.04), 500);
  // this.button.setScale(0.06);

  this.game_text.setText("You clicked the mouse");

  // generating random rounds + extra_degrees
  let rounds = Phaser.Math.Between(2, 5);
  let degrees = Phaser.Math.Between(0, 11) * 30;
  let total_angle = rounds * 360 + degrees;
  console.log(total_angle);

  let idx =
    prizes_config.count - 1 - Math.floor(degrees / (360 / prizes_config.count));

  tween = this.tweens.add({
    targets: this.wheel,
    angle: total_angle, // generate randomly
    ease: "Cubic.easeOut",
    duration: 6000,
    callbackScope: this,
    onStart: function () {
      game.input.enabled = false;
    },
    onComplete: function () {
      console.log("You won " + prizes_config.prize_names[idx]);
      this.game_text.setText("You won " + prizes_config.prize_names[idx]);
      game.input.enabled = true;
      music.stop();
    },
  });
}
