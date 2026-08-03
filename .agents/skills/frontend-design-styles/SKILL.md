---
name: frontend-design-styles
description: Complete reference and execution guide for 50 distinct front-end UI/UX design styles (from rxw2023/Front-end-Design-Styles). Provides color palettes, typography rules, layout parameters, borders, shadows, and code patterns for styles like Neo-Brutalism, Swiss Style, Japanese Editorial, Glassmorphism, Bento Grid, Neumorphism, Cyberpunk, VisionOS Spatial UI, and 42 others.
triggers:
  - frontend-design-styles
  - 50-web-styles
  - design styles
  - 前端設計風格
  - ui style
---

# 🎨 Front-End Design Styles (50 Web Design Styles System)

Use this skill when building web interfaces, landing pages, or components that require strong aesthetic character, consistent design tokens, and distinctive visual styles without generic AI design patterns.

---

## 📐 Core Protocol & Selection Guide

1. **Determine Style**: Identify the requested style from the prompt (or pick the best fit from the 50 styles & 25 anchored recipes below).
2. **Apply 5-Dial Design Read Calibration**:
   - `visual-variance` (1-10): Minimalist structural alignment vs high-variance decorative layout.
   - `motion-intensity` (1-10): Static micro-feedback vs rich timeline physics.
   - `information-density` (1-10): Spacious editorial whitespace vs dense data workstation.
   - `asset-dependence` (1-10): Pure CSS typography vs real product image dependency.
   - `brand-fidelity` (1-10): Greenfield exploratory system vs strict brand guideline preservation.
3. **Enforce Brand Asset Protocol (Asset > Spec)**:
   - Real logo and official product imagery are non-negotiable. Never substitute real brand assets with generic CSS silhouettes or fake AI blue/purple gradients.
4. **Apply Design Tokens**: Use the exact color variables, typography hierarchy, border styles, and shadow tokens specified for that style.
5. **Enforce Structural Constraints**: Maintain strict layout parameters (e.g. 0px border-radius for Swiss/Neo-Brutalism, 22px for VisionOS, 60%+ whitespace for Exaggerated Minimalism).
6. **Implement Interactive Micro-feedbacks**: Apply transition curves and transform offsets matched to the visual aesthetic.

---


## 🏛️ Comprehensive 50 Styles Reference & Key CSS Signatures

### 1. Neo-Brutalism (新粗野主義)
- **Signature CSS**:
  ```css
  border: 3px solid #111;
  box-shadow: 6px 6px 0 #111;
  border-radius: 0px;
  background-image: radial-gradient(#111 1px, transparent 1px);
  background-size: 16px 16px;
  font-family: 'DM Mono', monospace;
  text-transform: uppercase;
  ```
- **Active State**: `transform: translate(2px, 2px); box-shadow: 4px 4px 0 #111;`

### 2. Swiss / International Typographic Style (瑞士/國際主義)
- **Signature CSS**:
  ```css
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  border-radius: 0px;
  --ink: #111111; --paper: #fcfcfc; --muted: #777777; --line: #e5e5e5;
  ```
- **Typography**: 900 weight colossal headers (10:1 scale), strict grid rhythm, zero decorative elements.

### 3. Japanese Editorial (日系編輯美學)
- **Signature CSS**:
  ```css
  background-color: #f1f0ea;
  color: #2c2c2a;
  border: 1px solid #d4d3cc;
  font-family: 'Noto Serif JP', 'Mincho', serif;
  ```
- **Accent**: `background: linear-gradient(transparent 60%, #dfff00 60%);` (fluorescent yellow underline).

### 4. Terminal / CLI Aesthetic (終端/開發者審美)
- **Signature CSS**:
  ```css
  background-color: #0d0f0e;
  color: #c5d0c0;
  font-family: 'DM Mono', monospace;
  border: 1px solid #1f2923;
  ```
- **Accent**: Acid Yellow `#dfff00`, Pulsing Green `#00ff88` status dot (`animation: pulse 2s infinite`).

### 5. Glassmorphism + Retrofuturism (玻璃擬態 + 復古未來)
- **Signature CSS**:
  ```css
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
  ```
- **Overlay**: Scanline overlay with `mix-blend-mode: overlay`.

### 6. Bento Box Grid (便當盒網格)
- **Signature CSS**:
  ```css
  background-color: #f5f5f7;
  border-radius: 18px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  ```
- **Buttons**: Pill-shaped (`border-radius: 9999px`).

### 7. Neumorphism (新擬物化)
- **Signature CSS**:
  ```css
  background-color: #e0e5ec;
  box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
  border-radius: 20px;
  ```
- **Inset (Pressed)**: `box-shadow: inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff;`

### 8. Cyberpunk UI (賽博朋克)
- **Signature CSS**:
  ```css
  background: #0a0a0a;
  border: 1px solid #ff00ff;
  box-shadow: 0 0 10px #ff00ff, inset 0 0 15px rgba(255, 0, 255, 0.2);
  color: #00ff88;
  text-shadow: 0 0 5px #00ff88;
  ```

### 9. Spatial UI / VisionOS (空間計算 UI)
- **Signature CSS**:
  ```css
  background: rgba(30, 40, 60, 0.4);
  backdrop-filter: blur(22px);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  ```

### 10. Aurora UI & Gradient Mesh (極光與漸變網格)
- **Signature CSS**:
  ```css
  background: radial-gradient(at 0% 0%, rgba(13, 148, 136, 0.3) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.3) 0px, transparent 50%),
              #0f172a;
  backdrop-filter: blur(10px);
  ```

*(For styles 11 to 50 including Claymorphism, Y2K, E-Ink Paper, Memphis, HUD Sci-Fi, Dark OLED, etc., apply the dedicated color hexes and structural properties cataloged in the knowledge base).*

---

## 💬 Prompt Trigger Examples

- **Example 1**: *"Build a landing hero section using `frontend-design-styles` with the **Neo-Brutalism** aesthetic."*
- **Example 2**: *"Create a user dashboard layout in **Bento Box Grid 2.0** style."*
- **Example 3**: *"Design a product card using **Liquid Glass** and **Aurora UI** glow effects."*
- **Example 4**: *"Format a reading blog template using **Japanese Editorial** paper tones and serif typography."*
