---
name: core-synergy-skill
description: 本技能定義 Antigravity 與 OpenCode 雙 Agent 協同架構、多模型分工策略、grill-with-docs 領域模型審核、kb-retriever 本地知識庫漸進式檢索與自動化二方代碼門禁。
---

# core-synergy-skill (底層協同與工程門禁全集)

## 觸發字 (Triggers)
@core-synergy-skill, agent-skills, grill-with-docs, opencode, team-mode, open-code-review, kb-retriever, knowledge, data_structure.md, 查資料, 知識庫

## 子模組核心描述
- agent-skills: 生產級代碼品質評估、重構與輔助除錯工具集
- grill-with-docs: 領域模型詰問與架構意圖對齊程序 (關鍵字: 「計劃」、「設計」、「架構」、「grill me」)
- kb-retriever: 本地知識庫分層索引 (data_structure.md) 漸進檢索 (5輪上限、低 Context 消耗、來源出處標註)
- Antigravity × OpenCode 協同模式: CLI 直連、Task Board 檔案看板、JSON Hooks 攔截、open-code-review 門禁
- team-mode: 依任務難度調度 Pro (高難度架構) 與 Flash (檔案檢索) 模型子 Agent
- OpenCode 多模型戰隊分工 Protocol: 美學與前端首選 Claude 3.7/3.5、邏輯與除錯首選 o3-mini/o1、長文與批量重構首選 Qwen-3-Coder/DeepSeek-R1
- Matt Pocock 頂級工程套件: /grill-with-docs 需求詰問與 ADR 架構決策、domain-modeling 專案術語字典 (CONTEXT.md)、tdd 測試驅動開發與 diagnosing-bugs 科學除錯。


## 核心設計與工程原則 (Principles)
### 原則 1：雙主 Agent (Antigravity × OpenCode) 與多 LLM 戰隊分工原理
Antigravity 作為「主 Agent」，為內嵌的各個 LLM 派發工作。具體由 Gemini (Pro/Flash) 負責系統架構規劃與邏輯測試；Claude 專責 UI/UX 與美感建立（且 Claude 僅在「初次建立視覺」時啟用一次，後續微調與修復一律禁用以保護配額）。在需要時（如遇到問題或驗證代碼），Antigravity 會自主呼叫 OpenCode 進行「雙主 Agent 協同」。OpenCode 同樣能調度 LLM 作為子 Agent，當執行特定任務（如搜尋 20 個檔案並修改）時，OpenCode 會開啟全新的獨立 Subagent 上下文視窗處理，大幅降低整個專案開發過程中的總 Token 消耗！

### 原則 2：工作流程：grill-with-docs 領域模型與架構對齊機制
當輸入包含「架構」、「規劃」、「設計」等意圖關鍵字時，系統自動啟動需求對齊程序。透過結構化問答釐清領域模型 (Domain Modeling) 與系統邊界，確定無誤後生成 `.antigravity/tasks/task-xxx.md` 任務看板檔，再交由 OpenCode 進行非互動式執行與驗證。

### 原則 3：📚 kb-retriever 本地知識庫分層索引與低 Context 漸進檢索機制
kb-retriever 是高效探索本機知識庫（如 `knowledge/` 或指定文檔目錄）的探針演算法，解決巨型文檔擠爆 Context Window 的痛點：
1. 分层索引導航 (data_structure.md Tree)：從根目錄與子目錄的 `data_structure.md` 索引檔開始閱讀，先了解領域地圖與目錄用途，不盲目讀取整份檔案。
2. 先學習再處理原則 (Learn-Before-Process)：遇到 PDF/Excel 等二進位文檔時，強制先讀取解構指南（pdftotext, pdfplumber, pandas），將結構化提取完成後才進行文字檢索。
3. 5 輪上限漸進搜尋 (5-Round Bounded Search)：結合 `grep` 關鍵字搜尋與局部視窗讀取 (Windowed Read)，最多 5 輪收斂候選集合，回答時強制附帶檔案相對路徑與段落出處標註 (Source Attribution)。


