$(function() {
    var player = $('#player');
    var playerX = $(window).width() / 2;
    var playerY = $(window).height() - player.height();
    var playerSpeed = 10;
    var enemies = [];
    var bullets = [];
    var enemySpeed = 2;
    var bulletSpeed = 5;
    var score = 0;
    var keys = {};
    var canShoot = true;
    var shootDelay = 500;

    $(document).on('keydown', function(e) {
        keys[e.which] = true;
    });

    $(document).on('keyup', function(e) {
        keys[e.which] = false;
    });

    setInterval(function() {
        if (keys[37]) {
            playerX -= playerSpeed;
        }
        if (keys[39]) {
            playerX += playerSpeed;
        }
        if (keys[32] && canShoot) {
            shoot();
            canShoot = false;
            setTimeout(function() {
                canShoot = true;
            }, shootDelay);
        }
        updatePlayer();
        updateEnemies();
        updateBullets();
        checkCollisions();
        updateScore();
    }, 20);

    var enemyInterval = setInterval(function() {
        createEnemy();
    }, 1000);

    $(window).on('blur', function() {
        clearInterval(enemyInterval);
    });

    $(window).on('focus', function() {
        enemyInterval = setInterval(function() {
            createEnemy();
        }, 1000);
    });

    function updatePlayer() {
        if (playerX < 0) {
            playerX = 0;
        } else if (playerX > $(window).width() - player.width()) {
            playerX = $(window).width() - player.width();
        }
        player.css({left: playerX, top: playerY});
    }

    function createEnemy() {
        var enemyX = Math.random() * ($(window).width() - 20);
        var enemyY = -20;
        var enemy = $('<div class="enemy"></div>');
        enemy.css({left: enemyX, top: enemyY});
        $('body').append(enemy);
        enemies.push({x: enemyX, y: enemyY, element: enemy});
    }

    function updateEnemies() {
        for (var i = enemies.length - 1; i >= 0; i--) {
            var enemy = enemies[i];
            enemy.y += enemySpeed;
            if (enemy.y > $(window).height()) {
                enemies.splice(i, 1);
                enemy.element.remove();
            } else {
                enemy.element.css({top: enemy.y});
            }
        }
    }

