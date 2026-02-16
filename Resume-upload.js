document.addEventListener("DOMContentLoaded", () => {

  const fileInput = document.getElementById("fileInput");
  const browseBtn = document.getElementById("browseBtn");
  const uploadBtn = document.getElementById("uploadBtn");
  const dropZone = document.getElementById("dropZone");
  const fileName = document.getElementById("fileName");
  const status = document.getElementById("status");

  const progressSection = document.getElementById("progressSection");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  /* Fade in */
  setTimeout(() => {
    document.querySelector(".fade-in").classList.add("active");
  }, 200);

  /* Browse */
  browseBtn.addEventListener("click", () => {
    fileInput.click();
  });

  /* Drag highlight */
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#22D3EE";
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "rgba(255,255,255,0.3)";
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    validateFile();
  });

  fileInput.addEventListener("change", validateFile);

  function validateFile() {
    const file = fileInput.files[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!validTypes.includes(file.type)) {
      fileName.textContent = "";
      status.textContent = "Invalid file type. Upload PDF or DOCX.";
      status.style.color = "red";
      return;
    }

    fileName.textContent = "Selected: " + file.name;
    status.textContent = "";
  }

  /* Upload Animation */
  uploadBtn.addEventListener("click", () => {

    if (!fileInput.files.length) {
      status.textContent = "Please select a file first.";
      status.style.color = "red";
      return;
    }

    progressSection.classList.remove("hidden");
    status.textContent = "Uploading...";
    status.style.color = "#22D3EE";

    let progress = 0;

    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        status.textContent = "Upload Successful!";
        status.style.color = "lightgreen";

        setTimeout(() => {
          window.location.href = "resume-score.html";
        }, 1000);

      } else {
        progress++;
        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";
      }
    }, 20);

  });

});
