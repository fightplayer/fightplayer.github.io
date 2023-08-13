$(function() {
    var enemy2Speed = 3;

    var enemy2Interval;
    $(window).on('blur', function() {
        clearInterval(enemy2Interval);
    });
    $(window).on('focus', function() {
        enemy2Interval = setInterval(function() {
            createEnemy2();
        }, 2000);
    });

    function createEnemy2() {
        var enemyX = Math.random() * ($(window).width() - 20);
        var enemyY = -20;
        var enemy = $('<div class="enemy"></div>');
        enemy.css({
            left: enemyX,
            top: enemyY
        });
        $('body').append(enemy);
        enemies.push({
            x: enemyX,
            y: enemyY,
            element: enemy
        });
    }

    var originalUpdateEnemies = updateEnemies;
    updateEnemies = function() {
        originalUpdateEnemies();
        for (var i = enemies.length - 1; i >= 0; i--) {
            var enemy = enemies[i];
            if (!enemy.direction) {
                enemy.y += enemy2Speed;
                if (enemy.y > $(window).height()) {
                    enemies.splice(i, 1);
                    enemy.element.remove();
                } else {
                    enemy.element.css({
                        top: enemy.y
                    });
                }
            }
        }
    }
});
