    // Configuración del juego
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const player = {
      x: 50,
      y: canvas.height - 30,
      width: 30,
      height: 30,
      color: "#00F"
    };

    const obstacles = [];

    let score = 0;
    let gameSpeed = 5;

    // Función principal del juego
    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mover jugador
      player.x += 5;

      // Dibujar jugador
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Generar obstáculos
      if (Math.random() < 0.02) {
        generateObstacle();
      }

      // Mover y dibujar obstáculos
      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= gameSpeed;
        ctx.fillStyle = "#F00";
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // Verificar colisiones con obstáculos
        if (
          player.x < obstacles[i].x + obstacles[i].width &&
          player.x + player.width > obstacles[i].x &&
          player.y < obstacles[i].y + obstacles[i].height &&
          player.y + player.height > obstacles[i].y
        ) {
          alert("Game Over. Puntuación: " + score);
          resetGame();
        }

        // Eliminar obstáculos fuera de la pantalla
        if (obstacles[i].x + obstacles[i].width < 0) {
          obstacles.splice(i, 1);
          score++;
          i--;
        }
      }

      // Actualizar puntuación
      ctx.fillStyle = "#000";
      ctx.font = "20px Arial";
      ctx.fillText("Puntuación: " + score, 10, 30);

      // Repetir el bucle del juego
      requestAnimationFrame(gameLoop);
    }

    // Función para generar obstáculos
    function generateObstacle() {
      const obstacle = {
        x: canvas.width,
        y: canvas.height - 30,
        width: 30,
        height: 30
      };
      obstacles.push(obstacle);
    }

    // Función para reiniciar el juego
    function resetGame() {
      player.x = 50;
      player.y = canvas.height - 30;
      obstacles.length = 0;
      score = 0;
    }

    // Escuchar eventos de teclado
    window.addEventListener('keydown', function (e) {
        if (e.keyCode === 13 && !player.jumping) {
          player.jumping = true;
        }
      });

    // Iniciar el bucle del juego
    gameLoop();
