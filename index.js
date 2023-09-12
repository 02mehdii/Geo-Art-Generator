const btn = document.getElementById("btn");
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 300;

const shapes = [
  "quad-circle-1",
  "quad-circle-2",
  "quad-circle-3",
  "quad-circle-4",
  "triangle-1",
  "triangle-2",
  "triangle-3",
  "triangle-4",
  "circle",
];
const colors = [
  "#01d2fd", "#ffc700", "#fe9f12", "#06d8c7", "#008000",
  "#DC143C", "#000000", "#C0C0C0", "#DA70D6", "#FF4500"
];
const boxes = document.querySelectorAll(".container div");
const downloadBtn = document.getElementById("downloadBtn");

function generatePattern() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boxes.forEach((box) => {
    box.className = "";
    let i = Math.floor(Math.random() * shapes.length);
    let j = Math.floor(Math.random() * colors.length);
    box.classList.add(shapes[i]);
    box.style.backgroundColor = colors[j];
  });
  // Log canvas and patterns for debugging
  console.log("Canvas width:", canvas.width);
  console.log("Canvas height:", canvas.height);
  console.log("Number of patterns drawn:", boxes.length);
}

function downloadImage() {
  // Draw the patterns on the canvas
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    
    // Create a right-click context menu event listener on the canvas
    canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // Prevent the default context menu
      
      // Create a download link
      const a = document.createElement("a");
      a.href = url;
      a.download = "geometric-art.png"; // Define the filename
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  });
}

btn.addEventListener("click", generatePattern);
window.addEventListener("load", generatePattern);

downloadBtn.addEventListener("click", downloadImage);
