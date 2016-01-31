/* ------------------ ENEMIES ---------------------- */

// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.x = startX;
	this.y = startY;
	this.speed = speed;

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x = this.x + this.speed * dt;
	if (this.x > 500) {
		// Initial enemy x location
		this.x = -60;
		this.randomSpeed();
	}
	var bugXLeftRange = this.x - 50;
	var bugXRightRange = this.x + 50;
	var bugYTopRange = this.y - 50;
	var bugYBottomRange = this.y + 50;

	if (player.x > bugXLeftRange && player.x < bugXRightRange && player.y > bugYTopRange && player.y < bugYBottomRange) {
		player.resetPlayerPosition();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Random enemey speed
Enemy.prototype.randomSpeed = function() {
	var speedMultiply = Math.floor(Math.random() * 5 + 1);
	this.speed = 80 * speedMultiply;
};

/* ------------------ PLAYER ---------------------- */

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var playerInitialX = 200,
    playerInitialY = 400;

var Player = function() {
    // Play initial place coordinate
    this.x = playerInitialX;
    this.y = playerInitialY;
    this.wallChecker = {
        leftWall: false,
        rightWall: false,
        bottomWall: true
    };
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype = {
    // Player class instance methods (EMPTY)
    update: function() {},
    // Draw the player
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    resetPlayerPosition: function() {
        this.x = playerInitialX;
        this.y = playerInitialY;
        this.resetCheckPosition();
    },
    handleInput: function(keyPressed) {
        // Key press listener, 'left', 'up', 'right', 'down'
        var stepHorizontalLength = 100;
        var stepVerticalLength = 90;
        this.checkPosition();

        if (keyPressed === 'left') {
            if (this.wallChecker.leftWall) {}
            this.x -= stepHorizontalLength;
        } else if (keyPressed === 'right') {
            if (this.wallChecker.rightWall) {}
            this.x += stepHorizontalLength;
        } else if (keyPressed === 'up') {
            if (this.y === 40) {
                this.resetPlayerPosition();
            }
            this.y -= stepVerticalLength;
        } else if (keyPressed === 'down') {
            if (this.wallChecker.bottomWall) {}
            this.y += stepVerticalLength;
        } else {
            console.log('WRONG KEY');
        }
    },
    checkPosition: function() {
        if (this.x === 0) {
            this.setHorizontalWallCheckerState(true, false);
        } else if (this.x === 400) {
            this.setHorizontalWallCheckerState(false, true);
        } else {
            this.setHorizontalWallCheckerState(false, false);
        }
        if (this.y === 400) {
            this.wallChecker.bottomWall = true;
        } else {
            this.wallChecker.bottomWall = false;
        }
    },
    resetCheckPosition: function() {
        this.setHorizontalWallCheckerState(false, false);
        this.wallChecker.bottomWall = true;
    },
    setHorizontalWallCheckerState: function() {
        // this.wallChecker.leftWall = leftWallState;
        // this.wallChecker.rightWall = rightWallState;
    }
};

/* ------------------ OBJECTS ---------------------- */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

// Instantiate all enemies
for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

