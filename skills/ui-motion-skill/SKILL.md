---
name: ui-motion-skill
description: |
  前端動畫與微互動開發全套標準。整合 Anime.js 多軸彈簧物理、LottieFiles JSON 動畫資產最佳化、
  React Bits (shadcn CLI) 高品質組件庫。觸發時機：需要實作任何頁面動效、滾動觸發、微互動、
  hover 特效、文字動畫、組件入場動畫。
---

# UI Motion Skill（前端動效開發全套）

本 Skill 確保所有動效實作達到 **Linear / Apple 同等品質**，基於物理彈簧而非線性插值。

---

## 1. 核心動效 Token（所有動效的基準值）

在任何專案中，動效必須先建立 Token 系統，禁止魔法數字：

```css
/* Duration Tokens */
--duration-micro:   100ms;   /* 最細微互動：hover 顏色變化 */
--duration-quick:   200ms;   /* 快速回饋：按鈕點擊、checkbox */
--duration-standard:300ms;   /* 標準轉場：面板展開、選單 */
--duration-emphasis:500ms;   /* 強調動效：頁面進入、Modal */
--duration-elaborate:800ms;  /* 精心設計：hero 動畫、onboarding */

/* Easing Tokens */
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);   /* 自然減速 */
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);   /* 頁面轉場 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* 彈簧超出 */
--ease-micro:  cubic-bezier(0.0, 0.0, 0.2, 1);    /* 微互動 */
```

### 核心原則：
- **出場**：用 `ease-in`（先慢後快，讓元素快速消失）
- **入場**：用 `ease-out`（先快後慢，元素優雅停下）
- **懸浮回饋**：最大 `150ms`，超過則顯得遲鈍
- **所有動效必須使用 GPU 屬性**：`transform`, `opacity`, `filter`（禁止動畫 `width`/`height`/`top`/`left`）

---

## 2. hyperframes@animejs — Anime.js 多軸彈簧物理

### 安裝
```bash
npm install animejs
```

### 標準時間軸（anime.timeline）模板
```javascript
import anime from 'animejs';

// Hero 入場動畫標準結構
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 600
});

tl.add({
  targets: '.hero-title',
  translateY: [40, 0],
  opacity: [0, 1],
  duration: 800
})
.add({
  targets: '.hero-subtitle',
  translateY: [20, 0],
  opacity: [0, 1],
  duration: 600
}, '-=400')  // 400ms 與上一個動畫重疊
.add({
  targets: '.hero-cta',
  scale: [0.8, 1],
  opacity: [0, 1],
  duration: 500,
  easing: 'spring(1, 80, 10, 0)'  // 物理彈簧
}, '-=300');
```

### Stagger 交錯動畫（列表/網格入場）
```javascript
anime({
  targets: '.card-item',
  translateY: [30, 0],
  opacity: [0, 1],
  delay: anime.stagger(80),  // 每個元素間隔 80ms
  easing: 'easeOutQuart',
  duration: 500
});
```

### ScrollTrigger 滾動觸發（搭配 Intersection Observer）
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutCubic'
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

---

## 3. LottieFiles & Text-to-Lottie

### 最佳化原則
- 優先選擇**純路徑 Lottie**（無點陣圖嵌入），確保縮放無損
- 檢查 JSON 大小：> 200KB 需進行路徑簡化優化
- 所有 Lottie 資源必須指定 `renderer: 'svg'`（效能優於 Canvas）

### 標準整合方式
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
<div id="lottie-container"></div>
<script>
const animation = lottie.loadAnimation({
  container: document.getElementById('lottie-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/assets/animation.json'
});
// 控制播放
animation.setSpeed(1.2);        // 加速播放
animation.pause();              // 暫停
animation.goToAndPlay(30, true); // 跳至第 30 幀
</script>
```

### Text-to-Lottie 工作流程
1. 至 [LottieFiles Text-to-Lottie](https://lottiefiles.com/text-to-lottie) 輸入文字
2. 選擇動效風格（Bounce / Float / Glitch…）
3. 下載 `.json` 格式
4. 使用上方標準整合方式嵌入

---

## 4. React Bits Protocol（shadcn CLI 官方下載模式）

React Bits 是基於 shadcn 生態的高品質動效組件庫，**必須使用 CLI 安裝**，禁止手動複製代碼：

### 安裝流程
```bash
# 1. 確認 shadcn 已初始化
npx shadcn@latest init

# 2. 安裝特定組件（範例）
npx shadcn@latest add "https://reactbits.dev/r/split-text"
npx shadcn@latest add "https://reactbits.dev/r/blur-text"
npx shadcn@latest add "https://reactbits.dev/r/magnet-lines"
npx shadcn@latest add "https://reactbits.dev/r/soft-aurora"
npx shadcn@latest add "https://reactbits.dev/r/pixel-trail"
```

### 常用組件速查

| 組件名 | 效果 | 適用場景 |
|---|---|---|
| `SplitText` | 文字逐字入場 | Hero 標題、副標題 |
| `BlurText` | 文字模糊清晰化 | 強調切換、載入完成 |
| `MagnetLines` | 磁吸線條跟隨游標 | 背景裝飾、互動亮點 |
| `SoftAurora` | 柔和極光背景 | Hero 背景、卡片背景 |
| `PixelTrail` | 游標像素軌跡 | 創意互動背景 |
| `CountUp` | 數字滾動計數 | 數據展示、統計頁面 |
| `Marquee` | 無縫跑馬燈 | 品牌標語、合作夥伴 |

---

## 5. Reduced Motion 無障礙規範

**所有動效實作必須包含** `prefers-reduced-motion` 媒體查詢：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. 禁止事項（Anti-patterns）

- 禁止動畫 `width`, `height`, `top`, `left`, `margin`, `padding`（強制 reflow，影響效能）
- 禁止超過 `1000ms` 的非 Elaborate 類動效（使用者會感到卡頓）
- 禁止所有元素同時入場（必須使用 Stagger 交錯）
- 禁止直接複製 React Bits 代碼，必須使用 shadcn CLI 安裝以獲得最新版本
- 禁止在沒有定義 Motion Token 的情況下使用魔法數字（如 `transition: 0.3s`）
