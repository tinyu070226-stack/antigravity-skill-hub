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
- **硬性觸發斷路器 (Hard Circuit Breaker Rule - 包含複雜度維度)**：
  - **🚫 嚴禁觸發 OpenCode (3 NOs)**：
    1. 單純的文字修改、色票更換或單一檔案的低風險微小修正。
    2. 未發生編譯報錯、未連錯 2 次且未涉及高風險複雜度時。
  - **⚡ 強制觸發 OpenCode (4 MUSTs)**：
    1. **連續 2 次修正同一 Bug 或測試失敗時** (Rule of 2 Failures)。
    2. **出現 TypeScript 型態檢查報錯或系統編譯失敗時** (Compiler Error Log)。
    3. **跨 3 個以上檔案重構且準備提交 Commit 前** (Multi-file Refactoring)。
    4. **高風險單檔複雜度觸發**：單一檔案涉及 >3 個 Breakpoints 複雜 Responsive 重排、>50 行 CSS Layout Math / Custom Property 運算或複雜微互動解析時。

---

## ⚡ 模型智慧路由與額度保護 Protocol (Model Smart Routing & Quota Guard)

- **核心配額與分工規則 (永久生效)**：
  1. **Claude 模型 (頂級視覺美學解鎖與生命週期隔離)**：
     - **🚫 嚴禁解鎖 Claude (2 NOs)**：
       1. 平日常規的組件修復、邏輯調整、Padding/Margin 微調或文字/顏色更換。
       2. 已有 UI 結構下的功能性小擴充。
     - **⚡ 強制解鎖 Claude 啟用門檻 (3 MUSTs - 徹底排除語意模糊)**：
       1. **全新初始化**：從零建立全新的 App 頁面、全新 View 架構或核心大組件時。
       2. **使用者明確指示**：使用者說出「變更整體 Theme」、「重新設計整體視覺」、「改為 X 風格/語彙」時。
       3. **美學退回二次**：Gemini 配合 50 種風格庫修改後，仍被使用者因 UI 美學問題退回修正 2 次以上時 (Rule of 2 Aesthetic Rejections)。
     - **生命週期隔離 (Spawn-Task-Kill Anti-Scope-Creep Rule)**：
       - 凡解鎖呼叫 Claude 模型，**必須在獨立 Subagent (`invoke_subagent`) 中進行**。
       - **任務完成即銷毀**：Subagent 產出代碼並合併後，該 Subagent **立即銷毀 (Kill)**。
       - **主線永不蔓延**：主對話線 (Main Thread) 默認永遠鎖定 **Gemini (Pro / Flash)**，隨後的維護自動切回 Gemini，徹底封殺 Context 蔓延與 Token 浪費！
  2. **Gemini 模型 (主力全能/ Google AI 會員)**：
     - 包辦 95% 以上任務：需求拆解、架構規劃、後端 API、資料庫 Schema、演算法、單元測試、自動除錯與日常維護。

---

## ⚔️ Gemini 架構 vs Claude 視覺：權限分層與結構提案協定 (Layered Ownership & Structural Proposal Gate)

- **核心仲裁規則 (兼顧頂級美學與架構穩定)**：
  1. **Data & Props Schema 由 Gemini (架構師) 說了算**：
     - 資料流向 (Data Flow)、API 合約、Props 介面、State 狀態管理、Forms/ARIA 語意結構具備最高否決權。Claude 嚴禁變更 Data Contract。
  2. **Visual Sub-DOM & CSS 由 Claude (視覺總監) 說了算**：
     - 為了達成頂級美學 (如 Glassmorphism 遮罩層、Bento 邊框 Wrap、Motion Container)，Claude 預設採用「非破壞性包裹 (Visual Wrapper Sub-DOM)」。
  3. **DOM 結構變更提案與仲裁機制 (Structural Proposal Gate)**：
     - **解鎖結構調整**：若 Claude 判斷必須調整 Non-data 的 DOM 結構順序才能達到頂級美學（如 Bento Grid 響應式重排、Z-index 堆疊順序）：
     - **提案流程**：Claude Subagent 不得直接盲目刪改，而是於產出物中標註 `DOM Structural Proposal`，列出「視覺修改點」與「確保保留的 Props/Data-id 綁定」。
     - **Gemini 自動仲裁審核**：由 Gemini 審核確認 Data Flow / State 未被破壞後，立即批准合併！實現**頂級美感品質**與**鋼鐵架構穩定**雙贏！

---

## 📦 4 大重構整合技能集 (The 4 Master Skill Architecture)

- **核心架構與路由規則 (永久生效)**：
  1. **`core-synergy-skill`**：整合 `agent-skills`, `grill-with-docs`, OpenCode 4大協同模式, `team-mode` 多模型路由與 `open-code-review` 二方門禁。
  2. **`design-system-skill`**：整合前端 50 種設計風格 KB、Nutlope Hallmark (20主題, 8-State驗證, 6軸打分) + Emil Kowalski 8大質感與 OKLCHBetter-colors。
  3. **`ui-motion-skill`**：整合 Anime.js 時間軸彈簧物理、LottieFiles 向量動效、Text-to-Lottie 生成與 React Bits (shadcn CLI) 組件庫規範。
  4. **`presentation-skill`**：整合 10 大客製化 16:9 簡報視覺風格 Specs (含 1. 霓虹拼貼 10:1, 2. Apple 3D Mockup, 3. 石膏 Pop 撞色, 4. Kinfolk 雜誌風, 5. 瑞士新經濟無 Markdown, 6. 極簡作品集 60% 留白, 7. 沉靜科技 Living Artifact, 8. 溫柔扁平插畫, 9. Slidev 導出器, 10. 美食品牌海報)、兩階段簡報計畫書門禁 (2-Stage Deck Plan Gate: 強制先寫 `presentation_plan.md` 經確認後才寫簡報代碼)、簡報 5 大紅線原則（含紅線 4：圖片直觀精準相關、紅線 5：圖片必須嚴格符合選擇的簡報風格，嚴禁視覺斷層與突兀圖像）、Slidev 導出器以及 `beautiful-article` 10 大文章保留率類型與 11 大排版主題。

---

## 🛡️ UI 視覺排版與兩階段防禦機制 (UI Layout Defense Protocol)

- **核心視覺防禦與測試規則 (永久生效)**：
  1. **文字排版 DOM 結構隔離 (Anti-PreWrap Slop Rule)**：
     - 凡是包含多行提示詞 (Master Prompt)、文字卡片或嚴格靠左對齊的需求，**嚴禁僅依賴 `white-space: pre-wrap` 渲染 Raw String**（防止隱形 `\n` 與空格導致瀏覽器誤判置中與頂部高度）。
     - **強制要求**：必須使用 `.replace(/^[\s\r\n]+/, '')` 清理頭部，並拆分為獨立且明確靠左的 `<p style="text-align:left;">` DOM 元素進行結構化渲染。
  2. **UI 樣式雙重驗證門禁 (Visual Layout Verification Protocol)**：
     - 當使用者回報 UI 位置跑掉或樣式無變化時，**嚴禁連續猜測 CSS Padding/Margin 或單純歸咎於快取**。
     - 必須第一時間檢查資料源 (`JSON/DOM Data Source`) 是否夾帶不可見字元，並於背景驗證確保修改後在視覺上完全符合預期。

---

## 📚 本地知識庫低 Context 漸進檢索協定 (kb-retriever Protocol)

- **知識庫與大檔案檢索規則 (永久生效)**：
  1. **分層索引導航 (`data_structure.md`)**：
     - 當使用者要求「從知識庫/文檔目錄查資料」時，優先定位 `knowledge/`（或指定目錄）。
     - **禁止一次讀取整份檔案**！必須先閱讀根目錄與子目錄的 `data_structure.md` 索引檔，了解領域目錄地圖後，再沿著最相關的檔案路徑下鑽。
  2. **先學習再處理原則 (Learn-Before-Process)**：
     - 遇到 PDF / Excel 等二進位檔案時，必須先確認或調用專用提取工具 (`pdftotext`, `pdfplumber`, `pandas`) 結構化文本，禁止直接盲目 grep 原始二進位。
  3. **5 輪收斂與出處標註 (Source Attribution)**：
     - 搜尋上限嚴格限制為 5 輪，回答時必須明確附帶檔案相對路徑與行號出處。

