$(document).ready(function () {
      // Controller
      let isPlay = false;
      // Canvas setup
      const canvas = document.getElementById('circleCanvas');
      const ctx = canvas.getContext('2d');

      // Set canvas size
      canvas.width = 300;
      canvas.height = 300;

      // Circle properties
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 100; // Radius of the circle
      let angle = 0; // Initial angle in radians
      let timerValue = 0; // Timer value in milliseconds

      // Animation control variables
      let animationId = null; // For requestAnimationFrame
      let timerInterval = null; // For setInterval

      // Format the timer value into hh:mm:ss or ms
      function formatTime(ms) {
        if (ms < 1000) {
          // Less than a second: show milliseconds as `0.##`
          return (ms / 1000).toFixed(2);
        }

        const seconds = Math.floor(ms / 1000);
        const remainingMs = ms % 1000;

        if (seconds < 60) {
          // Less than a minute: show `ss.mm`
          return `${seconds}.${(remainingMs / 1000).toFixed(2).substring(2)}`;
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes < 60) {
          // Less than an hour: show `mm.ss.mm`
          return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${Math.floor(remainingMs / 10).toString().padStart(2, '0')}`;
        }

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        // Show `hh:mm:ss`
        return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      }

      // Function to draw the circle, dot, and timer
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw the circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // Circle's path
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Calculate dot position
        const dotX = centerX + radius * Math.cos(angle);
        const dotY = centerY + radius * Math.sin(angle);

        // Draw the dot
        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, Math.PI * 2); // Small dot
        ctx.fillStyle = 'red';
        ctx.fill();

        // Draw the timer at the center
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(formatTime(timerValue), centerX, centerY);
      }

      // Function to start the animation and timer
      function startAnimation() {
        if (!animationId) {
          animationId = requestAnimationFrame(animate); // Start the animation
        }
        if (!timerInterval) {
          timerInterval = setInterval(() => {
            timerValue += 10; // Increment by 10ms
            draw(); // Update the canvas
          }, 10);
        }
      }

      // Function to stop the animation and timer
      function stopAnimation() {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }

      // Animation loop
      function animate() {
        angle += 0.01; // Rotate the dot
        if (angle > Math.PI * 2) angle -= Math.PI * 2; // Reset the angle after a full rotation
        animationId = requestAnimationFrame(animate); // Request the next frame
      }

      // Initial draw to display the circle and static timer
      draw();

      // Event listeners for Play and Pause buttons
      $('#play').on('click', function(){
        if(isPlay){
          stopAnimation();
          $(this).text('play');
        }
        else{
          startAnimation();
          $(this).text('pause');
        }
        isPlay = !isPlay;
        
      });
       
      /*$('#pause').on('click', stopAnimation);*/
    });
