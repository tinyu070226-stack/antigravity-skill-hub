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
