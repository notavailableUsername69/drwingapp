document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const clearBtn = document.getElementById("clear-btn");
    const colorPicker = document.getElementById("color-picker");
    const brushSize = document.getElementById("brush-size");
  
    let isDrawing = false;
  
    // Set canvas size
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 100;
  
    // Event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
  
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchmove", draw);
  
    clearBtn.addEventListener("click", clearCanvas);
  
    function startDrawing(event) {
      isDrawing = true;
      draw(event);
    }
  
    function stopDrawing() {
      isDrawing = false;
      context.beginPath();
    }
  
    function draw(event) {
      if (!isDrawing) return;
  
      let x, y;
  
      if (event.type === "mousemove") {
        x = event.clientX - canvas.offsetLeft;
        y = event.clientY - canvas.offsetTop;
      } else if (event.type === "touchmove") {
        x = event.touches[0].clientX - canvas.offsetLeft;
        y = event.touches[0].clientY - canvas.offsetTop;
      }
  
      context.lineWidth = brushSize.value;
      context.lineCap = "round";
      context.strokeStyle = colorPicker.value;
  
      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    }
  
    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  });