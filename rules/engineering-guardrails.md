# Engineering Guardrails（工程門禁鐵律）

本文件提煉自 `AGENTS.md` 的三大核心鐵律，可直接附加至任何 Agent 的系統指令或 `AGENTS.md` 中使用。
適用於：Antigravity、Codex CLI、Claude Projects、任何支援 AGENTS.md 的 Agent 環境。

---

## 鐵律 1：嚴禁子字串比對進行存在性檢查

```python
# ❌ 嚴禁這樣寫（容易被 onclick="", 註解, 其他字串誤判）
if "function_name" not in file_content:
    inject_function()

# ✅ 標準寫法：使用精確正則
import re
if not re.search(r'function\s+function_name\s*\(', content):
    inject_function()

# ✅ 或使用唯一冪等性標記
if "// __INJECTED_FEATURE_TAG_V1__" not in content:
    inject_function()
```

**原因**：子字串比對會產生假陰性（False Negative）。`function_name` 可能出現在變數名、字串、HTML 屬性中，導致邏輯錯誤但不報錯（Exit Code 0 假裝成功）。

---

## 鐵律 2：Exit Code 0 ≠ 業務邏輯正確

腳本成功執行（Exit Code 0）只代表語法沒有崩潰，**不代表業務邏輯正確**。

**必須使用機械化驗證**：
```json
{
  "assertion_id": "test_feature_xyz",
  "user_requirement_ref": "對應使用者需求：點擊按鈕後應切換面板內容",
  "target_selector": "#btn-switch-panel",
  "trigger_event": "click",
  "expected_dom_property": "innerText",
  "expected_contain_text": "面板 B 的內容"
}
```

**任何以下情況均視為硬性 Failure**：
- Playwright 斷言失敗
- Console 噴出 `Uncaught ReferenceError` / `TypeError`
- 業務邏輯行為不符合 `expected_behavior.json` 的描述

---

## 鐵律 3：連續 Bug 失敗熔斷機制

- **計數器觸發條件**：使用者回報 Bug / Playwright 斷言失敗 / Console 未捕獲異常 → `consecutive_bug_failures + 1`
- **熔斷閾值**：`consecutive_bug_failures >= 2`
- **熔斷後的強制行為**：
  1. **停止**繼續修改同一個檔案
  2. 重新閱讀計畫書與原始需求
  3. 啟動**乾淨的新子 Agent**（沒有被污染的對話歷史）
  4. 由新子 Agent 基於「最新代碼現狀」重新診斷並提出修復方案

**禁止行為**：在連續失敗後繼續「再試一次」同樣的修改手法。

---

## 使用方式

### 在 Codex CLI 中
將本文件內容複製至專案根目錄的 `AGENTS.md`，或 `import` 引用本文件路徑。

### 在 Antigravity 中
將本文件放在 `.agents/rules/` 目錄下，Antigravity 會自動加載。

### 在 Claude Projects 中
將本文件內容貼入 Project Instructions 的 Custom Instructions 欄位。
