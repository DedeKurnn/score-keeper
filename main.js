const player1 = {
    score: 0,
    button: document.querySelector('#player-one'),
    displayScore: document.querySelector('#score-p1')
}

const player2 = {
    score: 0,
    button: document.querySelector('#player-two'),
    displayScore: document.querySelector('#score-p2')
}

const reset = document.querySelector('.reset');
const winScore = document.querySelector('#playing-to');
const image = document.querySelector('img');

let winningScore = winScore.value;
let isGameOver = false;

function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score++;
        if (player.score == winningScore) {
            gameOver();
            player.displayScore.style.color = "green";
            opponent.displayScore.style.color = "red";
        }
        player.displayScore.textContent = parseInt(player.score);
    }
}

player1.button.addEventListener('click', function () {
    updateScore(player1, player2);
});

player2.button.addEventListener('click', function () {
    updateScore(player2, player1);
});

reset.addEventListener("click", function () {
    resetGame();
})

winScore.addEventListener('change', function() {
 winningScore = winScore.value;
    resetGame();
})

function gameOver() {
    isGameOver = true;
    player1.button.disabled = true;
    player2.button.disabled = true;
    image.style.opacity = 0;
    setTimeout(function () {
        image.src = "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80";
        image.style.opacity = 1;
    }, 500);

    start();
    stop();
}

function resetGame() {
    player1.score = 0;
    player2.score = 0;
    player1.displayScore.textContent = "0";
    player2.displayScore.textContent = "0";
    player1.displayScore.style.color = "";
    player2.displayScore.style.color = "";
    player1.button.disabled = false;
    player2.button.disabled = false;
    isGameOver = false;

    image.style.opacity = 0;
    setTimeout(function () {
        image.src = "https://images.unsplash.com/photo-1609432638531-5ef8d0507b90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
        image.style.opacity = 1;
    }, 500);
}

// This code below is from confetti.js file. I keep getting error when trying to import it. So instead I just copy the code here.

const start = () => {
    setTimeout(function() {
        startConfetti();
    }, 1000);
}
const stop = () => {
    setTimeout(function() {
        stopConfetti();
    }, 5000);
}

var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function() {
	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();
