let currentIndex = 0; 

function showSlide(index) {
  const track = document.querySelector(".carousel-track");
  const totalSlides = document.querySelectorAll(".carousel-item").length;

  // 確保索引在範圍內循環
  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // 計算並移動輪播軌道
  const offset = -currentIndex * 100; // 每個項目寬度為 100%
  track.style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

showSlide(currentIndex);
function playpause() {
  const vdo = document.getElementById("video-bg");
  if (vdo.paused) {
    vdo.play();
  } else {
    vdo.pause();
  }
}
function addWindow() {
  const currentUrl = window.location.href;
  myWindow = window.open(`${currentUrl}region.html`, "_blank");
}
let PlanButton = document.getElementById("plan");
PlanButton.addEventListener("click", addWindow, false);
