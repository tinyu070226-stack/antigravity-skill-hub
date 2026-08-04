---
name: core-synergy-skill
description: |
  Antigravity + OpenCode 雙 Agent 底層協同、工程門禁與反假陰性 TDD 全套協議。
  觸發關鍵字：「計劃」「設計」「架構」「需求」「怎麼做」「review」「grill me」「審核」「想清楚」。
  包含：grill-with-docs 方案審核模式、kb-retriever 漸進知識庫索引、多 Agent 角色隔離（Planner/Coder/QA）、TDD 假陰性防禦。
---

# Core Synergy Skill（底層協同與工程門禁全套）

本 Skill 是所有 Agent 工作的**底層作業系統**，必須在啟動任何實作任務之前讀完本文件。

---

## 1. 主 Agent 協同架構

- **規劃大腦 (Planner)**：主力 Agent 負責與使用者對齊需求，產出 `implementation_plan.md`。嚴禁直接進行代碼編輯，或在同一個長 Context 內盲目重複修改。
- **實作子 Agent (Coder Subagent)**：計畫書定案或有 Bug 需修復時，主力 Agent 必須啟用**乾淨的子 Agent**（沒有歷史錯誤包袱），僅依據計畫書或 Bug 報告與最新代碼工作，避免被歷史失敗牽引。
- **物理驗證 (QA / OpenCode)**：代碼完成後，由 OpenCode 執行物理編譯（`node --check`）與 Playwright 斷言測試。失敗回報給 Coder Subagent 迭代。**嚴禁未經物理驗證就宣告任務完成。**

---

## 2. grill-with-docs 方案審核模式

### 智慧啟用規則

| 情境 | 行為 |
|---|---|
| 使用者說「計劃」「設計」「架構」「需求」「怎麼做」「grill me」「審核」 | **自動啟用 grill-with-docs 模式**，先提問後執行 |
| 使用者說「直接做」「快速改」「寫 code」「fix bug」「不用問我」 | **嚴禁進入 grill 模式**，直接執行 |
| 使用者明確說「開 grill」或「/grill-with-docs」 | 全力配合，啟動完整審核邏輯 |

### grill-with-docs 工作流程

1. **讀取相關文件**（需求文件、現有代碼、`implementation_plan.md`）
2. **提出 3-5 個釐清問題**（不做假設，問清楚後才動手）
3. **產出計畫書草稿**（架構決策 + 風險評估 + 驗收標準）
4. **等待使用者確認**後才啟動 Coder Subagent

---

## 3. kb-retriever 漸進式知識庫索引

處理巨大知識庫檔案（超過 Context Window）時的標準流程：

1. **索引導航**：先讀取 `data_structure.md` 或 `_INDEX.md`，了解目錄結構，不盲目讀取整份文件。
2. **漸進學習**（Learn-Before-Leap）：最多 5 輪索引，每輪依問題相關性選擇要讀取的子目錄。
3. **節省 Context**：引用時精確標注原始來源（檔名 + 行號），避免重複載入相同內容。
4. **來源出示**：每個引用的知識點必須標注 `來源: [filename#L{n}]`。

---

## 4. TDD 假陰性防禦協議（Anti False-Negative Protocol）

### 冪等性注入硬規範

- ❌ **嚴禁**：`if "function_name" not in file_content:` （子字串比對容易被誤判）
- ✅ **標準**：使用精確正則 `re.search(r'function\s+function_name\s*\(', content)` 或唯一標記注解 `// __INJECTED_FEATURE_TAG_V1__`

### 斷言先行（Test-Driven Assertions）

- `expected_behavior.json` 必須在撰寫任何實作代碼**之前**先產出
- 每一項驗證必須包含 `user_requirement_ref`（可追溯回原始需求）
- Playwright 斷言失敗 = 硬性 failure，計入失敗計數器

### 連續失敗熔斷機制

- `consecutive_bug_failures >= 2`：自動觸發二次審查，**禁止繼續盲目修改**同一個檔案
- 必須重新審查計畫書，或啟動全新乾淨的 Coder Subagent

---

## 5. 子模組索引

| 子模組 | 說明 |
|---|---|
| `agent-skills` | 生產級代碼品質評估、結構性輔助除錯工具 |
| `grill-with-docs` | 互動式詰問審核，架構方案對齊 |
| `kb-retriever` | 本地知識庫漸層索引，節省 Context 消耗 |
| `team-mode` | 依任務難度調配 Pro（高難度架構）/ Flash（檔案檢索）模型的子 Agent |
| `Antigravity × OpenCode 協同` | CLI 任務、Task Board 檔案模板、JSON Hooks 截點 |

---

## 6. 禁止事項（Anti-patterns）

- 禁止球員兼裁判：主力 Agent 不得在同一個對話中既規劃又實作又驗證
- 禁止 Exit Code 0 自證清白：腳本執行成功 ≠ 業務邏輯正確
- 禁止截圖自我驗收：必須使用 Playwright 機械化斷言驗收
- 禁止在連續失敗後繼續盲目修改：超過閾值時停下來重新診斷
