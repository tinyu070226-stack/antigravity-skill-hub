---
name: frontend-design-styles
description: Complete reference and execution guide for 50 distinct front-end UI/UX design styles (from rxw2023/Front-end-Design-Styles) plus 20 Nutlope Hallmark aesthetic themes and 25 anchored brand recipes. Provides color palettes, typography rules, layout parameters, borders, shadows, and code patterns.
triggers:
  - frontend-design-styles
  - 50-web-styles
  - design styles
  - 前端設計風格
  - ui style
  - hallmark
  - design-system-skill
---

# 🎨 Front-End Design Styles (50 Web Design Styles System + 20 Hallmark Themes)

Use this skill when building web interfaces, landing pages, or components that require strong aesthetic character, consistent design tokens, and distinctive visual styles without generic AI design patterns.

---

## 📐 Core Protocol & Selection Guide

1. **Determine Style**: Identify the requested style from the prompt (or pick the best fit from the 50 styles & 25 anchored recipes below).
2. **Apply 5-Dial Design Read Calibration**:
   - `visual-variance` (1-10): Minimalist structural alignment vs high-variance decorative layout.
   - `motion-intensity` (1-10): Static micro-feedback vs rich timeline physics.
   - `information-density` (1-10): Spacious editorial whitespace vs dense data workstation.
   - `asset-dependence` (1-10): Pure CSS typography vs real product image dependency.
   - `brand-fidelity` (1-10): Greenfield exploratory system vs strict brand guideline preservation.
3. **Enforce Brand Asset Protocol (Asset > Spec)**:
   - Real logo and official product imagery are non-negotiable. Never substitute real brand assets with generic CSS silhouettes or fake AI blue/purple gradients.
4. **Apply Design Tokens**: Use the exact color variables, typography hierarchy, border styles, and shadow tokens specified for that style.
5. **Enforce Structural Constraints**: Maintain strict layout parameters (e.g. 0px border-radius for Swiss/Neo-Brutalism, 22px for VisionOS, 60%+ whitespace for Exaggerated Minimalism).
6. **Implement Interactive Micro-feedbacks**: Apply transition curves and transform offsets matched to the visual aesthetic.

---

## 🏛️ Comprehensive 50 Styles Reference (Unabridged Full Details)

### 1. Neo-Brutalism (新蠻荒主義)
- **觸發關鍵詞 (Triggers)**: `neubrutalism, 新蠻荒, raw brutal`
- **色票 Token (Hex)**: `#FFE600, #FF5959, #000000`
- **設計特徵與說明**: 高飽和撞色、重黑粗線條邊框與硬塊陰影 (box-shadow: 4px 4px #000)。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #FFE600; border: 3px solid #000; box-shadow: 4px 4px 0px #000; font-weight: 800; color: #000;
  ```

### 2. Swiss Grid (瑞士網格國際風格)
- **觸發關鍵詞 (Triggers)**: `swiss style, 瑞士風格, grid layout`
- **色票 Token (Hex)**: `#F4F4F5, #FF3B30, #18181B`
- **設計特徵與說明**: 嚴格 12 欄網格對齊、非對稱無襯線大字體、絕對理性與現代主義排版。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #F4F4F5; border-top: 4px solid #FF3B30; color: #18181B; font-family: Helvetica, sans-serif;
  ```

### 3. Japanese Editorial (日式雜誌風)
- **觸發關鍵詞 (Triggers)**: `japanese, 日式風格, 雜誌風, 和風`
- **色票 Token (Hex)**: `#F7F5F0, #2C2C2C, #C84B31`
- **設計特徵與說明**: 暖色紙張材質 (Ivory Paper)、竪排文字 (writing-mode)、極致留白與優雅空氣感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #F7F5F0; color: #2C2C2C; font-family: 'Yu Mincho', serif; border: 1px solid #E5E0D8;
  ```

### 4. Glassmorphism (新玻璃擬物)
- **觸發關鍵詞 (Triggers)**: `glassmorphism, 玻璃擬物, glass ui`
- **色票 Token (Hex)**: `rgba(255,255,255,0.4), #a855f7, #06b6d4`
- **設計特徵與說明**: 毛玻璃背景虛化 (backdrop-filter: blur)、半透明邊框與光感漸變。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: rgba(255,255,255,0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.6);
  ```

### 5. Bento Grid 2.0 (便當盒網格)
- **觸發關鍵詞 (Triggers)**: `bento, bento grid, 便當盒佈局`
- **色票 Token (Hex)**: `#090d16, #ffffff, #38bdf8`
- **設計特徵與說明**: Apple/Linear 風格微卡片組合、多尺寸方格、極細 1px 邊框與內置微小動效。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #09090B; border: 1px solid #27272A; border-radius: 16px; color: #FAFAFA;
  ```

### 6. Cyberpunk 2077 (賽博朋克)
- **觸發關鍵詞 (Triggers)**: `cyberpunk, 賽博朋克, 霓虹霓光`
- **色票 Token (Hex)**: `#00F0FF, #FF0055, #FFE600`
- **設計特徵與說明**: 高對比霓虹青紫黃、故障風 (Glitch Effect)、科技切角與發光邊框。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #00F0FF; color: #000; clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); font-weight: 900;
  ```

### 7. VisionOS Spatial (蘋果空間UI)
- **觸發關鍵詞 (Triggers)**: `visionos, spatial ui, 空間UI`
- **色票 Token (Hex)**: `rgba(255,255,255,0.25), #38bdf8, #0f172a`
- **設計特徵與說明**: 動態懸浮光效、Specular Highlight 高光邊緣、懸停深淺景深。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: rgba(255,255,255,0.25); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  ```

### 8. Aurora UI (極光動態漸變)
- **觸發關鍵詞 (Triggers)**: `aurora, 極光風格, fluid gradient`
- **色票 Token (Hex)**: `#7928CA, #FF0080, #00DFD8`
- **設計特徵與說明**: 彌散色彩斑塊、動態 Blur 漸變背景、夢幻光暈與現代高質感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: linear-gradient(135deg, #7928CA, #FF0080, #00DFD8); color: #FFF; border-radius: 12px;
  ```

### 9. Neumorphism (新擬物柔和風格)
- **觸發關鍵詞 (Triggers)**: `neumorphism, 軟UI, soft ui`
- **色票 Token (Hex)**: `#E0E5EC, #A3B1C6, #FFFFFF`
- **設計特徵與說明**: 同色系雙向陰影 (light/dark shadow)、凸起與凹陷的微立體觸感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #E0E5EC; box-shadow: 6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff; border-radius: 16px;
  ```

### 10. Industrial Brutalism (工業蠻荒)
- **觸發關鍵詞 (Triggers)**: `industrial, 工業風, raw concrete`
- **色票 Token (Hex)**: `#1A1A1A, #E5E5E5, #FF4500`
- **設計特徵與說明**: 裸露混凝土感、金屬網格底紋、警示黃橙色與粗獷鋼鐵線條。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #1A1A1A; border-left: 4px solid #FF4500; color: #E5E5E5; font-family: monospace;
  ```

### 11. Claymorphism (黏土擬物風格)
- **觸發關鍵詞 (Triggers)**: `claymorphism, 黏土風格, 3d clay`
- **色票 Token (Hex)**: `#F3E8FF, #C084FC, #9333EA`
- **設計特徵與說明**: 圓潤蓬鬆雙內陰影、軟萌 3D 黏土造型與可愛浮雕感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #F3E8FF; box-shadow: inset -6px -6px 12px #C084FC, inset 6px 6px 12px #FFF; border-radius: 24px; color: #581C87;
  ```

### 12. Dark OLED Obsidian (深空黑曜石)
- **觸發關鍵詞 (Triggers)**: `dark oled, 黑曜石, pure black`
- **色票 Token (Hex)**: `#000000, #121212, #00E5FF`
- **設計特徵與說明**: 發光二極體純黑底、高鮮豔發光文字與省電極致視覺。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #000000; border: 1px solid #1f1f1f; color: #00E5FF; text-shadow: 0 0 8px rgba(0,229,255,0.5);
  ```

### 13. Retro Win95 (95年代復古網頁)
- **觸發關鍵詞 (Triggers)**: `retro 95, 95復古, classic win`
- **色票 Token (Hex)**: `#008080, #C0C0C0, #000080`
- **設計特徵與說明**: 灰底凸起三維框 (border 2px inset/outset)、青綠桌面與傳統視窗標題列。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #C0C0C0; border: 2px outset #FFF; color: #000; font-family: 'MS Sans Serif', sans-serif;
  ```

### 14. Kinfolk Editorial (Kinfolk 雜誌風格)
- **觸發關鍵詞 (Triggers)**: `kinfolk, 雜誌編輯, 暖白紙色`
- **色票 Token (Hex)**: `#F4F1EA, #33312E, #8C8275`
- **設計特徵與說明**: 極大比例留白、明朝體 Serif、莫蘭迪低飽和大地色與高級沉靜感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #F4F1EA; color: #33312E; font-family: Georgia, serif; letter-spacing: 0.05em;
  ```

### 15. Vaporwave (美式蒸汽波)
- **觸發關鍵詞 (Triggers)**: `vaporwave, 蒸汽波, 復古霓虹`
- **色票 Token (Hex)**: `#FF71CE, #01CDFE, #05FFA1`
- **設計特徵與說明**: 80 年代粉紫青漸變、棕櫚樹網格、復古雕像與懷舊浪漫。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: linear-gradient(to right, #FF71CE, #01CDFE); color: #FFF; font-family: sans-serif; font-weight: 700;
  ```

### 16. Flat Design 2.0 (現代扁平 2.0)
- **觸發關鍵詞 (Triggers)**: `flat design, 現代扁平, minimalist flat`
- **色票 Token (Hex)**: `#2563EB, #F8FAFC, #0F172A`
- **設計特徵與說明**: 取消純硬線條，加入極輕柔單層微陰影與鮮明品牌幾何圖形。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #2563EB; color: #FFF; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  ```

### 17. Minimal Dark Terminal (黑客終端)
- **觸發關鍵詞 (Triggers)**: `terminal, 黑客風格, cli ui`
- **色票 Token (Hex)**: `#0D1117, #238636, #58A6FF`
- **設計特徵與說明**: GitHub Dark 與黑客終端等寬字體、綠色 Status 點與指令提示符。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #0D1117; border: 1px solid #30363D; color: #58A6FF; font-family: monospace;
  ```

### 18. Biomimetic Nature (仿生自然風格)
- **觸發關鍵詞 (Triggers)**: `biomimetic, 自然風格, 森林綠`
- **色票 Token (Hex)**: `#0F291E, #34D399, #ECFDF5`
- **設計特徵與說明**: 葉脈曲線、苔蘚深綠、有機弧線邊框與大地自然氣息。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #0F291E; color: #34D399; border-radius: 30px 10px 30px 10px; border: 1px solid #059669;
  ```

### 19. Chromatic Holographic (全息光澤)
- **觸發關鍵詞 (Triggers)**: `holographic, 全息彩虹, chrome shine`
- **色票 Token (Hex)**: `#FF9A9E, #FECFEF, #A1C4FD`
- **設計特徵與說明**: 金屬全息反射、彩虹光澤流動感與未來流行主義。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); color: #1e293b; border-radius: 12px;
  ```

### 20. E-Ink Paper (電子墨水屏)
- **觸發關鍵詞 (Triggers)**: `eink, 電子紙, Kindle風格`
- **色票 Token (Hex)**: `#EAEAEA, #111111, #777777`
- **設計特徵與說明**: 無高調彩度、雙色灰階動態抖動網點、極致無負擔閱讀體驗。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #EAEAEA; color: #111; border: 1px solid #111; font-family: serif;
  ```

### 21. Gen-Z Chaos (Z世代解構主義)
- **觸發關鍵詞 (Triggers)**: `genz, z世代, 拼貼解構`
- **色票 Token (Hex)**: `#CCFF00, #FF00FF, #000000`
- **設計特徵與說明**: 傾斜貼紙文字、貼紙手繪插畫、打破慣例框框與高彩活力爆發。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #CCFF00; color: #000; transform: rotate(-2deg); font-weight: 900; border: 2px solid #000;
  ```

### 22. Tactile Skeuomorphism (經典擬物觸感)
- **觸發關鍵詞 (Triggers)**: `skeuomorphism, 經典擬物, 皮革木紋`
- **色票 Token (Hex)**: `#3D2314, #D4AF37, #F5E6D3`
- **設計特徵與說明**: 縫線皮革、金屬按鈕紋理、實體微立體感與工藝重現。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #3D2314; color: #F5E6D3; border: 2px solid #D4AF37; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
  ```

### 23. Voxel 3D (體素積木風)
- **觸發關鍵詞 (Triggers)**: `voxel, 體素積木, Minecraft風格`
- **色票 Token (Hex)**: `#4ADE80, #166534, #FEF08A`
- **設計特徵與說明**: 3D 立體方塊像素、階梯網格與幾何趣味。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #4ADE80; color: #166534; border: 3px solid #166534; box-shadow: 6px 6px 0px #166534;
  ```

### 24. HUD Military Tech (戰術抬頭顯示)
- **觸發關鍵詞 (Triggers)**: `hud, 抬頭顯示, 戰術科技`
- **色票 Token (Hex)**: `#051923, #00A6FB, #0582CA`
- **設計特徵與說明**: 十字準星、座標數據圖例、動態邊角括號與軍事科技風格。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #051923; border: 1px solid #00A6FB; color: #00A6FB; font-family: monospace;
  ```

### 25. Gradient Mesh 3.0 (高階色彩網格)
- **觸發關鍵詞 (Triggers)**: `gradient mesh, 漸變網格, 彌散光學`
- **色票 Token (Hex)**: `#FF512F, #DD2476, #3A1C71`
- **設計特徵與說明**: 3 色以上流體漸變、多維立體光源與高端科技流體。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: linear-gradient(to right, #FF512F, #DD2476); color: #FFF; border-radius: 16px;
  ```

### 26. Accessible High-Contrast (無障礙高對比)
- **觸發關鍵詞 (Triggers)**: `a11y high contrast, 高對比無障礙, WCAG AAA`
- **色票 Token (Hex)**: `#000000, #FFFF00, #FFFFFF`
- **設計特徵與說明**: 符合 WCAG AAA 最高標準、純黑底純黃字與極度清晰識別度。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #000000; color: #FFFF00; border: 3px solid #FFFF00; font-size: 14px; font-weight: bold;
  ```

### 27. Memphis Group 80s (孟菲斯波普風格)
- **觸發關鍵詞 (Triggers)**: `memphis, 孟菲斯, 波點幾何`
- **色票 Token (Hex)**: `#F43F5E, #0EA5E9, #FACC15`
- **設計特徵與說明**: 波浪紋、黑白波點幾何塊、彩線拋物線與快樂波普風格。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #FACC15; color: #000; border: 2px solid #000; background-image: radial-gradient(#0ea5e9 20%, transparent 20%);
  ```

### 28. Scandinavian Hygge (北歐溫馨簡約)
- **觸發關鍵詞 (Triggers)**: `hygge, scandinavian, 北歐極簡`
- **色票 Token (Hex)**: `#F8FAF8, #4A5568, #E2E8F0`
- **設計特徵與說明**: 極簡燕麥色底、柔和木質色調、極高舒適度與放鬆家居質感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #F8FAF8; color: #4A5568; border-radius: 12px; border: 1px solid #E2E8F0;
  ```

### 29. Kinetic Typography (動態字體風格)
- **觸發關鍵詞 (Triggers)**: `kinetic, 動態排版, 大字體流動`
- **色票 Token (Hex)**: `#000000, #FFFFFF, #FF3366`
- **設計特徵與說明**: 超大尺寸字體溢出邊框、滾動字幕與流動文字視覺號召。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #000; color: #FFF; font-size: 16px; font-weight: 900; letter-spacing: -1px;
  ```

### 30. Dimensional Papercut (立體剪紙)
- **觸發關鍵詞 (Triggers)**: `papercut, 剪紙風格, 疊層影子`
- **色票 Token (Hex)**: `#1E293B, #38BDF8, #7DD3FC`
- **設計特徵與說明**: 多層紙張堆疊立體影、陰影落差與溫馨工藝質感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #38BDF8; color: #0F172A; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); border-radius: 12px;
  ```

### 31. Retro Future 80s (80年代未來的遐想)
- **觸發關鍵詞 (Triggers)**: `retro future, 復古未來, synthwave`
- **色票 Token (Hex)**: `#2E0249, #570A57, #F806CC`
- **設計特徵與說明**: 霓虹網格線延伸至地平線、夕陽太陽圓盤與電子合成器風格。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #2E0249; border-bottom: 2px solid #F806CC; color: #F806CC; font-family: sans-serif;
  ```

### 32. Micro-Interaction Focus (微互動導向)
- **觸發關鍵詞 (Triggers)**: `micro interaction, 微互動, 靈動微動`
- **色票 Token (Hex)**: `#FFFFFF, #0284C7, #F1F5F9`
- **設計特徵與說明**: 每一個組件懸停均有 3D 浮動、點擊微彈簧與精緻反饋。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #FFF; border: 1px solid #E2E8F0; color: #0284C7; transition: transform 0.2s;
  ```

### 33. Liquid Motion (流體水波)
- **觸發關鍵詞 (Triggers)**: `liquid motion, 流體質感, 水波動態`
- **色票 Token (Hex)**: `#0EA5E9, #38BDF8, #E0F2FE`
- **設計特徵與說明**: 有機液體波動邊框、藍色清澈漸變與流暢水潤感知。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: linear-gradient(180deg, #0EA5E9 0%, #38BDF8 100%); color: #FFF; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  ```

### 34. Zero-Margin Maximalism (極致滿版極多主義)
- **觸發關鍵詞 (Triggers)**: `maximalism, 極多主義, 零留白`
- **色票 Token (Hex)**: `#FF0000, #00FF00, #0000FF`
- **設計特徵與說明**: 充滿畫面的色彩圖塊、無留白、撞擊感與爆炸資訊視覺。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #FF0000; color: #FFFF00; font-weight: 900; padding: 12px; text-transform: uppercase;
  ```

### 35. Raw Concrete Monolith (巨石水泥風)
- **觸發關鍵詞 (Triggers)**: `monolith, 巨石建築, 原始水泥`
- **色票 Token (Hex)**: `#262626, #525252, #A3A3A3`
- **設計特徵與說明**: 深灰巨石塊面、堅硬幾何與現代建築感質感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #262626; color: #D4D4D4; border: 1px solid #404040; font-family: sans-serif;
  ```

### 36. Soft Pastel UI (柔和馬卡龍粉彩)
- **觸發關鍵詞 (Triggers)**: `pastel, 馬卡龍, 柔色彩彩`
- **色票 Token (Hex)**: `#FECDD3, #E0E7FF, #FEF08A`
- **設計特徵與說明**: 淡粉淡藍馬卡龍配色、低對比無壓迫感與療癒氛圍。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #FECDD3; color: #881337; border-radius: 16px; font-weight: 600;
  ```

### 37. Cyber Gothic (賽博哥特風格)
- **觸發關鍵詞 (Triggers)**: `cyber gothic, 暗黑哥特, 黑銀科技`
- **色票 Token (Hex)**: `#050505, #E2E8F0, #94A3B8`
- **設計特徵與說明**: 深黑銀灰襯線字體、尖角金屬框邊與冷峻神秘科技感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #050505; color: #E2E8F0; border: 1px solid #334155; font-family: Times, serif;
  ```

### 38. Vintage Film Grain (復古底片顆粒)
- **觸發關鍵詞 (Triggers)**: `film grain, 復古底片, 膠片質感`
- **色票 Token (Hex)**: `#292524, #D6D3D1, #F59E0B`
- **設計特徵與說明**: 細緻雜訊噪點底紋、舊照片暖色調與懷舊底片藝術。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #292524; color: #D6D3D1; border: 1px dashed #78716C;
  ```

### 39. Spatial Floating Cards (懸浮景深卡片)
- **觸發關鍵詞 (Triggers)**: `floating ui, 景深懸浮, 3d level`
- **色票 Token (Hex)**: `#F8FAFC, #FFFFFF, #0EA5E9`
- **設計特徵與說明**: 三層 z-index 陰影落差、滾動時層次浮動視覺。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #FFF; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); border-radius: 12px;
  ```

### 40. Voice AI Responsive (語音波形響應)
- **觸發關鍵詞 (Triggers)**: `voice ui, 語音波形, ai assistant`
- **色票 Token (Hex)**: `#0F172A, #38BDF8, #818CF8`
- **設計特徵與說明**: 動態音波起伏條、Siri/Gemini 風格流光邊框。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #0F172A; border: 2px solid #38BDF8; color: #38BDF8; border-radius: 20px;
  ```

### 41. Extreme Minimalism (極致極簡主義)
- **觸發關鍵詞 (Triggers)**: `extreme minimalism, 極簡純白, ultra clean`
- **色票 Token (Hex)**: `#FFFFFF, #111111, #EEEEEE`
- **設計特徵與說明**: 除文字與單線條外無任何多餘裝飾、回歸純粹資訊。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #FFF; color: #111; border-bottom: 1px solid #111; font-weight: 400;
  ```

### 42. Biophilic Greenhouse (綠意溫室風)
- **觸發關鍵詞 (Triggers)**: `greenhouse, 綠意溫室, 植物系`
- **色票 Token (Hex)**: `#064E3B, #A7F3D0, #047857`
- **設計特徵與說明**: 植物綠與暖日光配色、自然和諧感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #064E3B; color: #A7F3D0; border-radius: 12px;
  ```

### 43. 3D Hyper-Realism (超寫實 3D 渲染)
- **觸發關鍵詞 (Triggers)**: `hyper 3d, 寫實3d, 光線追蹤`
- **色票 Token (Hex)**: `#0F172A, #38BDF8, #F43F5E`
- **設計特徵與說明**: 光線追蹤金屬光澤、球體玻璃反射質感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: radial-gradient(circle at 50% 50%, #1e293b, #0f172a); color: #38bdf8;
  ```

### 44. Bauhaus Geometric (包浩斯幾何風格)
- **觸發關鍵詞 (Triggers)**: `bauhaus, 包浩斯, 原色幾何`
- **色票 Token (Hex)**: `#DD2476, #FF512F, #1A202C`
- **設計特徵與說明**: 三原色 (紅黃藍) 圓形正方形三角構造、經典工業美學。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #DD2476; color: #FFF; border-radius: 50% 0 0 0;
  ```

### 45. AI Native Glass (AI 原生智能介面)
- **觸發關鍵詞 (Triggers)**: `ai native, ai 介面, 智能流光`
- **色票 Token (Hex)**: `#0B0F19, #6366F1, #A855F7`
- **設計特徵與說明**: 智能漸變光暈跟隨滑鼠、自動卡片佈局與科技感知。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #0B0F19; border: 1px solid #6366F1; color: #A855F7;
  ```

### 46. Soft Pastel Neumorphic (柔彩軟擬物)
- **觸發關鍵詞 (Triggers)**: `pastel neumorphism, 柔彩軟擬物`
- **色票 Token (Hex)**: `#F3F4F6, #E5E7EB, #9CA3AF`
- **設計特徵與說明**: 馬卡龍色彩結合軟凝膠質感凹凸細節。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #F3F4F6; box-shadow: 4px 4px 8px #d1d5db, -4px -4px 8px #ffffff;
  ```

### 47. Brutalist Mono Terminal (蠻荒單色終端)
- **觸發關鍵詞 (Triggers)**: `mono brutalist, 單色蠻荒`
- **色票 Token (Hex)**: `#000000, #FFFFFF`
- **設計特徵與說明**: 純黑白粗體等寬字、粗框無陰影黑白二值視覺。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #000; color: #FFF; border: 3px solid #FFF; font-family: monospace;
  ```

### 48. Luxe Gold Noir (黑金奢華暗黑風)
- **觸發關鍵詞 (Triggers)**: `luxe gold, 黑金奢華, 高級金`
- **色票 Token (Hex)**: `#0A0A0A, #D4AF37, #262626`
- **設計特徵與說明**: 純黑亮面背景、拉絲黃金高光線條邊框與極致尊榮質感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #0A0A0A; border: 1px solid #D4AF37; color: #D4AF37;
  ```

### 49. Clean Nordique (北歐極簡清爽)
- **觸發關鍵詞 (Triggers)**: `nordique, 北歐清爽, clean slate`
- **色票 Token (Hex)**: `#F8FAFC, #0284C7, #475569`
- **設計特徵與說明**: Slate/White 高雅配色、簡潔清晰卡片分層與放鬆目視質感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #F8FAFC; border: 1px solid #E2E8F0; color: #0F172A;
  ```

### 50. Cyber Metallic Slate (賽博金屬板岩)
- **觸發關鍵詞 (Triggers)**: `metallic slate, 金屬板岩, 硬核科技`
- **色票 Token (Hex)**: `#1E293B, #94A3B8, #38BDF8`
- **設計特徵與說明**: 拉絲鋼鐵板岩冷灰底、湛藍指示燈亮點與極度堅固感。
- **核心簽名 CSS (Signature CSS)**:
  ```css
  background: #1E293B; border-top: 2px solid #38BDF8; color: #94A3B8;
  ```

---

## 🛡️ Nutlope Hallmark 20 視覺主題氣質 (Theme Catalog & 8-State Protocol)

### 主題 1. editorial-serif (典雅雜誌明朝)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 暖紙白底、高雅 serif 大字體標題、1.8x 行高、適用品牌故事與精品的極致空氣感
- **樣式代碼 (CSS)**:
  ```css
  background: #FBF9F5; color: #1C1917; border: 1px solid #E7E5E4; font-family: Georgia, serif;
  ```

### 主題 2. neubrutalism-vivid (高對比蠻荒)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 純黑 4px 重硬邊框、硬塊陰影 (box-shadow: 4px 4px #000)、高飽和黃紅青撞色
- **樣式代碼 (CSS)**:
  ```css
  background: #FFE600; color: #000000; border: 3px solid #000; box-shadow: 4px 4px 0px #000; font-family: sans-serif; font-weight: 800;
  ```

### 主題 3. cyber-terminal (深空科技終端)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 單色綠字黑底、矩陣光暈邊框、等寬字體、命令提示列符號與戰術數據面板
- **樣式代碼 (CSS)**:
  ```css
  background: #090D16; color: #00FF66; border: 1px solid #00FF66; font-family: monospace; text-shadow: 0 0 5px rgba(0,255,102,0.5);
  ```

### 主題 4. bento-dark-lux (暗黑奢華便當盒)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: OLED 純黑底、1px 微暗邊框、Linear/Apple 式高質感微卡片佈局與 subtle hover 光暈
- **樣式代碼 (CSS)**:
  ```css
  background: #09090B; color: #FAFAFA; border: 1px solid #27272A; border-radius: 16px; font-family: sans-serif;
  ```

### 主題 5. glass-aurora (極光毛玻璃)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 彌散光暈漸變背景、毛玻璃虛化邊框、Specular 高光頂邊與夢幻質感
- **樣式代碼 (CSS)**:
  ```css
  background: linear-gradient(135deg, rgba(121,40,202,0.6), rgba(255,0,128,0.6)); color: #FFF; backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4); border-radius: 14px;
  ```

### 主題 6. nordique-clean (北歐極簡清爽)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 高雅 Slate 暖白底色、湛藍點睛色、極簡 1px 邊框與舒適閱讀卡片與高透氣感
- **樣式代碼 (CSS)**:
  ```css
  background: #F8FAFC; color: #0F172A; border: 1px solid #E2E8F0; border-radius: 12px; font-family: sans-serif;
  ```

### 主題 7. japanese-editorial (日式和風質感)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 莫蘭迪紙張色系、日式留白、竪排視覺標題與空氣感體驗
- **樣式代碼 (CSS)**:
  ```css
  background: #F7F5F0; color: #2C2C2C; border: 1px solid #E5E0D8; font-family: serif;
  ```

### 主題 8. industrial-steel (工業鋼鐵硬核)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 金屬網格底紋、警示橘紅邊框、純硬塊線條與堅毅工程感知
- **樣式代碼 (CSS)**:
  ```css
  background: #1A1A1A; color: #E5E5E5; border-left: 4px solid #FF4500; font-family: monospace;
  ```

### 主題 9. vision-spatial (蘋果空間懸浮)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 動態懸浮光效、Specular Highlight 高光頂邊與微立態層次落差
- **樣式代碼 (CSS)**:
  ```css
  background: rgba(255,255,255,0.3); color: #0F172A; border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-radius: 20px;
  ```

### 主題 10. clay-pastel (馬卡龍黏土)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 軟萌雙向雙層內陰影、軟膠浮雕質感與療癒互動觸感
- **樣式代碼 (CSS)**:
  ```css
  background: #F3E8FF; color: #581C87; box-shadow: inset -4px -4px 8px #C084FC, inset 4px 4px 8px #FFF; border-radius: 20px;
  ```

### 主題 11. retro-win95 (95 懷舊復古)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 經典灰底 3D 凸起框 (outset)、深藍視窗標題列與懷舊視窗美學
- **樣式代碼 (CSS)**:
  ```css
  background: #C0C0C0; color: #000; border: 2px outset #FFF; font-family: Tahoma, sans-serif;
  ```

### 主題 12. vapor-neon (蒸汽波懷舊)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 80 年代霓虹粉青雙色漸變、日落太陽幾何與復古浪漫
- **樣式代碼 (CSS)**:
  ```css
  background: linear-gradient(90deg, #FF71CE, #01CDFE); color: #FFF; font-family: sans-serif; font-weight: 700; border-radius: 10px;
  ```

### 主題 13. monochrome-minimal (單色極簡)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 純黑白二值對比、無任何干擾多餘色彩與純粹資訊力量
- **樣式代碼 (CSS)**:
  ```css
  background: #000000; color: #FFFFFF; border: 1px solid #FFFFFF; font-family: monospace;
  ```

### 主題 14. biophilic-emerald (綠意翡翠)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 翡翠深綠配色、自然有機曲線邊框與植感呼吸感
- **樣式代碼 (CSS)**:
  ```css
  background: #064E3B; color: #A7F3D0; border: 1px solid #047857; border-radius: 16px;
  ```

### 主題 15. holo-chromatic (彩虹全息)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 彩虹全息流光金屬漸變、高奢科技感與未來流行美學
- **樣式代碼 (CSS)**:
  ```css
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); color: #1e293b; border-radius: 14px; font-weight: 700;
  ```

### 主題 16. eink-reader (電子紙閱讀)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 無彩度純灰階抖動網點、高對比書籍閱讀質感與低壓視覺
- **樣式代碼 (CSS)**:
  ```css
  background: #EAEAEA; color: #111111; border: 1px solid #111; font-family: Georgia, serif;
  ```

### 主題 17. genz-deconstruct (Z 世代解構)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 傾斜貼紙字體、打破網格與高張力撞色幾何活力
- **樣式代碼 (CSS)**:
  ```css
  background: #CCFF00; color: #000000; border: 2px solid #000; transform: rotate(-1deg); font-weight: 900;
  ```

### 主題 18. hud-tactical (戰術抬頭顯示)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 十字準星、座標數據圖例、動態括號與軍事科技面
- **樣式代碼 (CSS)**:
  ```css
  background: #051923; color: #00A6FB; border: 1px solid #00A6FB; font-family: monospace;
  ```

### 主題 19. mesh-gradient (彌散網格)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 多色流體漸變、光學彌散背景與現代高視覺號召
- **樣式代碼 (CSS)**:
  ```css
  background: linear-gradient(135deg, #FF512F, #DD2476); color: #FFFFFF; border-radius: 16px;
  ```

### 主題 20. luxe-noir (黑金高奢)
- **觸發詞**: `None`
- **主題色票 (Hex)**: ``
- **主題氣質特徵**: 曜石黑底、拉絲黃金高光線條與極致尊榮奢華感知
- **樣式代碼 (CSS)**:
  ```css
  background: #0A0A0A; color: #D4AF37; border: 1px solid #D4AF37; font-family: Times, serif;
  ```

