# 心映好事 SINGINGS HOUSE — 設計服務作品集

## 目錄結構
```
index.html        首頁
brand.html        品牌案例詳頁（讀取 ?id= 參數）
css/style.css     樣式
js/data.js        ★ 所有文字內容都在這裡，改文字只動這一檔
js/main.js        渲染邏輯（通常不用動）
images/           所有圖片（目前為灰色佔位圖，直接覆蓋同檔名即可）
```

## 換圖方式
把新圖用「完全相同的檔名」覆蓋 images/ 裡的檔案即可，不用改任何程式。

| 檔名 | 尺寸 | 比例 |
|---|---|---|
| `品牌代號_card.webp` | 1600×1200 | 4:3 |
| `品牌代號_hero.webp` | 2880×1200 | 21:9 |
| `品牌代號_p1_01.webp`… | 2000×1500 | 4:3 |
| `og_image.jpg` | 1200×630 | —（社群預覽維持 jpg）|

品牌代號：singings / megabank / lp / ikea / sf / pimq

**圖片一律輸出 WebP**，品質 80–85，每張控制在 200KB 以內。
- Photoshop：檔案 → 轉存 → 轉存為 → 格式選 WebP
- Illustrator／Figma：轉存 PNG 後用 squoosh.app 轉 WebP
- 若手邊工具不支援，輸出 jpg 也能用，但要記得同步修改 `js/data.js` 裡的副檔名。

## 改文字
打開 `js/data.js`，所有文案、時間軸年份、專案說明都在裡面，改完存檔即可。
新增專案圖片：在該專案的 `images: []` 陣列裡多加一行檔名。
新增品牌：複製一整個 { } 區塊，改 id 與內容。

## 部署到 GitHub Pages
1. GitHub 建立新 repo（例如 `portfolio`）
2. 把本資料夾內所有檔案上傳到 repo 根目錄
3. repo → Settings → Pages → Source 選 `Deploy from a branch` → `main` / `root` → Save
4. 約一分鐘後網址為 `https://<帳號>.github.io/<repo名>/`

所有路徑皆為相對路徑（./），可直接部署於子路徑。
