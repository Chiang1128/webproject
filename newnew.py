import requests
from bs4 import BeautifulSoup
import json
import os

# 確保 taiwan_regions 資料夾存在
os.makedirs("taiwan_regions", exist_ok=True)

# 存儲所有地區的數據
all_region_data = []

# 進入台灣旅遊網站的首頁
response = requests.get("https://www.taiwan.net.tw/")
soup = BeautifulSoup(response.text, "html.parser")

# 取得每個區域（例如北部地區、中部地區...）
viewpoints = soup.find_all("a", class_="megamenu-btn")
for viewpoint in viewpoints:
    region = viewpoint.getText().strip()
    url = viewpoint.get("href")
    url_response = requests.get("https://www.taiwan.net.tw/" + url)
    url_soup = BeautifulSoup(url_response.text, "html.parser")

    # 這個地區的區域資料
    region_data = {"region": region, "cities": []}

    # 進入每個區域的詳細景點（例如：台北市、基隆市...）
    de_viewpoints = url_soup.find_all("a", class_="circularbtn")
    for de_viewpoint in de_viewpoints:
        city_name = (
            de_viewpoint.find("span", class_="circularbtn-title").getText().strip()
        )

        print(f"正在處理：{region} - {city_name}")

        de_url = de_viewpoint.get("href")
        de_url_response = requests.get("https://www.taiwan.net.tw/" + de_url)
        de_url_soup = BeautifulSoup(de_url_response.text, "html.parser")

        # 城市數據
        city_data = {"city": city_name, "spots": []}

        # 找到每個景點的詳細信息
        cards = de_url_soup.find_all("div", class_="card")
        for card in cards:
            # 景點標題
            title_tag = card.find("div", class_="card-title")
            title = title_tag.get_text(strip=True) if title_tag else "未知景點"
            print("title:", title)

            # 圖片提取
            graphic_div = card.find("div", class_="graphic")
            img_tag = graphic_div.find("img") if graphic_div else None
            images = []
            if img_tag:
                img_url = img_tag.get("data-src") or img_tag.get("src")
                if img_url:
                    images.append(img_url.strip())

            # 景點的 hashtags
            hashtag_div = card.find("div", class_="hashtag")
            hashtags_data = []
            if hashtag_div:
                hashtag_links = hashtag_div.find_all("a")
                hashtags_data = [link.get_text(strip=True) for link in hashtag_links]

            link_tag = card.find("a")
            de_second_url = link_tag.get("href")
            de_second_response = requests.get(
                "https://www.taiwan.net.tw/" + de_second_url
            )
            de_second_soup = BeautifulSoup(de_second_response.text, "html.parser")

            content_texts = []
            wrap_div = de_second_soup.find("div", class_="content")
            wrap_div = wrap_div.find("div", class_="wrap")

            if wrap_div:
                paragraphs = wrap_div.find_all("p")
                print("paragraphs", paragraphs)
                content_texts = [p.get_text(strip=True) for p in paragraphs]

            # 整理每個景點的數據
            spot_data = {
                "title": title,
                "images": images,
                "hashtags": hashtags_data,
                "contents": content_texts,
            }
            city_data["spots"].append(spot_data)

        # 將城市數據添加到地區
        region_data["cities"].append(city_data)

    all_region_data.append(region_data)
    print(f"✅ {region} 的數據已成功處理")

# 將所有地區的數據存儲為統一的 JSON 文件
all_region_filename = "taiwan_regions/taiwan_all_regions.json"
with open(all_region_filename, "w", encoding="utf-8") as f:
    json.dump(all_region_data, f, ensure_ascii=False, indent=4)

print(f"🎉 所有地區的數據已儲存在 {all_region_filename}")
