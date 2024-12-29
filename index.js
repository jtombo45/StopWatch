$(document).ready(function () {
  // Controller
  let isPlay = false;
  // SVG
  var svgPlayElement = $(
    '<svg id="fi_727245" width="15px" height="15px" fill="white" enable-background="new 0 0 320.001 320.001" viewBox="0 0 320.001 320.001" xmlns="http://www.w3.org/2000/svg"><path d="m295.84 146.049-256-144c-4.96-2.784-11.008-2.72-15.904.128-4.928 2.88-7.936 8.128-7.936 13.824v288c0 5.696 3.008 10.944 7.936 13.824 2.496 1.44 5.28 2.176 8.064 2.176 2.688 0 5.408-.672 7.84-2.048l256-144c5.024-2.848 8.16-8.16 8.16-13.952s-3.136-11.104-8.16-13.952z"></path><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
  );
  var svgPauseElement = $(
    '<svg id="fi_727245" width="15px" height="15px" fill="white" viewBox="-45 0 327 327"  xmlns="http://www.w3.org/2000/svg" id="fi_1214679"><path d="m158 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0"></path><path d="m8 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0"></path></svg>'
  );
  //Set button svg
  $("#ctrl-bttn").append(svgPlayElement);
  // Canvas setup
  const canvas = document.getElementById("circleCanvas");
  const ctx = canvas.getContext("2d");

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
      return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}.${Math.floor(remainingMs / 10)
        .toString()
        .padStart(2, "0")}`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Show `hh:mm:ss`
    return `${hours}:${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  // Function to draw the circle, dot, and timer
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // Circle's path
    ctx.strokeStyle = "#3A3F50";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Calculate dot position
    const dotX = centerX + radius * Math.cos(angle);
    const dotY = centerY + radius * Math.sin(angle);

    // Draw the dot
    ctx.beginPath();
    ctx.arc(dotX, dotY, 5, 0, Math.PI * 2); // Small dot
    ctx.fillStyle = "#B1C4FE";
    ctx.fill();

    // Draw the timer at the center
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
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

  // Event listeners for Reset
  $("#reset-bttn").on("click", function () {
    stopAnimation(); // Stop any ongoing animation or timer
    timerValue = 0; // Reset the timer value to 0
    angle = 0; // Reset the angle to its initial position
    draw(); // Redraw the canvas with the reset values

    // Reset the Play/Pause button to the "Play" state
    isPlay = false;
    $("#ctrl-bttn").empty();
    $("#ctrl-bttn").append(svgPlayElement);
  });

  // Event listeners for Play and Pause buttons
  $("#ctrl-bttn").on("click", function () {
    if (isPlay) {
      stopAnimation();
      $("#ctrl-bttn").empty();
      $("#ctrl-bttn").append(svgPlayElement);
    } else {
      startAnimation();
      $("#ctrl-bttn").empty();
      $("#ctrl-bttn").append(svgPauseElement);
    }
    isPlay = !isPlay;
  });

  /*$('#pause').on('click', stopAnimation);*/
});
