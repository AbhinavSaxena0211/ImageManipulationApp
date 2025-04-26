let fgImage = null;
let bgImage = null;

function getFgImage() {
  const inputFile = document.getElementById("fgimage");
  const fileNameDisplay = document.getElementById("fgimage-text");
  const canvas = document.getElementById("c1");

  if (inputFile.files.length > 0) {
    fileNameDisplay.textContent = inputFile.files[0].name;
    fgImage = new SimpleImage(inputFile);
    fgImage.drawTo(canvas);
  } else {
    fileNameDisplay.textContent = "No file chosen";
  }
}

function getBgImage() {
  const inputFile = document.getElementById("bgimage");
  const fileNameDisplay = document.getElementById("bgimage-text");
  const canvas = document.getElementById("c2");

  if (inputFile.files.length > 0) {
    fileNameDisplay.textContent = inputFile.files[0].name;
    bgImage = new SimpleImage(inputFile);
    bgImage.drawTo(canvas);
  } else {
    fileNameDisplay.textContent = "No file chosen";
  }
}

function mergeImages() {
  const canvas1 = document.getElementById("c1");
  const canvas2 = document.getElementById("c2");
  const ctx1 = canvas1.getContext("2d");

  if (!fgImage || !bgImage) {
    alert("Both images must be loaded before merging.");
    return;
  }

  const output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());

  for (let pixel of fgImage.values()) {
    if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
      const x = pixel.getX();
      const y = pixel.getY();
      const newPixel = bgImage.getPixel(x, y);
      output.setPixel(x, y, newPixel);
    } else {
      output.setPixel(pixel.getX(), pixel.getY(), pixel);
    }
  }

  // Draw the merged image in the first canvas
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  output.drawTo(canvas1);

  // Hide the second canvas and adjust layout
  canvas2.classList.add("hidden");

  // Show the "Try Again" and "Save" buttons
  document.getElementById("try-again-btn").style.display = "inline-block";
  const saveBtn = document.getElementById("save-image-btn");
  saveBtn.style.display = "inline-block";
}

function resetApp() {
  const canvas1 = document.getElementById("c1");
  const canvas2 = document.getElementById("c2");
  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  const fgInput = document.getElementById("fgimage");
  const bgInput = document.getElementById("bgimage");
  const fgText = document.getElementById("fgimage-text");
  const bgText = document.getElementById("bgimage-text");

  // Reset inputs
  fgInput.value = null;
  bgInput.value = null;
  fgText.textContent = "No file chosen";
  bgText.textContent = "No file chosen";

  // Clear canvases
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  // Reset canvas visibility and layout
  canvas2.classList.remove("hidden");

  // Hide the "Try Again" and "Save" buttons
  document.getElementById("try-again-btn").style.display = "none";
  const saveBtn = document.getElementById("save-image-btn");
  saveBtn.style.display = "none";

  // Reset images
  fgImage = null;
  bgImage = null;
}

function saveImage() {
  const canvas = document.getElementById("c1"); // Use canvas1 where the merged image is drawn
  const link = document.createElement("a");
  link.download = "merged-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
