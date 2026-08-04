---
name: presentation-skill
description: |
  簡報製作全套工作流：10 大 16:9 客製化視覺風格 Specs、強制兩段式計畫書 Gate、Slidev/HTML 導出協議、
  3 大 Master Prompt 場景（標準製作/同風格換內容/換風格換內容）、6 大製作紅線、beautiful-article 10 大文章體裁。
  觸發時機：任何簡報製作、簡報風格選擇、內容轉化為視覺頁面的需求。
---

# Presentation Skill（簡報視覺全套 & Slidev 導出工作流）

本 Skill 確保所有簡報產出符合**視覺一致性、內容完整性、跨格式可導出性**三大核心要求。

---

## 1. 兩段式計畫書強制 Gate（2-Stage Deck Plan Gate）

**嚴禁直接製作簡報！** 必須先通過以下兩段式確認：

### Stage 1：計畫書產出（`presentation_plan.md`）
在接收到任何簡報製作指令後，必須先產出包含以下內容的計畫書：
- **總頁數**
- **每一頁的大標題**（確定，不是草稿）
- **每一頁的小標題**
- **每一頁大致的內文方向**
- **圖片需求**（自行生成 / 網路搜尋 / 純文字）
- **選用的視覺風格**（從 10 大 Specs 中選一）

### Stage 2：等待使用者確認
計畫書產出後，**停下來**等使用者確認。使用者核可後才開始實際製作。

---

## 2. 3 大 Master Prompt 場景

根據任務類型選擇對應的 Master Prompt：

---

### 場景 A：標準製作（全新簡報）

```
我要在這個對話進行「(......簡報製作任務)」。
請以("(......檔案路徑)")的內容為材料，
採取並嚴格遵守("(......簡報風格)")的規則和風格，
製作 16:9 /(或)A4 Slidev，HTML /(或)可編輯的 ppt 簡報。
```

---

### 場景 B：同風格換內容（沿用現有風格）

```
我要在這個對話進行「(......簡報製作任務)」。
請以("(......檔案路徑)")的內容為材料，
依照我們標準的 0-Token 簡報流水線 Phase 1，幫我產出 deck_content.json。
請繼續使用「(現有風格，如 Kinfolk)」風格，
並幫我安排好 Hero、Split、Quote Card、Timeline、Bento 這 5 種 Layout 屬性。
產出後請直接執行 build_deck.py 生成簡報！
```

---

### 場景 C：換風格換內容（全新風格 + 全新內容）

```
我要在這個對話進行「(......簡報製作任務)」。
請以("(......檔案路徑)")的內容為材料製作成 16:9 HTML 簡報。
這次視覺風格請採用「(新風格，如 Typographic Deck)」規範！
請先產出 deck_content.json 與對應的 deck_theme.css，
然後跑 Phase 3 的 build_deck.py 自動裝配成 HTML 簡報！
```

---

### 所有場景通用 — 6 大製作紅線（必須在每個 Prompt 後附加）

```
【6 個紅線（嚴格遵守）】

1. 簡報請完整呈現內容。撰寫內容時請不要克制，頁數不用省、內文也可以寫多一點。
   並且不要有曲解、誇大其辭、用詞太過激昂的情況。

2. 圖片請不要調整原有的圖片比例，只允許對圖片進行「裁切」、「縮小」、「放大」。

3. 無論是大標題小標題或內文、圖片，請都不要與其他文字或圖片有重疊，
   也不要有貼到畫面過於邊緣的地方（但若圖片是打算沒有空白縫隙地貼緊邊緣，則沒有此限制）。

4. 保證網路搜尋或自行生成的圖片絕對都要與當前簡報頁面的內容直接高度相關，
   嚴禁使用抽象隱喻、幾何符號或高深意象圖，必須選用一眼就能直觀看懂、
   與簡報內文精準對應的具體實物或情境圖片。

5. 保證網路搜尋或生成的圖片絕對都要符合當前選擇的整體簡報風格，
   嚴禁出現與整體簡報風格相比顯得突兀或視覺風格斷層的圖片。

6. 簡報的每一頁都必須同時包含「圖片」與「文字」（圖文並茂），
   且每一頁的視覺佈局與結構必須變化多元，
   嚴禁連續多頁重複使用完全相同的範本或視覺排版結構。
```

---

## 3. 0-Token 簡報流水線（Multi-Agent Assembly Pipeline）

適用於大型簡報批量製作，透過角色分工將 Token 消耗降至最低：

| 階段 | 負責 Agent | 產出物 | Token 消耗 |
|---|---|---|---|
| Phase 1：內容結構解耦 | 主力 Agent（Gemini Pro） | `deck_content.json` | 低 |
| Phase 2：視覺 Theme | Claude Subagent | `deck_theme.css` | 極低（現成 Spec 時 0 次呼叫）|
| Phase 3：自動裝配 | `build_deck.py`（0 Token） | `output.html` | **0 Token** |
| Phase 4：CLI 導出 | OpenCode Terminal | PDF / Screenshot | 0 Token |

### `deck_content.json` 格式規範
```json
{
  "slides": [
    {
      "page": 1,
      "layout": "hero",
      "title": "...",
      "subtitle": "...",
      "bullets": ["...", "..."],
      "image_desc": "..."
    }
  ]
}
```
- `layout` 支援：`"hero"` / `"split"` / `"quote_card"` / `"timeline"` / `"bento"` / `"custom_dom"`
- 僅當明確標記 `"layout": "custom_dom"` 時，才觸發特殊 DOM 裝配

---

## 4. Print CSS 16:9 完整輸出規範（Ctrl+P → PDF）

任何 HTML 簡報必須包含以下 Print CSS，確保零白邊、精確 16:9：

```css
@media print {
  @page {
    size: 16in 9in;
    margin: 0;
  }
  body { margin: 0; padding: 0; }
  .slide {
    width: 16in;
    height: 9in;
    page-break-after: always;
    overflow: hidden;
  }
}
```

---

## 5. 10 大 16:9 簡報視覺 Specs 快查

| 編號 | 風格名稱 | 特色 |
|---|---|---|
| 1 | 霓虹貼片（Neon 10:1） | 螢光色高對比，暗色底，賽博龐克感 |
| 2 | Apple 3D Mockup | 設備展示框、光感陰影、純淨白底 |
| 3 | 野獸 Pop 配色 | 飽和撞色、粗體、大膽幾何 |
| 4 | Kinfolk 雜誌 | 米白底、細線分隔、攝影圖主導 |
| 5 | 彩虹漸層貼片 | 多色漸層卡片、毛玻璃效果 |
| 6 | 字型排版宣言 | 字型即設計、超大標題、報紙風 |
| 7 | 極光玻璃 | Aurora 背景漸層、Glass 卡片 |
| 8 | 復古印刷 | 舊報紙質感、棕色調、紙質紋理 |
| 9 | 技術藍圖 | 深藍底、青色線稿、座標網格 |
| 10 | 企業精緻版 | 深海軍藍 + 金色、Sans-serif 精準 |

---

## 6. beautiful-article 10 大文章體裁（文章轉視覺）

將文章/素材轉化為高品質網頁視覺編輯版：

| 體裁 | 適用場景 | 資訊密度 |
|---|---|---|
| Longform 深度長文 | 研究報告、完整分析 | 100% |
| Tutorial 實作教學 | 操作指南、How-to | 90% |
| Report 報告簡報 | 年度報告、調查結果 | 80% |
| Briefing 要點簡報 | 會前摘要、決策支援 | 50% |
| Visual Essay 視覺文章 | 品牌故事、創意表達 | 40% |

---

## 7. 禁止事項（Anti-patterns）

- 禁止跳過計畫書 Gate 直接製作簡報
- 禁止連續多頁使用相同版面排版結構（違反紅線 #6）
- 禁止圖片與文字重疊（違反紅線 #3）
- 禁止使用抽象意象圖配具體主題（違反紅線 #4）
- 禁止在 `deck_content.json` 的 layout 欄位使用未定義的值
- 禁止在 Print CSS 中設定任何非零 margin
