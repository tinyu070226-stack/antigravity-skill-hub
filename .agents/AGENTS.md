# Project Rules for Antigravity Agent & OpenCode Synergy

## 🍖 grill-with-docs 智慧啟用規則

- **智慧判斷機制**：
  - 當使用者提到以下意圖關鍵字時，**自動啟用並進入 `grill-with-docs` 模式**：
    - 「計劃」、「設計」、「架構」、「需求」、「怎麼做」、「review 這份方案」、「grill me」、「審核」、「想清楚」
  - 當使用者提到以下指令意圖時，**嚴禁進入 `grill-with-docs` 模式，直接執行程式碼撰寫與修復**：
    - 「直接做」、「快速改」、「寫 code」、「fix bug」、「不用問我」
  - 當使用者明確說出 **「開 grill」** 或 **「/grill-with-docs」** 時，必須全力配合並完全啟動該 Skill 的提問與方案審核邏輯。
  - Agent 需依照當前對話的情境自主且明智地判斷，決定是否該進行 grilling，避免過度打擾使用者，亦不要錯過需要嚴謹規劃架構的關鍵時刻。


---

## 🎬 簡報多 Agent 極致省 Token 裝配流水線 Protocol (Deck Multi-Agent Assembly Pipeline v2.0)

- **核心架構與三重 0-Token 確定性工程防禦**：
  1. **Phase 1: 內容結構解耦 (Gemini 主力/低 Token)**：
     - Gemini 僅產出純內容 `deck_content.json`（頁數、標題、副標、bullet points 與圖片描述）。
     - **方案 B 客觀標籤判準**：預設為標準模板。僅當 JSON 中明確標記 `"layout": "custom_dom"` 時，才觸發 Gemini 進行特殊 DOM 裝配，徹底排除語意模糊！
  2. **Phase 2: 視覺與 Design Tokens (Claude Subagent / 現成樣式庫)**：
     - Claude 僅產出輕量 `deck_theme.css`。選用 10 大 Specs 時直接載入現成樣式，Claude 0 次呼叫！
  3. **Phase 3: 0-Token 零跑版與溢出防禦裝配引擎 (`build_deck.py`)**：
     - **Schema 自動容錯驗證 (Schema Validation)**：內建 try-catch 與預設欄位修復，格式錯誤自動補齊，100% 絕不 Crash 卡死！
     - **動態字級 Auto-Fit 溢出防禦 (Font Scaling Overflow Defense)**：Python 在 0 秒內根據字數與列表數量動態調降 font-size 與 line-height，並配合 `overflow: hidden; max-height: 100%;`，0 Token 保證絕不溢出 16:9 框界！
  4. **Phase 4: 輕量 CLI 執行與 PDF 導出 (OpenCode)**：
     - OpenCode 僅在 Terminal 跑 1 行指令（0 長 Context 負擔）。
