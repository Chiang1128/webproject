const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const description = urlParams.get("description");
const image = urlParams.get("image");

document.getElementById("spot-title").innerText = title;
document.getElementById("spot-description").innerText = description;
document.getElementById("spot-image").src = image;
