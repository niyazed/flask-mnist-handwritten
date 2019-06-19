(function() {
  var canvas = document.querySelector("#canvas");
  var context = canvas.getContext("2d");
  canvas.width = 280;
  canvas.height = 280;
  var Mouse = { x: 0, y: 0 };
  var lastMouse = { x: 0, y: 0 };
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.color = "white";
  context.lineWidth = 5;
  context.lineJoin = context.lineCap = "round";

clearCanvas();

canvas.addEventListener( "mousemove",
  function(e) { 
    lastMouse.x = Mouse.x;
    lastMouse.y = Mouse.y;
    Mouse.x = e.pageX - this.offsetLeft;
    Mouse.y = e.pageY - this.offsetTop;
}, false);

canvas.addEventListener("mousedown",
  function(e) {
    canvas.addEventListener("mousemove", onDraw, false);
}, false);

canvas.addEventListener("mouseup",
  function() {
    canvas.removeEventListener("mousemove", onDraw, false);
}, false);

/* Canvas Draw */
var onDraw = function() {
  context.lineWidth = context.lineWidth;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.strokeStyle = context.color;
  context.beginPath();
  context.moveTo(lastMouse.x, lastMouse.y);
  context.lineTo(Mouse.x, Mouse.y);
  context.closePath();
  context.stroke();
};

/* This function clears the box */
function clearCanvas() {
  var clearButton = $("#clearButton");
  clearButton.on("click", function() {
    context.clearRect(0, 0, 280, 280);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
});



$("#lineWidth").change(function() {
  context.lineWidth = $(this).val();
});

}})();


// since it takes the flask app about 20 seconds to start up again
var http = require("http");
setInterval(function() {
    http.get("https://mnist-hd.herokuapp.com/");
}, 300000); // every 5 minutes (300000)
