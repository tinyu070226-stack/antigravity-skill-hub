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

## 5. 10 大 16:9 簡報視覺 Specs 完整規範條款

當實作簡報的 `deck_theme.css` 時，必須 100% 依據以下規格套用樣式：

### SPEC #01：霓虹拼貼 / 構築主義 (neon-collage-architect)
- **觸發字**：`霓虹拼貼`, `neon collage`, `構築主義`
- **比例與字級**：`16:9` · `10:1 Font scaling`
- **基礎 CSS**：`background: #0D0E15; color: #00F0FF; border: 2px solid #FF0055; font-family: sans-serif;`
- **視覺規範**：3 色限量色盤、10:1 標題/副標字體跳躍率、技術圖紙與前衛拼貼感。
- **標準預覽標題**：`NEON ARCHITECTURE 2050`
- **標準預覽副標**：`Constructivism & Tech Diagram Layout`
- **徽章標記**：`SPEC #01` (強烈強調色: `#FF0055`)

### SPEC #02：Apple 裝置模型 (premium-apple-mockup-designer)
- **觸發字**：`premium mockup`, `apple mockup`, `裝置模型`
- **比例與字級**：`16:9` · `3D Device Framing`
- **基礎 CSS**：`background: #000000; color: #F5F5F7; border: 1px solid #333336; font-family: -apple-system, sans-serif;`
- **視覺規範**：Studio Display, iPhone, MacBook 3D 實物截圖與裝置裁切佈局展示。
- **標準預覽標題**：`Pro Display XDR Specs`
- **標準預覽副標**：`Extreme Dynamic Range & 6K Precision`
- **徽章標記**：`MOCKUP 3D` (強烈強調色: `#2997FF`)

### SPEC #03：石膏 Pop 撞色 / 蒸汽波 (sculpture-pop-remix)
- **觸發字**：`sculpture pop`, `remix pop`, `石膏撞色`
- **比例與字級**：`16:9` · `Vaporwave Pop`
- **基礎 CSS**：`background: linear-gradient(135deg, #FF71CE, #01CDFE); color: #FFFFFF; font-family: sans-serif; font-weight: 800;`
- **視覺規範**：古典石膏像結合高對比雙色調與蒸汽波 (Vaporwave) 霓虹美學。
- **標準預覽標題**：`SCULPTURE POP REMIX`
- **標準預覽副標**：`Classical Aesthetics meets Cyberpunk Contrast`
- **徽章標記**：`VAPOR POP` (強烈強調色: `#05FFA1`)

### SPEC #04：雜誌編輯風 / Kinfolk (modern-editorial-designer)
- **觸發字**：`editorial`, `雜誌風`, `kinfolk`
- **比例與字級**：`16:9` · `Ivory Paper 1.8x`
- **基礎 CSS**：`background: #F4F1EA; color: #2B2927; border: 1px solid #E2DED4; font-family: Georgia, serif;`
- **視覺規範**：暖白紙色背景 (`#F4F1EA`)、明朝體 (Serif)、大面積留白與空氣感。
- **標準預覽標題**：`Kinfolk & Quiet Luxury`
- **標準預覽副標**：`Minimalist Editorial Layout with High Air Quality`
- **徽章標記**：`EDITORIAL` (強烈強調色: `#8C8275`)

### SPEC #05：瑞士新經濟 / 包浩斯 (new-economy-editorial-director)
- **觸發字**：`swiss style`, `new economy`, `bauhaus`
- **比例與字級**：`16:9` · `STRICT NO MARKDOWN`
- **基礎 CSS**：`background: #F4F4F5; color: #18181B; border-top: 5px solid #FF3B30; font-family: Helvetica, sans-serif;`
- **視覺規範**：【特別警告：嚴格禁止 Markdown 符號】純文字非對稱構圖、10:1 瑞士國際字體排版主義巨型標題。
- **標準預覽標題**：`NEW ECONOMY 2050`
- **標準預覽副標**：`Swiss International Typographic Alignment`
- **徽章標記**：`NO MARKDOWN` (強烈強調色: `#FF3B30`)

### SPEC #06：暗黑便當簡報 (dark-mode-bento-architect)
- **觸發字**：`bento presentation`, `暗黑便當簡報`, `oled slide`
- **比例與字級**：`16:9` · `OLED Dark Grid`
- **基礎 CSS**：`background: #09090B; color: #FAFAFA; border: 1px solid #27272A; font-family: sans-serif;`
- **視覺規範**：深色便當盒佈局、高對比發光文字與模組化卡片分區，輔以微妙的發光邊框。
- **標準預覽標題**：`Linear Bento Slide Deck`
- **標準預覽副標**：`Modular Grid Cards with Subtle Glowing Borders`
- **徽章標記**：`BENTO OLED` (強烈強調色: `#38BDF8`)

### SPEC #07：賽博故障風 (cyberpunk-glitch-presenter)
- **觸發字**：`cyberpunk slide`, `賽博簡報`, `故障風簡報`
- **比例與字級**：`16:9` · `High Contrast Neon`
- **基礎 CSS**：`background: #05050A; color: #00F0FF; border: 1px solid #FF0055; font-family: monospace;`
- **視覺規範**：高對比青紫霓虹撞色、故障線條與前衛戰術科技感，使用等寬字體。
- **標準預覽標題**：`CYBERPUNK GLITCH PROTOCOL`
- **標準預覽副標**：`High Voltage Neon & Tactical Grid Lines`
- **徽章標記**：`GLITCH 2077` (強烈強調色: `#FF0055`)

### SPEC #08：毛玻璃極光風 (glassmorphism-aurora-slide)
- **觸發字**：`glass slide`, `極光簡報`, `毛玻璃簡報`
- **比例與字級**：`16:9` · `Blur 20px Specular`
- **基礎 CSS**：`background: linear-gradient(135deg, rgba(121,40,202,0.8), rgba(255,0,128,0.8)); color: #FFFFFF; backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.4);`
- **視覺規範**：彌散漸變流體極光背景、毛玻璃卡片與高光邊緣構圖，強調空間感與高光外發光。
- **標準預覽標題**：`Aurora Spatial Presentation`
- **標準預覽副標**：`Diffuse Fluid Gradient with Specular Rim Light`
- **徽章標記**：`AURORA GLASS` (強烈強調色: `#00DFD8`)

### SPEC #09：極簡文字風格 (minimalist-typographic-deck)
- **觸發字**：`typographic deck`, `文字簡報`, `極簡簡報`
- **比例與字級**：`16:9` · `Pure Typography`
- **基礎 CSS**：`background: #FFFFFF; color: #0F172A; border-bottom: 3px solid #0F172A; font-family: sans-serif; font-weight: 900;`
- **視覺規範**：無任何多餘圖片裝飾、100% 依賴字體粗細與大小的理性視覺落差，排版追求絕對精密。
- **標準預覽標題**：`PURE TYPOGRAPHY SLIDE`
- **標準預覽副標**：`Zero Graphic Clutter · 100% Font Hierarchy Precision`
- **徽章標記**：`TYPO 100%` (強烈強調色: `#0F172A`)

### SPEC #10：Slidev Exporter (slidev-markdown-exporter)
- **觸發字**：`slidev export`, `slidev markdown`, `slides.md`
- **比例與字級**：`16:9` · `Slidev AST Engine`
- **基礎 CSS**：`background: #1E1E1E; color: #4EC9B0; border: 1px solid #333; font-family: monospace;`
- **視覺規範**：轉譯為標準 Slidev Markdown (slides.md) 規格，支援 v-clicks 點擊與 Mermaid 流程圖語法。
- **標準預覽標題**：`slides.md AST Exporter`
- **標準預覽副標**：`Native Slidev Syntax & Mermaid Diagrams`
- **徽章標記**：`SLIDEV AST` (強烈強調色: `#CE9178`)

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
