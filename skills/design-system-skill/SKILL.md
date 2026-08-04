---
name: design-system-skill
description: |
  視覺美學與 Anti-Slop 防禦系統。包含 50 種現代網頁設計風格知識庫、Nutlope Hallmark 20 主題輪替防呆、
  web-design-engineer 5-Dial 視覺決策框架、Emil Kowalski Apple 品質細節標準、以及 UI-Skills 路由系統。
  觸發時機：設計新 UI、重構視覺系統、選擇設計風格、審查是否為 AI 模板 Slop。
---

# Design System Skill（視覺美學 & Anti-Slop 防禦）

本 Skill 確保所有 UI 產出達到**生產級品質**，杜絕 AI 模板化的 Slop 設計。

---

## 1. Anti-Slop Defense Protocol（Nutlope Hallmark）

Nutlope Hallmark 是防止 AI 產出平庸模板 UI（Slop UI）的強制防禦體系，包含三大支柱：

### 支柱一：20 主題氣質輪替（Theme Catalog）
**禁止使用** AI 白底灰卡片預設介面。必須根據情境從以下方向擇一：
古典學術、賽博龐克、復古報章、暗黑 OLED、奶油紙質、霓虹熒光、日系極簡、包浩斯幾何、生物仿生、瑞士網格…等。

### 支柱二：8-State 組件寫滿
每個 UI 組件必須定義完整的 8 種狀態：
`default` / `hover` / `focus` / `active` / `disabled` / `loading` / `error` / `success`

### 支柱三：Pre-emit 6 軸自動多樣性
在產出任何 UI 之前，強制聲明以下 6 個維度的設計選擇（不允許 N/A）：
1. **色彩體系**：主色調（OKLCH 色值） + 輔色 + 強調色
2. **排版系統**：字型家族 + 字型比例尺
3. **間距節奏**：基準單位（如 4px / 8px）
4. **邊框與圓角**：邊框寬度 + 圓角半徑規則
5. **陰影層次**：0-4 層陰影定義
6. **動效基調**：Duration Range + Easing Curve

---

## 2. web-design-engineer 5-Dial 視覺決策框架

**在撰寫任何代碼前**，必須先對這 5 個維度進行 1-10 評分，並在注釋或計畫書中聲明：

| 刻度盤 | 說明 | 低分 | 高分 |
|---|---|---|---|
| **Variance（多樣性）** | 顏色/尺寸/形狀的變化程度 | 極簡一色 | 豐富多變 |
| **Motion（動效強度）** | 動畫量與互動感 | 純靜態 | 大量動效 |
| **Density（資訊密度）** | 每屏的資訊量 | 留白極多 | 緊湊資訊流 |
| **Asset Dependence（素材依賴）** | 是否依賴圖片/插畫 | 純代碼 | 重度素材 |
| **Brand Fidelity（品牌忠誠度）** | 是否需要精確還原品牌視覺 | 自由創作 | 嚴格還原 |

### 25 大設計風格方案索引
詳見 `references/50-styles-index.md`，包含 50 種風格的色票、字型、陰影、邊框的精確規格。

常用速查：
- `Linear Style`：OLED 黑背景 + 紫色/藍色漸層 + Inter 字型 + 無邊框卡片
- `Stripe Press`：白底 + 超大 Gilroy 標題 + 精緻分隔線 + 微陰影
- `Apple Product`：SF Pro + 大留白 + 微妙漸層 + 60fps 彈簧動畫
- `Neo-Brutalism`：高對比 + 粗黑邊框 + 偏移陰影 + 飽和色
- `Glassmorphism`：frosted glass + backdrop-filter blur + 半透明邊框

---

## 3. Emil Kowalski Apple 品質細節標準

參考 Emil 的設計工具哲學，每個互動組件必須達到：

- **Easing/Spring 詞彙精確**：使用物理彈簧 `spring(mass, stiffness, damping)` 而非線性 `ease-in-out`
- **60 FPS 性能審查**：所有動畫必須使用 GPU 加速屬性（`transform`, `opacity`），禁止動畫 `width`/`height`/`top`/`left`
- **細節密度**：按鈕按下有 `scale(0.97)` 回饋、卡片懸停有 `translateY(-2px)` 浮起、焦點有明確 `ring` 樣式

---

## 4. UI-Skills 路由系統

根據具體設計需求，路由到對應的專業子 Skill：

| 需求 | 路由到 |
|---|---|
| 顏色系統 / OKLCH 色彩 | `better-colors` Skill |
| 瑞士網格 / Helvetica 系排版 | `swiss-design` Skill |
| 無障礙 / ARIA 合規 | `build-primitive` Skill |
| 完整 UI 工程規範 | `frontend-ui-engineering` Skill |
| 動效系統 | `ui-motion-skill`（本套件） |
| GitHub README 美化 | `beautify-github-readme` Skill |

---

## 5. 禁止事項（Anti-patterns）

- 禁止使用純 Hex 描述顏色而不定義語意 Token（如 `--color-primary`, `--color-surface`）
- 禁止「白底灰卡片 + 藍色按鈕」預設配色（AI Slop 特徵）
- 禁止在不知道 5-Dial 評分的情況下直接寫 CSS
- 禁止讓 8 種組件狀態中有任何一種未定義（即使視覺相同也要明確聲明繼承）
- 禁止動畫 `width`、`height`、`margin`、`padding`（效能殺手）
