const cityImages = {
  臺北市: "rigion-city/臺北市.jpg",
  新北市: "rigion-city/新北市.jpg",
  桃園市: "rigion-city/桃園.jpg",
  新竹市: "rigion-city/新竹市.jpg",
  宜蘭縣: "rigion-city/宜蘭.jpg",
  苗栗縣: "rigion-city/苗栗.jpg",
  新竹縣: "rigion-city/新竹.jpg",
  基隆市: "rigion-city/基隆.jpg",
  臺中市: "rigion-city/臺中.jpg",
  彰化縣: "rigion-city/彰化.jpg",
  南投縣: "rigion-city/南投.jpg",
  雲林縣: "rigion-city/雲林.jpg",
  嘉義市: "rigion-city/嘉義市.jpg",
  嘉義縣: "rigion-city/嘉義縣.jpg",
  臺南市: "rigion-city/台南.jpg",
  高雄市: "rigion-city/高雄.jpg",
  屏東縣: "rigion-city/屏東.jpg",
  花蓮縣: "rigion-city/花蓮.jpg",
  臺東縣: "rigion-city/臺東.jpg",
  澎湖縣: "rigion-city/澎湖.jpg",
  金門縣: "rigion-city/金門.jpg",
  "連江縣(馬祖)": "rigion-city/連江.jpg",
};

if (window.opener) {
  const inputValue = window.opener.document.getElementById("userInput").value;

  const imageSrc = cityImages[inputValue];
  const cityImage = document.createElement("img");
  cityImage.src = imageSrc;
  cityImage.style.width = "100%";
  cityImage.style.height = "500px";
  cityImage.style.marginBottom = "20px";
  document.getElementById("content").appendChild(cityImage);
  document.getElementById("city-text").innerText = `${inputValue}`;
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const contentContainer = document.getElementById("content");
      // 遍歷所有地區的資料
      data.forEach((region) => {
        region.cities.forEach((city) => {
          // 匹配輸入的城市
          if (city.city === inputValue) {
            city.spots.forEach((spot) => {
              // 創建景點卡片
              let card = document.createElement("div");
              card.className = "card";
              card.innerHTML = `
                  <img src="${spot.images[0]}" alt="${spot.title}">
                  <div>
                      <h3>${spot.title}</h3>
                      <div class="hashtags-container">
                          ${spot.hashtags
                            .map(
                              (tag) => `<span class="hashtags">${tag}</span>`
                            )
                            .join("")}
                      </div>
                  </div>
              `;
              contentContainer.appendChild(card);

              // 點擊卡片時顯示詳細資訊
              card.addEventListener("click", () => {
                const urlParams = new URLSearchParams({
                  title: spot.title,
                  description: spot.contents.join(" "),
                  image: spot.images,
                });
                window.open(`city.html?${urlParams.toString()}`, "_blank");
              });
            });
          }
        });
      });
    });
}
