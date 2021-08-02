//import "phaser";

var config = {
    type: Phaser.AUTO,
    parent: "game",
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
var blank;

var stack = [];
var center = {
    x: config.width / 2,
    y: config.height / 2
};

var stash = {
    x: center.x / 4,
    y: center.y
};

var player = {
    x: center.x,
    y: center.y * 3 / 4,
    total: 0,
    hand: []
};

var opponent = {
    x: center.x,
    y: center.y / 4,
    total: 0,
    hand: []
};

function create() {
    // First, we'll create the cards, assign a sprite to each, and set position.
    for (let index = 1; index < 14; index++) {
        spades[index - 1] = new Card("spade", index, stash.x, stash.y,
            this.add.sprite(10, 10, "card-spades-" + index.toString()));
        spades[index - 1].sprite.setPosition(spades[index - 1].x, spades[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        diamonds[index - 1] = new Card("diamond", index, stash.x, stash.y,
            this.add.sprite(10, 10, "card-diamonds-" + index.toString()));
        diamonds[index - 1].sprite.setPosition(diamonds[index - 1].x, diamonds[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        clubs[index - 1] = new Card("club", index, stash.x, stash.y,
            this.add.sprite(10, 10, "card-clubs-" + index.toString()));
        clubs[index - 1].sprite.setPosition(clubs[index - 1].x, clubs[index - 1].y);
    }
    for (let index = 1; index < 14; index++) {
        hearts[index - 1] = new Card("heart", index, stash.x, stash.y,
            this.add.sprite(10, 10, "card-hearts-" + index.toString()));
        hearts[index - 1].sprite.setPosition(hearts[index - 1].x, hearts[index - 1].y);
    }
    blank = new Card("back", 0, stash.x, stash.y, this.add.sprite(stash.x, stash.y, "card-back"));

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

    blank.sprite.setInteractive(new Phaser.Geom.Rectangle(0, 0,
        blank.sprite.width, blank.sprite.height), Phaser.Geom.Rectangle.Contains);

    this.input.on("gameobjectover", function(pointer, gameObject) {
        gameObject.setTint(0x7878ff);
    })

    this.input.on("gameobjectout", function(pointer, gameObject) {
        gameObject.clearTint();
    })


}

function update() {
    // Refresh position for all cards
    for (const index in stack) {
        stack[index].sprite.setPosition(stack[index].x, stack[index].y);
    }
    if (player.hand.length > 0) {
        for (const index in player.hand) {
            player.hand[index].sprite.setPosition(player.hand[index].x, player.hand[index].y);
        }
    }
    if (opponent.hand.length > 0) {
        for (const index in opponent) {
            opponent.hand[index].sprite.setPosition(opponent.hand[index].x, opponent.hand[index].y);
        }
    }
}

function dealCard(activePlayer) {
    let index = Math.round(Math.random() * 52);
    let dealtCard = stash.splice(index, 1);
    for (const card in dealtCard) {
        activePlayer.hand.push(dealtCard[card]);
        activePlayer.total += dealtCard[card].value;
    }
}