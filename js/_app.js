// Enemies our player must avoid
var Enemy = function(posit) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-asteroid.png';
	this.x = -101;
	if(posit === 0) {
		this.y = 63;
	}
	else {
		this.y = 63 + posit * 83;
	}
	this.speed = this.howMuchSpeed();

	return this;
};

//Randomize enemy speed
Enemy.prototype.howMuchSpeed = function() {
	var speed = Math.floor(Math.random()*150 + 250);
	return speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	this.x += (this.speed * dt);

	// Restarts enemies when they exit the canvas
	if(this.x > 500){
		this.x = -101;
		this.speed = this.howMuchSpeed();

		var loc = Math.floor(Math.random()*3);
		if(loc === 0){
			this.y = 63;
		}
		else if(loc === 1){
			this.y = 146;
		}
		else {
			this.y = 229;
		}
	}

	// Reset character if hit by an enemy
	if(player.x < this.x + 65 && player.x + 50 > this.x && player.y < this.y + 60 && player.y + 60 > this.y){
		player.x = 200;
		player.y = 400;
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

var Player = function(posx, posy){
	this.sprite = 'images/char-falcon.png';
	this.x = posx;
	this.y = posy;

	this.Xmovement = 0;
	this.Ymovement = 0;

	return this;
};

// Move the character
Player.prototype.update = function() {

	this.x += this.Xmovement;
	this.y += this.Ymovement;

	// Prevent the payer from going off the canvas
	if(this.x > 401){
		this.x = 401;
	}
	else if(this.x < 1){
		this.x = 1;
	}
	else if(this.y > 405){
		this.y = 405;
	}
	else if(this.y < 1){
		player.x = 201;
		player.y = 405;
	}

	this.Xmovement = 0;
	this.Ymovement = 0;
};

// Draw the character
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if movements keys were pressed
Player.prototype.handleInput = function(move) {

	if(move === "up"){
		this.Ymovement = -83;
	}
	else if(move === "down"){
		this.Ymovement = 83;
	}
	else if(move === "right"){
		this.Xmovement = 100;
	}
	else if(move === "left"){
		this.Xmovement = -100;
	}
};

/* ------------------ OBJECTS ---------------------- */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for(var enemyId = 0; enemyId < 3; enemyId++) {
	allEnemies.push(new Enemy(enemyId));
}

var player = new Player(200, 400);


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

