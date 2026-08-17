<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="Antigravity Skill Hub - 5 Master Skills Architectural Blueprint Banner">
</p>

# Antigravity Skill Hub

> **五大核心技能與工程協同體系的互動式展現平台。**
> 
> 這是一個基於 Google Antigravity 框架所建構的展示門戶（Showroom），旨在提供 Prompt 工程師與 UI/UX 開發者一個直觀的互動式藍圖，快速預覽、複製與調試 5 大 Master Skills 的核心規則與視覺風格。

---

## 🚀 專案展示 (Live Portal)

本專案提供高保真互動式儀表板（Prototype Portal），已託管於 GitHub Pages。您可以直接點擊下方連結體驗：

👉 [**Antigravity Skill Hub Live 展示館**](https://tinyu070226-stack.github.io/antigravity-skill-hub/)

*包含 50 種設計風格 Spec 的色票卡展示、前端動效微交互、Editorial Vision Studio 視覺總監流水線、社論級原生向量架構圖，以及場景切換與提示詞複製系統。*

---

## 🛠️ 五大 Master Skills 核心架構

本平台整合並呈現以下五個核心技能模組的原理與實作資源：

### 1. ⚙️ 底層協同與工程門禁全集 (`core-synergy-skill`)
* **核心價值**：定義 Antigravity 與 OpenCode 雙 Agent 協同的架構門禁，節省 60-80% Token。
* **主要機制**：`grill-with-docs` 智慧詢問模型、領域建模 (`domain-modeling`)、TDD 循環測試、以及 Matt Pocock 頂級工程方法論。

### 2. 🎨 視覺美學與反 Slop 全集 (`design-system-skill`)
* **核心價值**：對抗 AI 模板化（Slop）平庸設計，建立精確視覺指標與跨模型藝術指導。
* **主要機制**：50 種經典與現代網頁設計風格、Nutlope Hallmark 20 主題輪替、web-design-engineer 5-dial 決策、以及 **Editorial Vision Studio** 跨模型（GPT Image / Flux / Ideogram）視覺總監決策流水線。

### 3. ⚡ 前端動效與向量動畫全集 (`ui-motion-skill`)
* **核心價值**：引導高品質、具備物理真實感且不生硬的 UI 微動效。
* **主要機制**：Stagger 交錯動畫、基於 `prefers-reduced-motion` 的無障礙動效，以及對齊 Apple/Stripe 等大廠的網頁動效。

### 4. 🎬 簡報大腦裝配流水線 (`presentation-skill`)
* **核心價值**：自動化 16:9 與 A4 比例的 Slidev 與 PPT 簡報排版。
* **主要機制**：三大場景提示詞模板（標準製作、同風格極速換內容、換風格換內容），搭配 Python 物理防跑版字級自動縮放引擎。

### 5. 📊 社論級原生向量圖表全集 (`diagram-design`)
* **核心價值**：生成社論級、零跑版、高對比與純代碼原生向量（SVG）圖表。
* **主要機制**：分區系統架構圖 (Architecture)、時序生命線 (Sequence)、決策迴圈流程圖 (Flowchart) 等多種視覺圖表生成規範。

---

## 📁 專案目錄結構 (Workspace Directory)

```text
├── .agents/                    # Customizations 與協同開發協議規則
│   ├── AGENTS.md               # 專案 Agent 核心協同鐵律（TDD、角色解耦）
│   └── skills/                 # 本地安裝之 Custom Agent Skills
├── skills/                     # ✨ 可安裝的 5 大 Master Skills（標準 SKILL.md 格式）
│   ├── core-synergy-skill/     # 底層協同與工程門禁
│   ├── design-system-skill/    # 視覺美學與 Anti-Slop
│   ├── ui-motion-skill/        # 前端動效開發全套
│   ├── presentation-skill/     # 簡報製作工作流
│   └── diagram-design/         # 社論級向量圖表全集
├── rules/                      # ✨ 跨 Agent 可用的工程規則包
│   └── engineering-guardrails.md  # TDD / 假陰性防禦 / 熔斷機制（Codex 相容）
├── assets/                     # 專案視覺資源 (如 README Hero banner)
│   └── readme/hero.svg
├── docs/                       # 🌐 GitHub Pages 靜態發布目錄
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── skills_data.json
└── README.md                   # 專案主說明文件
```

---

## 💡 如何在您的專案中安裝使用？

將本倉庫的 `skills/` 資料夾複製到您專案的 `.agents/skills/` 目錄下，您的 Antigravity 或 OpenCode Agent 即可隨時使用這 5 大 Master Skills 進行高品質開發！
