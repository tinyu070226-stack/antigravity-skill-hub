---
name: presentation-skill
description: 本技能定義 10 大客製化 16:9 簡報視覺風格 Specs、強行兩階段簡報計畫書對齊 (2-Stage Deck Plan Gate)、Slidev/Felo 導出器，以及 beautiful-article 文章排版引擎。
---

# presentation-skill (簡報視覺與 Slidev 導出全集)

## 觸發字 (Triggers)
@presentation-skill, felo, slidev, 簡報風格, 簡報導出, slides.md, beautiful-article, reacticle, tufte, vignelli, bodoni, 網頁文章, 刊物排版

## 子模組核心描述
- 兩階段簡報規劃門禁 (2-Stage Deck Plan Gate): 嚴禁直接做簡報！必須先產出 presentation_plan.md (含頁數、大標小標、內文大意、視覺選型、紅線自查)，經確認後才輸出簡報。
- Print CSS 完美列印規範 (Ctrl+P另存PDF): 強制 @page { size: 16in 9in; margin: 0; } 鎖死16:9消白邊、容器改成 display: block 防 Flexbox 跨頁穿插、清除 UI 浮動按鈕與 shadow 雜訊。
- 10 大 16:9 簡報視覺 Specs 完整條款: 霓虹拼貼 (Neon 10:1), Apple 3D Mockup, 石膏 Pop 撞色, Kinfolk 雜誌風, 瑞士新經濟 (嚴禁 Markdown 符號), 沉靜黑夜 Living Artifact, 溫柔扁平插畫, Slidev 導出器等。
- 簡報 6 大紅線原則: (1) 100% 完整呈現原文 (2) 不改變圖片比例 (3) 嚴禁文字圖片重疊貼邊 (4) 圖片直觀對應 (5) 圖片符合風格 (6) 每頁皆須圖文並茂且排版多樣不重複。


## 10 大 16:9 簡報視覺 Specs 完整規格條款
### SPEC #01：neon-collage-architect
- **名稱 (Name)**: `neon-collage-architect`
- **觸發字 (Triggers)**: `霓虹拼貼, neon collage, 構築主義`
- **比例尺寸 (Ratio)**: `16:9 · 10:1 Font scaling`
- **樣式 (CSS)**: `background: #0D0E15; color: #00F0FF; border: 2px solid #FF0055; font-family: sans-serif;`
- **標準預覽標題**: `NEON ARCHITECTURE 2050`
- **標準預覽副標**: `Constructivism & Tech Diagram Layout`
- **徽章 (Badge)**: `SPEC #01`
- **強調色 (Accent)**: `#FF0055`
- **詳細描述**: 3 色限量色盤、10:1 標題/副標字體跳躍率、技術圖紙與前衛拼貼感。

### SPEC #02：premium-apple-mockup-designer
- **名稱 (Name)**: `premium-apple-mockup-designer`
- **觸發字 (Triggers)**: `premium mockup, apple mockup, 裝置模型`
- **比例尺寸 (Ratio)**: `16:9 · 3D Device Framing`
- **樣式 (CSS)**: `background: #000000; color: #F5F5F7; border: 1px solid #333336; font-family: -apple-system, sans-serif;`
- **標準預覽標題**: `Pro Display XDR Specs`
- **標準預覽副標**: `Extreme Dynamic Range & 6K Precision`
- **徽章 (Badge)**: `MOCKUP 3D`
- **強調色 (Accent)**: `#2997FF`
- **詳細描述**: Studio Display, iPhone, MacBook 3D 裁切佈局展示。

### SPEC #03：sculpture-pop-remix
- **名稱 (Name)**: `sculpture-pop-remix`
- **觸發字 (Triggers)**: `sculpture pop, remix pop, 石膏撞色`
- **比例尺寸 (Ratio)**: `16:9 · Vaporwave Pop`
- **樣式 (CSS)**: `background: linear-gradient(135deg, #FF71CE, #01CDFE); color: #FFFFFF; font-family: sans-serif; font-weight: 800;`
- **標準預覽標題**: `SCULPTURE POP REMIX`
- **標準預覽副標**: `Classical Aesthetics meets Cyberpunk Contrast`
- **徽章 (Badge)**: `VAPOR POP`
- **強調色 (Accent)**: `#05FFA1`
- **詳細描述**: 古典石膏像結合高對比雙色調與蒸汽波美學。

### SPEC #04：modern-editorial-designer
- **名稱 (Name)**: `modern-editorial-designer`
- **觸發字 (Triggers)**: `editorial, 雜誌風, kinfolk`
- **比例尺寸 (Ratio)**: `16:9 · Ivory Paper 1.8x`
- **樣式 (CSS)**: `background: #F4F1EA; color: #2B2927; border: 1px solid #E2DED4; font-family: Georgia, serif;`
- **標準預覽標題**: `Kinfolk & Quiet Luxury`
- **標準預覽副標**: `Minimalist Editorial Layout with High Air Quality`
- **徽章 (Badge)**: `EDITORIAL`
- **強調色 (Accent)**: `#8C8275`
- **詳細描述**: 暖白紙色 (#f1f0ea)、明朝體 (Serif)、大面積留白與空氣感。

### SPEC #05：new-economy-editorial-director
- **名稱 (Name)**: `new-economy-editorial-director`
- **觸發字 (Triggers)**: `swiss style, new economy, bauhaus`
- **比例尺寸 (Ratio)**: `16:9 · STRICT NO MARKDOWN`
- **樣式 (CSS)**: `background: #F4F4F5; color: #18181B; border-top: 5px solid #FF3B30; font-family: Helvetica, sans-serif;`
- **標準預覽標題**: `NEW ECONOMY 2050`
- **標準預覽副標**: `Swiss International Typographic Alignment`
- **徽章 (Badge)**: `NO MARKDOWN`
- **強調色 (Accent)**: `#FF3B30`
- **詳細描述**: 【嚴格禁止 Markdown 符號】純文字非對稱構圖、10:1 巨型標題。

### SPEC #06：dark-mode-bento-architect
- **名稱 (Name)**: `dark-mode-bento-architect`
- **觸發字 (Triggers)**: `bento presentation, 暗黑便當簡報, oled slide`
- **比例尺寸 (Ratio)**: `16:9 · OLED Dark Grid`
- **樣式 (CSS)**: `background: #09090B; color: #FAFAFA; border: 1px solid #27272A; font-family: sans-serif;`
- **標準預覽標題**: `Linear Bento Slide Deck`
- **標準預覽副標**: `Modular Grid Cards with Subtle Glowing Borders`
- **徽章 (Badge)**: `BENTO OLED`
- **強調色 (Accent)**: `#38BDF8`
- **詳細描述**: 深色便當盒佈局、高對比發光文字與模組化卡片分區。

### SPEC #07：cyberpunk-glitch-presenter
- **名稱 (Name)**: `cyberpunk-glitch-presenter`
- **觸發字 (Triggers)**: `cyberpunk slide, 賽博簡報, 故障風簡報`
- **比例尺寸 (Ratio)**: `16:9 · High Contrast Neon`
- **樣式 (CSS)**: `background: #05050A; color: #00F0FF; border: 1px solid #FF0055; font-family: monospace;`
- **標準預覽標題**: `CYBERPUNK GLITCH PROTOCOL`
- **標準預覽副標**: `High Voltage Neon & Tactical Grid Lines`
- **徽章 (Badge)**: `GLITCH 2077`
- **強調色 (Accent)**: `#FF0055`
- **詳細描述**: 高對比青紫霓虹撞色、故障線條與前衛戰術科技感。

### SPEC #08：glassmorphism-aurora-slide
- **名稱 (Name)**: `glassmorphism-aurora-slide`
- **觸發字 (Triggers)**: `glass slide, 極光簡報, 毛玻璃簡報`
- **比例尺寸 (Ratio)**: `16:9 · Blur 20px Specular`
- **樣式 (CSS)**: `background: linear-gradient(135deg, rgba(121,40,202,0.8), rgba(255,0,128,0.8)); color: #FFFFFF; backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.4);`
- **標準預覽標題**: `Aurora Spatial Presentation`
- **標準預覽副標**: `Diffuse Fluid Gradient with Specular Rim Light`
- **徽章 (Badge)**: `AURORA GLASS`
- **強調色 (Accent)**: `#00DFD8`
- **詳細描述**: 彌散漸變極光背景、毛玻璃卡片與高光邊緣構圖。

### SPEC #09：minimalist-typographic-deck
- **名稱 (Name)**: `minimalist-typographic-deck`
- **觸發字 (Triggers)**: `typographic deck, 文字簡報, 極簡簡報`
- **比例尺寸 (Ratio)**: `16:9 · Pure Typography`
- **樣式 (CSS)**: `background: #FFFFFF; color: #0F172A; border-bottom: 3px solid #0F172A; font-family: sans-serif; font-weight: 900;`
- **標準預覽標題**: `PURE TYPOGRAPHY SLIDE`
- **標準預覽副標**: `Zero Graphic Clutter · 100% Font Hierarchy Precision`
- **徽章 (Badge)**: `TYPO 100%`
- **強調色 (Accent)**: `#0F172A`
- **詳細描述**: 無任何多餘圖片裝飾、100% 依賴字體層級與理性視覺落差。

### SPEC #10：slidev-markdown-exporter
- **名稱 (Name)**: `slidev-markdown-exporter`
- **觸發字 (Triggers)**: `slidev export, slidev markdown, slides.md`
- **比例尺寸 (Ratio)**: `16:9 · Slidev AST Engine`
- **樣式 (CSS)**: `background: #1E1E1E; color: #4EC9B0; border: 1px solid #333; font-family: monospace;`
- **標準預覽標題**: `slides.md AST Exporter`
- **標準預覽副標**: `Native Slidev Syntax & Mermaid Diagrams`
- **徽章 (Badge)**: `SLIDEV AST`
- **強調色 (Accent)**: `#CE9178`
- **詳細描述**: 轉譯完整 Slidev (slides.md)，含 v-clicks 動畫與 Mermaid 圖表。



## 核心設計與工程原則 (Principles)
### 原則 1：📝 簡報製作 Master Prompt 提示詞範例 (Standard Master Prompt)
我要在這個對話進行「(......簡報製作任務)」。請以("......檔案路徑")的內容為材料，採取並嚴格遵守("......簡報風格")的規則和風格，製作 16:9 /(或)A4 Slidev， HTML / (或)可編輯的 ppt 簡報。

請先不要直接執行簡報的製作，而是先寫出「簡報規劃的計畫書」，計畫書中要寫出：總共會有幾頁、每一頁的「大標題」內容、「小標題」內容、大致的內文要寫什麼、需不需要使用 ai 圖片生成，或是可以去網路上搜尋下載圖片。

【6個紅線 (嚴格遵守)】

1. 簡報請完整呈現「(某某檔案)」的完美內容。撰寫內容時請不要克制，頁數不用省、內文也可以寫多一點。並且不要有曲解、誇大其辭、用詞太過激昂的情況。
2. 圖片請不要調整原有的圖片比例，只允許對圖片進行「裁切」、「縮小」、「放大」。
3. 無論是大標題小標題或內文、圖片，請都不要與其他文字或圖片有重疊，也不要有貼到畫面過於邊緣的地方(但若圖片是打算沒有空白縫隙的貼緊邊緣，則沒有此限制)。
4. 保證網路搜尋或自行生成的圖片絕對都要與當前簡報頁面的內容直接高度相關，嚴禁使用抽象隱喻、幾何符號或高深意象圖，必須選用一眼就能直觀看懂、與簡報內文精準對應的具體實物或情境圖片。
5. 保證網路搜尋或生成的圖片絕對都要符合當前選擇的整體簡報風格，嚴禁出現與整體簡報風格相比顯得突兀或視覺風格斷層的圖片。
6. 簡報的每一頁都必須同時包含「圖片」與「文字」（圖文並茂），且每一頁的視覺佈局與結構必須變化多元，嚴禁連續多頁重複使用完全相同的範本或視覺排版結構。

### 原則 2：📰 beautiful-article 10 大文章保留率模型與 11 大排版主題
beautiful-article 是將原始素材（URL/PDF/DOCX/筆記）重構並排版為高品質單頁網頁文章的編輯引擎：
1. 10 大文章保留率模型：支援深度長文 (Longform 100%)、實作教學 (Tutorial 90%)、完整報告 (Report 80%)、摘要簡報 (Briefing 50%) 到視覺文章 (Visual Essay 40%)，可依閱讀目的嚴格精準控制資訊密度。
2. 11 大大師排版主題 (Theme Profiles)：涵蓋 Tufte (學術邊註風格)、Bodoni (經典時尚刊物)、Vignelli (網格系統)、Press (新聞編輯)、Knuth (數學排版) 等 11 種出版物等級的字體與版面氣質。
3. Reacticle 語意組件與 3:4 書籍封面：採用 Hero / Lead / Quote / Callout / Raw 語意層與 3:4 書本風格封面，搭配自動生成 TOC 目錄，打造離線亦可完美閱讀與分享的排版作品。


