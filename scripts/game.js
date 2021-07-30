//import "phaser";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image("card-blank", "../assets/card-blank.png");
    this.load.image("card-back", "../assets/card-back4.png");
    for (let index = 1; index < 14; index++) {
        this.load.image("card-clubs-" + index.toString(),
            "../assets/card-clubs-" + index.toString() + ".png");
    }
    for (let index = 1; index < 14; index++) {
        this.load.image("card-diamonds-" + index.toString(),
            "../assets/card-diamonds-" + index.toString() + ".png");
    }
    for (let index = 1; index < 14; index++) {
        this.load.image("card-hearts-" + index.toString(),
            "../assets/card-hearts-" + index.toString() + ".png");
    }
    for (let index = 1; index < 14; index++) {
        this.load.image("card-spades-" + index.toString(),
            "../assets/card-spades-" + index.toString() + ".png");
    }
}

function Card(type, value, x, y, sprite) {
    this.type = type;
    this.value = value;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

var spades = [];
var diamonds = [];
var clubs = [];
var hearts = [];

var stack = [];

function create() {
    // First, we'll create the cards, assign a sprite to each, and set position.
    for (let index = 1; index < 14; index++) {
        spades[index - 1] = new Card("spade", index, 50 * index, 100,
            this.add.sprite(10, 10, "card-spades-" + index.toString()));
        spades[index - 1].sprite.setPosition(spades[index - 1].x, spades[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        diamonds[index - 1] = new Card("diamond", index, 50 * index, 200,
            this.add.sprite(10, 10, "card-diamonds-" + index.toString()));
        diamonds[index - 1].sprite.setPosition(diamonds[index - 1].x, diamonds[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        clubs[index - 1] = new Card("club", index, 50 * index, 300,
            this.add.sprite(10, 10, "card-clubs-" + index.toString()));
        clubs[index - 1].sprite.setPosition(clubs[index - 1].x, clubs[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        hearts[index - 1] = new Card("heart", index, 50 * index, 400,
            this.add.sprite(10, 10, "card-hearts-" + index.toString()));
        hearts[index - 1].sprite.setPosition(hearts[index - 1].x, hearts[index - 1].y);
    }

    for (const index in spades) {
        stack.push(spades[index]);
    }

    for (const index in diamonds) {
        stack.push(diamonds[index]);
    }

    for (const index in clubs) {
        stack.push(clubs[index]);
    }

    for (const index in hearts) {
        stack.push(hearts[index]);
    }

    // Then, we add interactivity to each card.
    for (const index in stack) {
        stack[index].sprite.setInteractive(new Phaser.Geom.Rectangle(0, 0,
            stack[index].sprite.width, stack[index].sprite.height),
            Phaser.Geom.Rectangle.Contains);
    }

    this.input.on("gameobjectover", function(pointer, gameObject) {
        gameObject.setTint(0x7878ff);
    })

    this.input.on("gameobjectout", function(pointer, gameObject) {
        gameObject.clearTint();
    })


}

function update() {
    // Refresh position for all cards
    for (let index = 1; index < 14; index++) {
        spades[index - 1].sprite.setPosition(spades[index - 1].x, spades[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        diamonds[index - 1].sprite.setPosition(diamonds[index - 1].x, diamonds[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        clubs[index - 1].sprite.setPosition(clubs[index - 1].x, clubs[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        hearts[index - 1].sprite.setPosition(hearts[index - 1].x, hearts[index - 1].y);
    }
}