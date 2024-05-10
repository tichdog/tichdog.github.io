let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
// cell size
let grid = 16;
let speedSnake = 0;

let snake = {
    x: 160,
    y: 160,
    // speed
    dx: grid,
    dy: 0,
    cells: [],
    // snake len
    maxCells: 4
};

let apple = {
    x: 320,
    y: 320
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function loop() {
    requestAnimationFrame(loop);
    if (++speedSnake < 4) {
        return;
    }
    speedSnake = 0;
    // clear map
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';
    // processing snake
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            // snake len ++
            snake.maxCells++;
            // new apple
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }
        // check fail
        for (let i = index + 1; i < snake.cells.length; i++) {
            // restart game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                // start
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                // new apple
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

// Control keyboard
document.addEventListener('keydown', function (e) {
    // left
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
// play game
requestAnimationFrame(loop);