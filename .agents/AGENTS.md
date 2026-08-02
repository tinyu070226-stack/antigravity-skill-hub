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

## 🚀 agent-skills 預設啟用與優先使用規則

- **核心優先級指令**：
  - 本專案預設啟用 `agent-skills` 技能包 (`C:\Users\Tim\.agents\skills\agent-skills`)。
  - 在日常的 Coding、軟體工程任務、生產級開發與架構設計流程中，優先加載並使用該技能包提供的各種開發輔助、調試與代碼質量評估能力。
  - 此指令為 Antigravity 助手的核心永久規則，在每次對話及任務中自動貫徹執行，無需使用者重複提醒。

---

## 🤖 Antigravity × OpenCode 終極 3 大全自動協同架構 (默認啟用)

Antigravity 具備高階架構規劃、UI/UX 美學設計與系統引導能力；OpenCode 作為終端機執行與深層程式碼檢查助手。兩者預設全自動協同運作：

### 📍 模式 1：CLI / Run 直連協同 (即時單次任務與自動除錯)
- **觸發時機**：編譯失敗、測試未通過、型態檢查報錯或需要即時二方審查時。
- **自動行為**：Antigravity 在背景終端機中自動執行 `opencode run "..."` 命令：
  ```bash
  opencode run "請檢視最新的錯誤日誌與程式碼變更，協助修復型態檢查與語法錯誤。"
  ```

### 📍 模式 2：Task Artifact 檔案看板機制 (大型專案與多步驟拆解)
- **觸發時機**：大型新功能開發、跨模組重構或多步驟工程任務。
- **自動行為**：
  1. Antigravity 產出需求規格與任務拆解至 `.antigravity/tasks/task-xxx.md`。
  2. 觸發 OpenCode 讀取並執行：`opencode run "執行 .antigravity/tasks/task-xxx.md 裡的待辦事項"`。
  3. OpenCode 執行完畢後更新任務狀態為 `[DONE]` 並填寫修改日誌。

### 📍 模式 3：JSON Hooks 自動化防禦機制 (驗證失敗自動攔截)
- **觸發時機**：Antigravity 自動化驗證、單元測試或 UI 測試失敗時。
- **自動行為**：系統依據 `.antigravity/hooks.json` 的鉤子設置，自動調用 OpenCode 讀取最新的 `error.log` 並執行修復。

### 📍 模式 4：open-code-review 自動化代碼二方審查門禁 (默認底層啟用)
- **觸發時機**：OpenCode 完成程式碼撰寫、重構或修復準備 Commit 時。
- **自動行為**：系統自動觸發 `@alibaba-group/open-code-review` 對 Git diff 進行深度掃描與安全/品質評分，自動攔截邏輯 Bug 與潛在漏洞，確保 Production-ready 品質。


---

## 🎨 前端 50 種設計風格知識庫 (優先參考規則)

- **核心優先級指令**：
  - 本專案已完全學習 [rxw2023/Front-end-Design-Styles](https://github.com/rxw2023/Front-end-Design-Styles) 知識庫（包含 50 種經典與現代前端設計風格）。
  - 今後在接收到任何 UI / 前端介面開發需求時，**必須優先參考該知識庫中的 50 種風格體系**（包含色譜 Hex、邊框陰影, Typography, 材質與互動反饋），產出高保真、美學一致的程式碼。

---

## 📝 技能目錄 PDF 檔自動同步規則 (永久生效)

---

## ⚡ 模型智慧路由與額度保護 Protocol (Model Smart Routing & Quota Guard)

- **核心配額與分工規則 (永久生效)**：
  1. **Claude 模型 (極致審美時機)**：
     - **ONLY 限於「第一次最開始建立全新 UI/UX、全新網頁/元件架構」之初始化生成時**，可調用 Claude 模型建立頂級視覺骨架與審美基調。
     - **嚴格禁令**：對於後續所有的 UI 微調、樣式修改、動畫調整、重構與程式碼修復，**一律嚴禁再調用 Claude 模型**！
  2. **Gemini 模型 (主力全能/ Google AI 會員)**：
     - **涵蓋日常 95% 以上任務**：包括需求拆解、架構規劃、後端 API、資料庫 Schema、演算法、單元測試、自動除錯與大型 Context 檔案搜尋。
     - **包辦所有後續 UI 微調**：所有「第一次初始化之後」的介面微調、CSS 修正與重構，**一律全數交給 Gemini 模型 (Pro / Flash)**，並配合 `frontend-design-styles (50種風格庫)` 與 `hallmark` 規範來保持視覺質感。
  3. **Subagent 上下文隔離 (Token 巨額節省)**：
     - 大型或多檔案任務強制使用 `team-mode` 派發獨立 Subagent，隔離對話歷史紀錄，避免 Context 爆炸與重複發送，達成極低 API Token 消耗。

---

## 📦 4 大重構整合技能集 (The 4 Master Skill Architecture)

- **核心架構與路由規則 (永久生效)**：
  1. **`core-synergy-skill`**：整合 `agent-skills`, `grill-with-docs`, OpenCode 4大協同模式, `team-mode` 多模型路由與 `open-code-review` 二方門禁。
  2. **`design-system-skill`**：整合前端 50 種設計風格 KB、Nutlope Hallmark (20主題, 8-State驗證, 6軸打分) + Emil Kowalski 8大質感與 OKLCHBetter-colors。
  3. **`ui-motion-skill`**：整合 Anime.js 時間軸彈簧物理、LottieFiles 向量動效、Text-to-Lottie 生成與 React Bits (shadcn CLI) 組件庫規範。
  4. **`presentation-skill`**：整合 10 大客製化簡報視覺風格 Specs (含霓虹拼貼, Apple Mockup, Kinfolk 雜誌風, 瑞士商業風等) 與 Felo / Slidev 導出器。
