# Project Rules for Antigravity Agent & OpenCode Synergy

## 🍖 grill-with-docs 智慧啟用規則

- **智慧判斷機制**：
  - 當使用者提到以下意圖關鍵字時，**自動啟用並進入 `grill-with-docs` 模式**：
    - 「計劃」、「設計」、「架構」、「需求」、「怎麼做」、「review 這份方案」、「grill me」、「審核」、「想清楚」
  - 當使用者提到以下指令意圖時，**嚴禁進入 `grill-with-docs` 模式，直接執行程式碼撰寫與修復**：
    - 「直接做」、「快速改」、「寫 code」、「fix bug」、「不用問我」
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

- **🚨 意圖觸發與強制硬性攔截器 (Mandatory Execution Trigger)**：
  - **觸發關鍵字**：當使用者提到 **「簡報」**、**「簡報製作」**、**「Deck」**、**「Slide」**、**「Slidev」** 或類似簡報產出意圖時，**強制鎖定本流水線 Protocol**。
  - **硬性拒絕規則 (Hard Constraint Violation)**：主力 Agent **嚴禁**在同一個 Context 中自行撰寫或修改 `deck_theme.css` 與核心 DOM 排版樣式。凡違反此規則直接單獨編寫完成簡報者，判定為 **Hard Protocol Violation Failure**。

- **核心架構與三重 0-Token 確定性工程防禦**：
  1. **Phase 1: 內容結構解耦 (Gemini 主力 / 嚴禁包含 HTML)**：
     - Gemini 僅產出純內容資料 `deck_content.json`（頁數、標題、副標、bullet points 與圖片路徑）與計畫書 `implementation_plan.md`。
     - **🚫 JSON 嚴格淨化硬規範**：`deck_content.json` 中**嚴禁包含任何 HTML 標籤（如 `<div>`, `<style>`, `<script>`）**！所有 DOM 封裝與版面結構必須交由 Python 引擎裝配，極致節省 Token！
  2. **Phase 2: 視覺與 Design Tokens (強制呼叫 Claude Subagent / 現成樣式庫)**：
     - **強制呼叫點**：主力 Agent **必須**呼叫 `invoke_subagent` 啟動專門子 Agent（或透過 OpenCode 的 `claude-3-7-sonnet` / `claude-3-5-sonnet`）來產出與美化 `deck_theme.css` 及視覺元件，嚴禁主力 Agent 球員兼裁判！
  3. **Phase 3: 0-Token 零跑版與溢出防禦裝配引擎 (`build_deck.py`)**：
     - **Schema 自動容錯與預設 Fallback 備案**：Python 腳本若未檢測到 `deck_theme.css`，必須**自動載入內建現成樣式庫（如 Dark Glass Spec / Modern Swiss）進行靜態降級補全**，嚴禁退回主 Context 手動寫 CSS！
     - **動態字級 Auto-Fit 溢出防禦 (Font Scaling Overflow Defense)**：Python 在 0 秒內根據字數與列表數量動態調降 font-size 與 line-height，並配合 `overflow: hidden; max-height: 100%;`，0 Token 保證絕不溢出 16:9 框界！
  4. **Phase 4: 輕量 CLI 執行與 PDF 導出雙重驗證 (強制硬性呼叫 OpenCode / Playwright 斷言)**：
     - **🚨 硬性攔截機制 (Hard Delivery Blocker)**：主力 Agent **嚴禁**在未執行物理 Playwright 截圖斷言前向使用者宣佈簡報完成！否則直接判定為 **Protocol Gate Violation Failure**。
     - **強制呼叫點與三重機械斷言 (Triple Assertion Check)**：
       1. **靜態 CSS 斷言**：檢查產出的 HTML 必須包含 `@page { size: 297mm 210mm; margin: 0; }` 與 `print-color-adjust: exact`。
       2. **PDF 物理頁數斷言**：必須由 Terminal 執行 Playwright 測試，驗證產出 PDF/HTML 之頁數必須 `100% == json_slide_count`。
       3. **🚫 零破圖與零圖片重複硬斷言 (Zero Broken & Unique Image Assertion)**：Playwright 測試腳本必須**逐頁檢查 `<img>` 的 `naturalWidth > 0` (無 404 破圖)**，且同一頁面中多張卡片的 `src` 圖片網址 **嚴禁重複 (Unique Check)**！凡有 404 或重複貼圖，Exit Code 必須回傳 1 並強制修正後方可交付。


---

## ⚡ OpenCode 多模型極致分工協定 (OpenCode Multi-Model Synergy Protocol v1.0)

當 Antigravity 主介面額度緊張、或面臨特殊領域任務時，必須**自動將任務派發給 OpenCode Terminal 端最擅長的模型**執行：

1. **🎨 視覺美學與前端 UI (Claude 3.7 / 3.5 Sonnet)**：
   - 當需寫 CSS、美化 UI、設計元件或主介面 Claude 額度用盡時，自動呼叫 OpenCode 的 `claude-3-7-sonnet` 或 `claude-3-5-sonnet`。
2. **🧠 邏輯重構與深層除錯 (GPT o3-mini / o1 / GPT-4.5)**：
   - 當遇到複雜演算法、邏輯死結、罕見 Bug 或除錯斷言失敗時，自動呼叫 OpenCode 的 `o3-mini` 或 `o1` 進行邏輯推理。
3. **⚡ 超大文本提鍊與免費重構 (Qwen-3-Coder / DeepSeek-R1 / V3)**：
   - 當需閱讀超長 DOCX/PDF、擷取重點大綱或批量進行大範圍代碼重構時，自動呼叫 OpenCode 的 `qwen3-coder` 或 `deepseek-r1`，極致節省 Token。


---

## 🛡️ 程式碼修改與冪等性注入硬規範 (Idempotency & Injection Hard Rules)

1. **嚴禁使用子字串比對進行語意/函數存在性檢查 (No Substring Matching for AST/Function Existence)**：
   - ❌ **嚴禁寫法**：`if "function_name" not in file_content:` (容易被 `onclick=""`、註解、其他字串誤判，導致假陰性成功)。
   - ✅ **標準規範**：必須使用**精確正則語法** (例如：`re.search(r'function\s+function_name\s*\(', content)`)，或使用**唯一冪等性標記註解 (Idempotency Anchor Tag)** (例如：`// __INJECTED_FEATURE_TAG_V1__`) 作為注入判斷依據。

2. **機械化斷言清單驗收協定 (Mechanical Assertion Verification Protocol)**：
   - **定義 expected_behavior.json**：進行 UI 互動或核心邏輯變更時，必須在 `scratch/` 產出機械化斷言檔案，明確定義：
     - 觸發條件 (`selector` / `event`)
     - 預期結果 (`expected_dom_property` / `expected_text` / `expected_style`)
   - **Playwright 自動化比對**：由 OpenCode 或驗證腳本在 Terminal 執行 Playwright 測試，機械化比對斷言是否 100% 通過，嚴禁僅靠主觀截圖判斷。

3. **假陰性 (False Negative) 失敗判定機制**：
   - 腳本 Exit Code 0 僅代表語法執行完成，不代表業務邏輯正確。
   - 凡是 Playwright 斷言失敗、Console 噴出 Uncaught ReferenceError / TypeError，一律視為**硬性 failure**，計入失敗上限。


---

## 🔁 假陰性失敗與 TDD 驗證閉環補強 Protocol (False-Negative Closure & TDD Protocol)

1. **Playwright 斷言失敗直連 `consecutive_bug_failures` 計數器**：
   - **雙觸發來源 (Dual Trigger Sources)**：`consecutive_bug_failures` 的 `+1` 判定來源擴充為以下兩者（滿足任一即觸發）：
     - 來源 A (語意)：使用者自然語言回報 Bug / 報錯 / 行為異常。
     - 來源 B (機械)：Playwright 自動化測試 `assert` 失敗、Console 噴出未捕獲異常、或 Exit Code != 0。
   - **自動觸發校驗**：當 `consecutive_bug_failures >= 2` 時，自動觸發二次審查機制，禁止繼續盲目修改同一個檔案。

2. **斷言先行 (Test-Driven Assertions Pre-Production Rule)**：
   - **嚴禁自證清白 (No Post-Implementation Self-Attestation)**：`expected_behavior.json` 必須在**撰寫任何實作程式碼「之前」**（Phase 1 計畫書階段）先產出。
   - **可追溯性欄位 (Traceability Field)**：斷言檔案中每一項驗證必須包含 `user_requirement_ref`，強行比對原始需求，例如：
     ```json
     {
       "assertion_id": "test_scenario_switcher",
       "user_requirement_ref": "對應使用者需求：點擊選單按鈕應切換提示詞範例內文",
       "target_selector": "#btn-tab-same_style_new_content",
       "trigger_event": "click",
       "expected_dom_property": "innerText",
       "expected_contain_text": "deck_content.json"
     }
     ```
   - 確保斷言是根據「原始需求」定義，而非根據「已寫壞的程式碼」順水推舟。

---

## 🤖 多 Agent 角色隔離與驗證閉環協定 (Decoupled Multi-Agent & Verification Loop Protocol)

為防止單一 Agent「球員兼裁判」造成思維慣性、幻覺連鎖、或是被污染的 Context（對話歷史）帶偏，必須嚴格執行三權分立的 Agent 協作模式：

1. **規劃大腦 (Planner)**：
   - 負責與使用者對齊需求，撰寫並更新 `implementation_plan.md`。
   - **嚴禁**直接進行代碼編輯或在同一個長 Context 內盲目重複修改。

2. **實作子 Agent (Coder Subagent)**：
   - 當計畫書定案、或需要修復 Bug 時，主力 Agent 必須啟用一個**乾淨的、沒有歷史錯誤包袱的子 Agent (例如：`invoke_subagent` 啟動的 `self` 或 `flash` 模型)**。
   - 實作子 Agent 僅依據「計畫書/Bug 報告」和「目前最新代碼」來產出或修復特定模組，避免被歷史失敗記錄牽引。

3. **物理驗證 (OpenCode & QA Subagent)**：
   - 程式碼撰寫完成後，由 OpenCode 執行物理編譯檢查（如 `node --check`）與 Playwright 斷言測試。
   - 若測試失敗，由 OpenCode 或 QA 模組產生「純淨的錯誤報告與診斷資訊」，回饋給 Coder Subagent 進行迭代。
   - 嚴禁未經 OpenCode 物理編譯與 Console 檢查即宣告任務完成。
