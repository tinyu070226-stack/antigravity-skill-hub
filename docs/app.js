
window.showToast = function(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  if (window.toastTimer) clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
};

window.copyText = function(text, triggerName, btnElement) {
  if (!text) return;
  const isEn = window.currentLang === 'en';

  const doCopy = () => {
    let toastMsg = '';
    if (triggerName === 'Master Prompt') {
      toastMsg = isEn ? '📋 Master Prompt Copied' : '📋 提示詞範例複製成功';
    } else if (triggerName === 'CSS') {
      toastMsg = isEn ? '📋 CSS Style Copied' : '📋 CSS 樣式複製成功';
    } else {
      toastMsg = isEn ? `📋 Copied: "${triggerName}"` : `📋 已複製觸發詞：「${triggerName}」`;
    }
    
    if (window.showToast) window.showToast(toastMsg);

    // Micro animation
    if (btnElement) {
      const origHtml = btnElement.innerHTML;
      btnElement.style.transition = 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      btnElement.style.transform = 'scale(0.85)';
      
      setTimeout(() => {
        btnElement.style.transform = 'scale(1.15)';
        btnElement.innerHTML = '<span style="color:#10b981; display:inline-block;">✅</span>';
        
        setTimeout(() => {
          btnElement.style.transform = 'scale(1)';
          setTimeout(() => {
            btnElement.innerHTML = origHtml;
            btnElement.style.transform = '';
            btnElement.style.transition = '';
          }, 800);
        }, 200);
      }, 100);
    }
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(doCopy).catch(() => {
      fallbackCopy(text);
      doCopy();
    });
  } else {
    fallbackCopy(text);
    doCopy();
  }
};

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
}

document.addEventListener('DOMContentLoaded', async () => {
  const homeView = document.getElementById('home-view');
  const detailView = document.getElementById('detail-view');
  const backBtn = document.getElementById('back-btn');
  const langBtn = document.getElementById('lang-btn');
  const logoHome = document.getElementById('logo-home');
  const detailTitle = document.getElementById('detail-title');
  const detailDesc = document.getElementById('detail-desc');
  const detailPrinciples = document.getElementById('detail-principles');
  const detailGrid = document.getElementById('detail-grid');
  const detailSearch = document.getElementById('detail-search');
  const toast = document.getElementById('toast');

  let skillsData = null;

  // 1. LANGUAGE PERSISTENCE VIA LOCALSTORAGE
  const savedLang = localStorage.getItem('agy_skill_hub_lang');
  let currentLang = savedLang ? savedLang : 'en';

  // Update toggle button text according to current language
  langBtn.innerHTML = currentLang === 'zh' ? '🌐 Switch to English' : '🌐 切換至 繁體中文';

  try {
    const res = await fetch('skills_data.json?v=1.1.4');
    skillsData = await res.json();
    updateStaticText();
    handleRoute(false); // Do not scroll to top on initial page load
  } catch (err) {
    console.error('Failed to load skills_data.json', err);
  }

  // Helper to strip any remaining CJK characters from English text
  function cleanEnglishText(text) {
    if (!text) return '';
    const cleaned = text.replace(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g, '').trim();
    return cleaned.replace(/^,|,$/g, '').trim();
  }

  // 2. LANGUAGE SWITCHER WITH SCROLL POSITION PRESERVATION
  langBtn.addEventListener('click', () => {
    const currentScrollY = window.scrollY; // Preserve scroll Y position
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('agy_skill_hub_lang', currentLang); // Save to LocalStorage

    langBtn.innerHTML = currentLang === 'zh' ? '🌐 Switch to English' : '🌐 切換至 繁體中文';
    updateStaticText();
    handleRoute(false); // Re-render route without auto-scrolling to top

    // Restore exact scroll position
    window.scrollTo({ top: currentScrollY, behavior: 'instant' });
  });

  function updateStaticText() {
    if (currentLang === 'en') {
      backBtn.textContent = '← Back to Home';
      detailSearch.placeholder = 'Search styles, HEX swatches, or triggers inside current skill...';
      
      const homeTitle = document.querySelector('.home-hero-title');
      const homeDesc = document.querySelector('.home-hero-desc');
      if (homeTitle) homeTitle.textContent = 'Antigravity Skill Hub Architecture';
      if (homeDesc) homeDesc.textContent = 'Click any skill card to explore interactive principles, 70+ design styles, HEX swatches, and trigger keys.';

      const masterCards = document.querySelectorAll('.master-card');
      if (masterCards.length >= 4) {
        masterCards[0].querySelector('.master-card-desc').textContent = 'Core synergy & engineering gate suite. Includes Antigravity × OpenCode dual-agent architecture diagrams, grill-with-docs alignment, and open-code-review.';
        masterCards[0].querySelector('.count-tag').textContent = 'Diagrams + 5 Core Sub-modules';
        masterCards[0].querySelector('.enter-btn').textContent = 'View Architecture & Details →';

        masterCards[1].querySelector('.master-card-desc').textContent = 'Design system & anti-slop suite. Includes 50 web design styles (Live CSS/Swatches), Hallmark 20 themes (8-state validation), and anti-slop rules.';
        masterCards[1].querySelector('.count-tag').textContent = 'Anti-Slop + 70+ Style Showcase';
        masterCards[1].querySelector('.enter-btn').textContent = 'Enter Style Gallery →';

        masterCards[2].querySelector('.master-card-desc').textContent = 'UI Motion & Micro-interactions suite. Integrates Anime.js timeline engineering, LottieFiles vector animations, Text-to-Lottie, and React Bits (shadcn CLI).';
        masterCards[2].querySelector('.count-tag').textContent = '4 Motion Engine Libraries';
        masterCards[2].querySelector('.enter-btn').textContent = 'View Motion Specs →';

        masterCards[3].querySelector('.master-card-desc').textContent = 'Presentation visual specs & Slidev suite. Includes 10 custom 16:9 presentation specs (Neon Collage, Apple Mockup, Kinfolk, Swiss) and Felo/Slidev exporter.';
        masterCards[3].querySelector('.count-tag').textContent = '10 Presentation Specs';
        masterCards[3].querySelector('.enter-btn').textContent = 'Enter Presentation Gallery →';
      }
    } else {
      backBtn.textContent = '← 返回主頁 (Home)';
      detailSearch.placeholder = '在目前技能內部搜尋風格、HEX 色票或觸發詞...';

      const homeTitle = document.querySelector('.home-hero-title');
      const homeDesc = document.querySelector('.home-hero-desc');
      if (homeTitle) homeTitle.textContent = 'Antigravity 4 大整合技能集展覽館';
      if (homeDesc) homeDesc.textContent = '點擊下方大卡片進入個別技能的內部運作圖文原理、70+ 種風格 live 展演、色票卡與觸發清單。';

      const masterCards = document.querySelectorAll ? document.querySelectorAll('.master-card') : [];
      if (masterCards.length >= 4) {
        masterCards[0].querySelector('.master-card-desc').textContent = '底層協同與工程門禁引擎。包含雙主 Agent (Antigravity × OpenCode) 運作圖解、grill-with-docs 詰問對齊流程與 open-code-review 門禁。';
        masterCards[0].querySelector('.count-tag').textContent = '運作圖解 + 5個核心子模組';
        masterCards[0].querySelector('.enter-btn').textContent = '檢視運作原理與細節 →';

        masterCards[1].querySelector('.master-card-desc').textContent = '視覺美學與反 Slop 全集。包含 50 種網頁設計風格 (Live CSS 預覽/色票)、Hallmark 20 主題 (8-State組件驗證) 與雙重防禦原理圖解。';
        masterCards[1].querySelector('.count-tag').textContent = '防禦圖解 + 70+ 風格展演';
        masterCards[1].querySelector('.enter-btn').textContent = '進入風格展演館 →';

        masterCards[2].querySelector('.master-card-desc').textContent = '前端動效與向量動畫全集。整合 Anime.js 時間軸彈簧物理、LottieFiles 向量動效、Text-to-Lottie 生成與 React Bits (shadcn CLI) 組件庫規範。';
        masterCards[2].querySelector('.count-tag').textContent = '4 大動效與元件庫';
        masterCards[2].querySelector('.enter-btn').textContent = '檢視動效規範 →';

        masterCards[3].querySelector('.master-card-desc').textContent = '簡報視覺與 Slidev 導出器。包含 10 大客製化簡報視覺 Specs (霓虹拼貼, Apple Mockup, Kinfolk 雜誌風, 瑞士商業風等) 與 Felo / Slidev 導出器。';
        masterCards[3].querySelector('.count-tag').textContent = '10 大簡報 Specs';
        masterCards[3].querySelector('.enter-btn').textContent = '進入簡報展演館 →';
      }
    }
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
    showToast(toastMsg);
  };

  window.openDetail = (masterId, pushHistory = true) => {
    if (pushHistory) {
      window.location.hash = masterId;
    }
    renderRoute(masterId, true);
  };

  function goHome(pushHistory = true) {
    if (pushHistory) {
      window.location.hash = '';
    }
    renderHome();
  }

  function handleRoute(shouldScrollTop = true) {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['core-synergy-skill', 'design-system-skill', 'ui-motion-skill', 'presentation-skill'].includes(hash)) {
      renderRoute(hash, shouldScrollTop);
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', () => handleRoute(true));

  backBtn.addEventListener('click', () => goHome(true));
  logoHome.addEventListener('click', () => goHome(true));

  detailSearch.addEventListener('input', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) renderRoute(hash, false);
  });

  function renderHome() {
    homeView.style.display = 'block';
    detailView.style.display = 'none';
    backBtn.style.display = 'none';
    detailSearch.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderRoute(masterId, shouldScrollTop = true) {
    homeView.style.display = 'none';
    detailView.style.display = 'block';
    backBtn.style.display = 'flex';
    detailGrid.innerHTML = '';
    if (detailPrinciples) detailPrinciples.innerHTML = '';
    const query = detailSearch.value.toLowerCase().trim();

    if (shouldScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const masterInfo = skillsData.master_skills.find(m => m.id === masterId);
    if (!masterInfo) return;

    const rawTitle = currentLang === 'zh' ? (masterInfo.title_zh || masterInfo.title) : (masterInfo.title_en || masterInfo.title);
    const rawDesc = currentLang === 'zh' ? (masterInfo.description_zh || masterInfo.description) : (masterInfo.description_en || masterInfo.description);

    detailTitle.textContent = currentLang === 'en' ? cleanEnglishText(rawTitle) : rawTitle;
    detailDesc.textContent = currentLang === 'en' ? cleanEnglishText(rawDesc) : rawDesc;

    if (masterInfo.principles && masterInfo.principles.length > 0 && detailPrinciples) {
      masterInfo.principles.forEach(p => {
        const pBox = document.createElement('div');
        pBox.style.cssText = 'background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:28px; margin-bottom:28px; box-shadow:0 1px 3px rgba(15,23,42,0.04); text-align:left;';
        
        const rawPTitle = currentLang === 'zh' ? (p.title_zh || p.title) : (p.title_en || p.title);
        const rawPDesc = currentLang === 'zh' ? (p.desc_zh || p.desc) : (p.desc_en || p.desc);
        const pImg = currentLang === 'zh' ? (p.img_url_zh || p.img_url) : (p.img_url_en || p.img_url);

        const pTitle = currentLang === 'en' ? cleanEnglishText(rawPTitle) : rawPTitle;
        const pDesc = currentLang === 'en' ? cleanEnglishText(rawPDesc) : rawPDesc;

        let mediaHtml = '';
        if (pImg) {
          mediaHtml = `<div style="margin-top:16px; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;"><img src="${pImg}" alt="${pTitle}" style="width:100%; height:auto; display:block;" /></div>`;
        }

        // Render the copyable grey box for actual Master Prompt template cards
        const isMasterPromptCard = masterId === 'presentation-skill' && (
          pTitle.includes('Master Prompt') || 
          pTitle.includes('提示詞範例') || 
          pTitle.includes('Prompt') || 
          pTitle.includes('提示詞') ||
          pTitle.includes('Standard Master Prompt')
        );

        if (isMasterPromptCard) {
          const tooltipLabel = currentLang === 'en' ? 'Copy Master Prompt' : '複製 Master Prompt 提示詞';
          const introLabel = currentLang === 'en' ? 'In presentation tasks, click the top-right icon to copy the full prompt:' : '請點擊下方 3 個選單按鈕切換不同情境的提示詞範例，點擊右上角圖示即可複製完整提示詞：';

          pBox.innerHTML = `
            <div style="margin-bottom:12px; text-align:left;">
              <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin-bottom:6px; text-align:left;">${pTitle}</h3>
              <p style="font-size:13px; color:#475569; text-align:left; margin:0 0 12px 0;">${introLabel}</p>
              
              <!-- 3-Scenario Interactive Tab Switcher -->
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #e2e8f0;">
                <button type="button" id="btn-tab-standard" onclick="window.doSwitchScenario('standard', event)" style="padding:6px 14px; font-size:12px; font-weight:700; border-radius:8px; background:#0f172a; color:#ffffff; border:none; cursor:pointer; shadow:0 1px 2px rgba(0,0,0,0.1);">
                  📌 標準全新簡報製作 (預設)
                </button>
                <button type="button" id="btn-tab-same_style_new_content" onclick="window.doSwitchScenario('same_style_new_content', event)" style="padding:6px 14px; font-size:12px; font-weight:700; border-radius:8px; background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; cursor:pointer;">
                  🔄 同風格換內容 (極速 0-Token 模式)
                </button>
                <button type="button" id="btn-tab-diff_style_new_content" onclick="window.doSwitchScenario('diff_style_new_content', event)" style="padding:6px 14px; font-size:12px; font-weight:700; border-radius:8px; background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; cursor:pointer;">
                  🎨 換風格換內容 (樣式分流模式)
                </button>
              </div>
            </div>

            <!-- Classic Inner Prompt Box with Classic Floating Top-Right Copy Button -->
            <div style="position:relative; background:#f8fafc; color:#0f172a; border:1px solid #cbd5e1; border-radius:14px; padding:18px 68px 14px 20px; font-family:'Inter', -apple-system, BlinkMacSystemFont, sans-serif; text-align:left; display:block; margin-top:12px;">
              <button id="master-prompt-copy-btn-classic" title="${tooltipLabel}" type="button" onclick="window.doCopyPrompt(event)" style="position:absolute; top:14px; right:14px; background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; width:36px; height:36px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.06); transition:all 0.2s; font-size:16px; line-height:1; z-index:10;">
                📋
              </button>
              <div id="master-prompt-card-body">
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料，採取並嚴格遵守("(......簡報風格)")的規則和風格，製作 16:9 /(或)A4 Slidev， HTML /(或)可編輯的 ppt 簡報。</p>
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">請先不要直接執行簡報的製作，而是先寫出「簡報規劃的計畫書」，計畫書中要寫出：總共會有幾頁、每一頁的「大標題」內容、「小標題」內容、大致的內文要寫什麼、需不需要使用 ai 圖片生成，或是可以去網路上搜尋下載圖片。</p>
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">【6個紅線 (嚴格遵守)】</p>
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">1. 簡報請完整呈現「(某某檔案)」的完整內容。撰寫內容時請不要克制，頁數不用省、內文也可以寫多一點。並且不要有曲解、誇大其辭、用詞太過激昂的情況。</p>
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">2. 圖片請不要調整原有的圖片比例，只允許對圖片進行「裁切」、「縮小」、「放大」。</p>
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">3. 無論是大標題小標題或內文、圖片，請都不要與其他文字或圖片有重疊，也不要有貼到畫面過於邊緣的地方(但若圖片是打算沒有空白縫隙的貼緊邊緣，則沒有此限制)。</p>
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">4. 保證網路搜尋或自行生成的圖片絕對都要與當前簡報頁面的內容直接高度相關，嚴禁使用抽象隱喻、幾何符號或高深意象圖，必須選用一眼就能直觀看懂、與簡報內文精準對應的具體實物或情境圖片。</p>
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">5. 保證網路搜尋或生成的圖片絕對都要符合當前選擇的整體簡報風格，嚴禁出現與整體簡報風格相比顯得突兀或視覺風格斷層的圖片。</p>
                <p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a;">6. 簡報的每一頁都必須同時包含「圖片」與「文字」（圖文並茂），且每一頁的視覺佈局與結構必須變化多元，嚴禁連續多頁重複使用完全相同的範本或視覺排版結構。</p>
              </div>
            </div>
          `;
        }

        detailPrinciples.appendChild(pBox);
      });
    }

    if (masterId === 'core-synergy-skill') {
      const rawSubList = currentLang === 'en' ? (masterInfo.sub_modules_en || masterInfo.sub_modules) : (masterInfo.sub_modules_zh || masterInfo.sub_modules);
      const subList = currentLang === 'en' ? rawSubList.map(sm => cleanEnglishText(sm)) : rawSubList;

      subList.forEach((sm, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        const icons = ['⚙️', '🍖', '🔄', '🤖'];
        const copyBtnText = currentLang === 'en' ? 'Copy Trigger' : '複製觸發詞';
        card.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <span style="font-size:22px;">${icons[idx % icons.length]}</span>
            <h3 class="card-title" style="margin:0;">${sm.split(':')[0]}</h3>
          </div>
          <p class="card-desc">${sm.split(':')[1] || ''}</p>
          <div class="trigger-group">
            <span class="trigger-text">@core-synergy-skill</span>
            <button class="copy-btn" onclick="copyText('@core-synergy-skill', '${copyBtnText}', this)">${copyBtnText}</button>
          </div>
        `;
        detailGrid.appendChild(card);
      });
    } else if (masterId === 'design-system-skill') {
      skillsData.web_styles_50.forEach(item => {
        if (matchesQuery(item, query)) {
          detailGrid.appendChild(createRichStyleMockupCard(item));
        }
      });
      skillsData.hallmark_themes_20.forEach(item => {
        if (matchesQuery(item, query)) {
          detailGrid.appendChild(createHallmarkOptionCCard(item));
        }
      });
    } else if (masterId === 'ui-motion-skill') {
      detailGrid.appendChild(createAnimeJsDemoCard());
      detailGrid.appendChild(createLottieDemoCard());
      detailGrid.appendChild(createReactBitsDemoCard());
    } else if (masterId === 'presentation-skill') {
      skillsData.presentation_specs_10.forEach(item => {
        if (matchesQuery(item, query)) {
          detailGrid.appendChild(createPresentation16x9SlideCard(item));
        }
      });
    }
  }

  function matchesQuery(item, query) {
    if (!query) return true;
    const nameStr = (item.name_en || item.name_zh || item.name || '').toLowerCase();
    const rawTrig = (currentLang === 'en' ? item.triggers_en : item.triggers_zh) || item.triggers || '';
    const trigStr = currentLang === 'en' ? cleanEnglishText(rawTrig) : rawTrig;
    const descStr = (currentLang === 'en' ? item.desc_en : item.desc_zh) || item.desc || '';
    return nameStr.includes(query) || trigStr.toLowerCase().includes(query) || descStr.toLowerCase().includes(query);
  }

  function createRichStyleMockupCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    const rawTrig = (currentLang === 'en' ? item.triggers_en : item.triggers_zh) || item.triggers || '';
    const trigStr = currentLang === 'en' ? cleanEnglishText(rawTrig) : rawTrig;
    const mainTrig = trigStr.split(',')[0].trim();
    const [c1, c2, c3] = item.hex || ['#ffffff', '#000000', '#0284c7'];
    const rawName = currentLang === 'en' ? (item.name_en || item.name_zh) : (item.name_zh || item.name);
    const rawDesc = currentLang === 'en' ? (item.desc_en || item.desc_zh) : (item.desc_zh || item.desc);
    
    const nameStr = currentLang === 'en' ? cleanEnglishText(rawName) : rawName;
    const descStr = currentLang === 'en' ? cleanEnglishText(rawDesc) : rawDesc;

    const copyBtnText = currentLang === 'en' ? 'Copy Trigger' : '複製觸發詞';
    const subtextStr = currentLang === 'en' ? 'High-Fidelity Component Mockup · All 3 Colorways Rendered' : '高保真美學組件範例 · 湊齊全 3 色票主副色系與對應裝飾';
    const colorwayLabel = currentLang === 'en' ? '3 Colorways Palette:' : '三色全齊展示:';

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">🎨 ${nameStr}</h3>
        <span style="font-size:10px; background:#e0f2fe; color:#0284c7; padding:2px 6px; border-radius:4px; font-weight:600;">50 Styles</span>
      </div>
      <p class="card-desc">${descStr}</p>
      
      <div style="${item.css} padding: 18px 20px; border-radius: 12px; margin-bottom: 14px; min-height: 140px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;" onclick="copyText('${item.css}', 'CSS', this)" title="Click to copy CSS style">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="background: ${c3 || c2}; color: ${c1}; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
            ${nameStr.split(' ')[0]} SPEC
          </span>
          <span style="width: 8px; height: 8px; border-radius: 50%; background: ${c2}; display: inline-block;"></span>
        </div>

        <div style="margin: 12px 0;">
          <div style="font-size: 16px; font-weight: 800; line-height: 1.25; margin-bottom: 4px; color: inherit;">
            ${nameStr.split(' ')[0]} Master Title
          </div>
          <div style="font-size: 11.5px; opacity: 0.85; line-height: 1.4;">
            ${subtextStr}
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; padding-top: 8px;">
          <span style="font-size: 10.5px; font-weight: 600; opacity: 0.9;">${colorwayLabel}</span>
          <div style="display:flex; gap: 6px;">
            <div style="background:${c1}; width:16px; height:16px; border-radius:50%; border:1px solid rgba(0,0,0,0.2);" title="Color 1: ${c1}"></div>
            <div style="background:${c2}; width:16px; height:16px; border-radius:50%; border:1px solid rgba(0,0,0,0.2);" title="Color 2: ${c2}"></div>
            <div style="background:${c3 || c2}; width:16px; height:16px; border-radius:50%; border:1px solid rgba(0,0,0,0.2);" title="Color 3: ${c3 || c2}"></div>
          </div>
        </div>
      </div>

      <div class="trigger-group">
        <span class="trigger-text">${trigStr}</span>
        <button class="copy-btn" onclick="copyText('${mainTrig}', '${copyBtnText}', this)">${copyBtnText}</button>
      </div>

      <div class="swatches" style="margin-top:10px;">
        ${item.hex.map(h => `<div class="swatch" style="background: ${h};" title="Click to copy HEX: ${h}" onclick="copyText('${h}', 'HEX Swatch', this)"></div>`).join('')}
      </div>
    `;
    return card;
  }

  function createHallmarkOptionCCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    const cssStyle = item.css || 'background:#f8fafc; color:#0f172a; border:1px solid #e2e8f0;';
    const fontName = item.font || 'Inter';

    const rawName = currentLang === 'en' ? (item.name_en || item.name_zh) : (item.name_zh || item.name);
    const rawDesc = currentLang === 'en' ? (item.desc_en || item.desc_zh) : (item.desc_zh || item.desc);
    
    const nameStr = currentLang === 'en' ? cleanEnglishText(rawName) : rawName;
    const descStr = currentLang === 'en' ? cleanEnglishText(rawDesc) : rawDesc;

    const fontLabel = currentLang === 'en' ? 'Font Pairing:' : '字體配對:';
    const matrixTitle = currentLang === 'en' ? '⚡ Hallmark 8-State Anti-Slop Validation Matrix:' : '⚡ Hallmark 8-State 反 Slop 互動驗證矩陣:';
    const clickTestText = currentLang === 'en' ? '(Click to test)' : '(點擊測試狀態)';
    const copyBtnText = currentLang === 'en' ? 'Copy Trigger' : '複製觸發詞';
    const subtextStr = currentLang === 'en' ? `Unique Theme Visual Mockup · Font (${fontName})` : `獨特視覺氣質 UI 範例 · 字體配對 (${fontName})`;
    
    // FIX HALLMARK TRIGGERS LAYOUT BUG IN CHINESE MODE
    const rawTrig = (currentLang === 'en' ? item.triggers_en : item.triggers_zh) || item.triggers || `hallmark, ${item.name_zh || item.name_en}`;
    const trigStr = currentLang === 'en' ? cleanEnglishText(rawTrig) : rawTrig;
    const mainTrig = trigStr.split(',')[0].trim();

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">💎 ${nameStr}</h3>
        <span style="font-size:10px; background:#ccfbf1; color:#0f766e; padding:2px 6px; border-radius:4px; font-weight:600;">Hallmark 20</span>
      </div>
      <p class="card-desc">${descStr}</p>
      
      <div style="${cssStyle} padding: 16px; border-radius: 12px; margin-bottom: 14px; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size: 10px; font-weight: 700; opacity: 0.8; text-transform: uppercase;">HALLMARK THEME MOCKUP</span>
          <span style="font-size: 10px; font-family: monospace; opacity: 0.8;">${fontName.split('/')[0]}</span>
        </div>
        
        <div style="margin: 10px 0;">
          <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">
            ${nameStr.split(' ')[0]} Signature
          </div>
          <div style="font-size: 11.5px; opacity: 0.85; line-height: 1.4;">
            ${subtextStr}
          </div>
        </div>
      </div>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-bottom:14px;">
        <div style="font-size:11px; font-weight:700; color:#475569; margin-bottom:8px; display:flex; justify-content:space-between;">
          <span>${matrixTitle}</span>
          <span style="color:#0f766e;">${clickTestText}</span>
        </div>

        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #cbd5e1; background:#ffffff; cursor:pointer;" onclick="showToast('State: Default')">Default</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #0284c7; background:#e0f2fe; color:#0284c7; cursor:pointer;" onclick="showToast('State: Hover')">Hover</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #0369a1; background:#0284c7; color:#fff; cursor:pointer;" onclick="showToast('State: Active')">Active</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:2px solid #0f172a; background:#ffffff; cursor:pointer;" onclick="showToast('State: Focus')">Focus</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #e2e8f0; background:#f1f5f9; color:#94a3b8; cursor:pointer;" onclick="showToast('State: Loading...')">Loading...</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #059669; background:#dcfce7; color:#15803d; cursor:pointer;" onclick="showToast('State: Success')">Success</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #dc2626; background:#fee2e2; color:#b91c1c; cursor:pointer;" onclick="showToast('State: Error')">Error</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #cbd5e1; background:#f1f5f9; color:#cbd5e1; cursor:not-allowed;" disabled>Disabled</button>
        </div>
      </div>

      <div style="font-size:11.5px; color:#64748b; margin-bottom:8px;">${fontLabel} <code style="font-family:monospace; background:#f1f5f9; padding:2px 6px; border-radius:4px;">${fontName}</code></div>
      <div class="trigger-group">
        <span class="trigger-text">${trigStr}</span>
        <button class="copy-btn" onclick="copyText('${mainTrig}', '${copyBtnText}', this)">${copyBtnText}</button>
      </div>
    `;
    return card;
  }

  function createAnimeJsDemoCard() {
    const card = document.createElement('div');
    card.className = 'card';
    const titleStr = currentLang === 'en' ? '⚡ Anime.js Timeline & Spring Physics' : '⚡ Anime.js 時間軸與彈簧物理動效';
    const descStr = currentLang === 'en' ? 'Staggered grid physics, spring easing, and GPU-accelerated transform timeline engineering.' : 'Stagger 交錯陣列物理彈簧緩動、時間軸控制與 GPU Transform 加速優化範例。';
    const btnText = currentLang === 'en' ? '▶ Trigger Stagger Spring Physics' : '▶ 觸發交錯物理彈簧動畫';

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">${titleStr}</h3>
        <span style="font-size:10px; background:#ccfbf1; color:#0f766e; padding:2px 6px; border-radius:4px; font-weight:600;">Anime.js Engine</span>
      </div>
      <p class="card-desc">${descStr}</p>
      
      <div style="background:#0f172a; border-radius:12px; padding:16px; margin-bottom:14px; text-align:center;">
        <div id="stagger-grid-demo" style="display:grid; grid-template-columns:repeat(5, 1fr); gap:8px; width:180px; margin:0 auto 12px;">
          ${Array(15).fill(0).map((_, i) => `<div class="stagger-dot" style="width:24px; height:24px; background:#38bdf8; border-radius:6px; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease;"></div>`).join('')}
        </div>
        <button id="trigger-anime-btn" style="background:#0284c7; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; transition:all 0.2s ease;">${btnText}</button>
      </div>

      <div class="trigger-group">
        <span class="trigger-text">hyperframes@animejs</span>
        <button class="copy-btn" onclick="copyText('hyperframes@animejs', 'Trigger', this)">${currentLang === 'en' ? 'Copy Trigger' : '複製觸發詞'}</button>
      </div>
    `;

    setTimeout(() => {
      const btn = card.querySelector('#trigger-anime-btn');
      const dots = card.querySelectorAll('.stagger-dot');
      if (btn && dots) {
        btn.addEventListener('click', () => {
          dots.forEach((dot, idx) => {
            setTimeout(() => {
              dot.style.transform = 'scale(1.4) translateY(-8px)';
              dot.style.background = '#e11d48';
              setTimeout(() => {
                dot.style.transform = 'scale(1) translateY(0)';
                dot.style.background = '#38bdf8';
              }, 400);
            }, idx * 45);
          });
        });
      }
    }, 100);

    return card;
  }

  function createLottieDemoCard() {
    const card = document.createElement('div');
    card.className = 'card';
    const titleStr = currentLang === 'en' ? '🎬 LottieFiles & Text-to-Lottie Vectors' : '🎬 LottieFiles 向量動效與 Text-to-Lottie 生成';
    const descStr = currentLang === 'en' ? 'Pure vector JSON dynamic rendering, point path optimization, and interactive state playback.' : '純向量 JSON 動態繪製點位優化、輕量級效能與即時動態播控範例。';
    const btnText = currentLang === 'en' ? '⏸ Pause / Play Vector Pulse' : '⏸ 暫停 / 播放向量脈動';

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">${titleStr}</h3>
        <span style="font-size:10px; background:#f3e8ff; color:#7c3aed; padding:2px 6px; border-radius:4px; font-weight:600;">Vector Lottie</span>
      </div>
      <p class="card-desc">${descStr}</p>
      
      <div style="background:#090d16; border-radius:12px; padding:18px; margin-bottom:14px; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <div id="lottie-spinner" style="width:48px; height:48px; border:4px solid rgba(56,189,248,0.2); border-top:4px solid #38bdf8; border-right:4px solid #e11d48; border-radius:50%; margin-bottom:12px; animation: lottieSpin 1s linear infinite;"></div>
        <button id="toggle-lottie-btn" style="background:#7c3aed; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer;">${btnText}</button>
      </div>

      <style>
        @keyframes lottieSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>

      <div class="trigger-group">
        <span class="trigger-text">LottieFiles, Text-to-Lottie</span>
        <button class="copy-btn" onclick="copyText('Text-to-Lottie', 'Trigger', this)">${currentLang === 'en' ? 'Copy Trigger' : '複製觸發詞'}</button>
      </div>
    `;

    setTimeout(() => {
      const btn = card.querySelector('#toggle-lottie-btn');
      const spinner = card.querySelector('#lottie-spinner');
      let isPlaying = true;
      if (btn && spinner) {
        btn.addEventListener('click', () => {
          isPlaying = !isPlaying;
          spinner.style.animationPlayState = isPlaying ? 'running' : 'paused';
          showToast(isPlaying ? 'Lottie Animation: Playing' : 'Lottie Animation: Paused');
        });
      }
    }, 100);

    return card;
  }

  function createReactBitsDemoCard() {
    const card = document.createElement('div');
    card.className = 'card';
    const titleStr = currentLang === 'en' ? '🧩 React Bits (shadcn CLI Primitive Component Suite)' : '🧩 React Bits (shadcn CLI 官方元件庫規範)';
    const descStr = currentLang === 'en' ? 'Official shadcn download mode including SplitText, BlurText, MagnetLines, and SoftAurora primitives.' : '包含 SplitText、BlurText 模糊文字動態、MagnetLines 磁吸滑鼠跟隨與 SoftAurora 質感光暈實體組件。';
    const hoverText = currentLang === 'en' ? 'Hover or Click to Reveal BlurText' : '將滑鼠移至上方或點擊以觸發 BlurText 動效';

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">${titleStr}</h3>
        <span style="font-size:10px; background:#e0f2fe; color:#0284c7; padding:2px 6px; border-radius:4px; font-weight:600;">shadcn CLI</span>
      </div>
      <p class="card-desc">${descStr}</p>
      
      <div id="reactbits-box" style="background:linear-gradient(135deg, #1e1b4b, #0f172a); border-radius:12px; padding:18px; margin-bottom:14px; text-align:center; cursor:pointer;" onclick="showToast('React Bits: BlurText Triggered')">
        <div id="blur-text-element" style="font-size:18px; font-weight:800; color:#38bdf8; filter:blur(6px); transition:filter 0.5s ease, transform 0.4s ease; margin-bottom:6px;">
          React Bits :: BlurText Animation
        </div>
        <div style="font-size:11px; color:#94a3b8;">${hoverText}</div>
      </div>

      <div class="trigger-group">
        <span class="trigger-text">React Bits, shadcn CLI</span>
        <button class="copy-btn" onclick="copyText('React Bits', 'Trigger', this)">${currentLang === 'en' ? 'Copy Trigger' : '複製觸發詞'}</button>
      </div>
    `;

    setTimeout(() => {
      const box = card.querySelector('#reactbits-box');
      const textEl = card.querySelector('#blur-text-element');
      if (box && textEl) {
        box.addEventListener('mouseenter', () => {
          textEl.style.filter = 'blur(0px)';
          textEl.style.transform = 'scale(1.05)';
        });
        box.addEventListener('mouseleave', () => {
          textEl.style.filter = 'blur(6px)';
          textEl.style.transform = 'scale(1)';
        });
      }
    }, 100);

    return card;
  }

  function createPresentation16x9SlideCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    const rawTrig = (currentLang === 'en' ? item.triggers_en : item.triggers_zh) || item.triggers || '';
    const trigStr = currentLang === 'en' ? cleanEnglishText(rawTrig) : rawTrig;
    const mainTrig = trigStr.split(',')[0].trim();
    const rawName = currentLang === 'en' ? (item.name_en || item.name_zh) : (item.name_zh || item.name);
    const rawDesc = currentLang === 'en' ? (item.desc_en || item.desc_zh) : (item.desc_zh || item.desc);
    
    const nameStr = currentLang === 'en' ? cleanEnglishText(rawName) : rawName;
    const descStr = currentLang === 'en' ? cleanEnglishText(rawDesc) : rawDesc;

    const cssStyle = item.css || 'background:#0f172a; color:#38bdf8; border:1px solid #1e293b;';
    const slideTitle = item.slide_title || nameStr;
    const slideSub = item.slide_sub || descStr;
    const slideBadge = item.slide_badge || 'SPEC SLIDE';
    const bgAccent = item.bg_accent || '#0284c7';
    const ratioStr = currentLang === 'en' ? (item.ratio_en || cleanEnglishText(item.ratio)) : item.ratio;
    const ratioLabel = currentLang === 'en' ? 'Ratio / Spec:' : '比例/特徵:';
    const copyBtnText = currentLang === 'en' ? 'Copy Trigger' : '複製觸發詞';

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">📊 ${nameStr}</h3>
        <span style="font-size:10px; background:#f3e8ff; color:#7c3aed; padding:2px 6px; border-radius:4px; font-weight:600;">10 Specs</span>
      </div>
      <p class="card-desc">${descStr}</p>
      
      <div style="${cssStyle} width:100%; aspect-ratio: 16/9; border-radius: 12px; padding: 18px; margin-bottom: 14px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" onclick="copyText('${mainTrig}', '${copyBtnText}', this)" title="16:9 Live Slide Deck Spec">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
          <span style="background:${bgAccent}; color:#fff; font-size:9.5px; font-weight:900; padding:2px 8px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">
            ${slideBadge}
          </span>
          <span style="font-size:10px; font-family:monospace; opacity:0.8;">#01 / 10 SLIDES</span>
        </div>

        <div style="margin: auto 0;">
          <div style="font-size:17px; font-weight:900; line-height:1.2; letter-spacing:-0.4px; margin-bottom:4px; text-transform:uppercase;">
            ${slideTitle}
          </div>
          <div style="font-size:11px; opacity:0.85; line-height:1.35;">
            ${slideSub}
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px; font-size:9.5px; opacity:0.9;">
          <div style="background:rgba(255,255,255,0.08); padding:4px; border-radius:4px;">✦ Section A</div>
          <div style="background:rgba(255,255,255,0.08); padding:4px; border-radius:4px;">✦ 10:1 Ratio</div>
          <div style="background:rgba(255,255,255,0.08); padding:4px; border-radius:4px;">✦ Slidev Ready</div>
        </div>
      </div>

      <div style="font-size:11.5px; color:#64748b; margin-bottom:8px;">${ratioLabel} <code style="font-family:monospace; background:#f1f5f9; padding:2px 6px; border-radius:4px;">${ratioStr}</code></div>
      <div class="trigger-group">
        <span class="trigger-text">${trigStr}</span>
        <button class="copy-btn" onclick="copyText('${mainTrig}', '${copyBtnText}', this)">${copyBtnText}</button>
      </div>
    `;
    return card;
  }
});


const masterScenariosMap = {
    standard: `我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料，採取並嚴格遵守("(......簡報風格)")的規則和風格，製作 16:9 /(或)A4 Slidev， HTML /(或)可編輯的 ppt 簡報。`,
    same_style_new_content: `我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料，依照我們標準的 0-Token 簡報流水線 Phase 1，幫我產出 deck_content.json。請繼續使用「(現有風格，如 Kinfolk)」風格，並幫我安排好 Hero、Split、Quote Card、Timeline、Bento 這 5 種 Layout 屬性。產出後請直接執行 build_deck.py 生成簡報！`,
    diff_style_new_content: `我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料製作成 16:9 HTML 簡報。這次視覺風格請採用「(新風格，如 Typographic Deck)」規範！請先產出 deck_content.json 與對應的 deck_theme.css，然後跑 Phase 3 的 build_deck.py 自動裝配成 HTML 簡報！`
};

const masterCommonTail = `\n\n請先不要直接執行簡報的製作，而是先寫出「簡報規劃的計畫書」，計畫書中要寫出：總共會有幾頁、每一頁的「大標題」內容、「小標題」內容、大致的內文要寫什麼、需不需要使用 ai 圖片生成，或是可以去網路上搜尋下載圖片。\n\n【6個紅線 (嚴格遵守)】\n\n1. 簡報請完整呈現「(某某檔案)」的完整內容。撰寫內容時請不要克制，頁數不用省、內文也可以寫多一點。並且不要有曲解、誇大其辭、用詞太過激昂的情況。\n2. 圖片請不要調整原有的圖片比例，只允許對圖片進行「裁切」、「縮小」、「放大」。\n3. 無論是大標題小標題或內文、圖片，請都不要與其他文字或圖片有重疊，也不要有貼到畫面過於邊緣的地方(但若圖片是打算沒有空白縫隙的貼緊邊緣，則沒有此限制)。\n4. 保證網路搜尋或自行生成的圖片絕對都要與當前簡報頁面的內容直接高度相關，嚴禁使用抽象隱喻、幾何符號或高深意象圖，必須選用一眼就能直觀看懂、與簡報內文精準對應的具體實物或情境圖片。\n5. 保證網路搜尋或生成的圖片絕對都要符合當前選擇的整體簡報風格，嚴禁出現與整體簡報風格相比顯得突兀或視覺風格斷層的圖片。\n6. 簡報的每一頁都必須同時包含「圖片」與「文字」（圖文並茂），且每一頁的視覺佈局與結構必須變化多元，嚴禁連續多頁重複使用完全相同的範本或視覺排版結構。`;

let activeScenarioKey = 'standard';

function switchMasterPromptScenario(key) {
    activeScenarioKey = key;
    const tabs = ['standard', 'same_style_new_content', 'diff_style_new_content'];
    tabs.forEach(t => {
        const btn = document.getElementById(`m-tab-${t}`);
        if (btn) {
            if (t === key) {
                btn.className = "scenario-tab px-3.5 py-1.5 text-xs font-bold rounded-lg bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 shadow-sm transition";
            } else {
                btn.className = "scenario-tab px-3.5 py-1.5 text-xs font-bold rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition";
            }
        }
    });

    // Find pre element inside the card and update text
    const pres = document.querySelectorAll('pre');
    pres.forEach(pre => {
        if (pre.innerText.includes('簡報製作任務') || pre.innerText.includes('deck_content.json') || pre.innerText.includes('Typographic Deck')) {
            pre.innerText = masterScenariosMap[key] + masterCommonTail;
        }
    });
}


const masterScenariosMapInDesc = {
    standard: `我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料，採取並嚴格遵守("(......簡報風格)")的規則和風格，製作 16:9 /(或)A4 Slidev， HTML /(或)可編輯的 ppt 簡報。`,
    same_style_new_content: `我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料，依照我們標準的 0-Token 簡報流水線 Phase 1，幫我產出 deck_content.json。請繼續使用「(現有風格，如 Kinfolk)」風格，並幫我安排好 Hero、Split、Quote Card、Timeline、Bento 這 5 種 Layout 屬性。產出後請直接執行 build_deck.py 生成簡報！`,
    diff_style_new_content: `我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料製作成 16:9 HTML 簡報。這次視覺風格請採用「(新風格，如 Typographic Deck)」規範！請先產出 deck_content.json 與對應的 deck_theme.css，然後跑 Phase 3 的 build_deck.py 自動裝配成 HTML 簡報！`
};

const masterCommonTailInDesc = `\n\n請先不要直接執行簡報的製作，而是先寫出「簡報規劃的計畫書」，計畫書中要寫出：總共會有幾頁、每一頁的「大標題」內容、「小標題」內容、大致的內文要寫什麼、需不需要使用 ai 圖片生成，或是可以去網路上搜尋下載圖片。\n\n【6個紅線 (嚴格遵守)】\n\n1. 簡報請完整呈現「(某某檔案)」的完整內容。撰寫內容時請不要克制，頁數不用省、內文也可以寫多一點。並且不要有曲解、誇大其辭、用詞太過激昂的情況。\n2. 圖片請不要調整原有的圖片比例，只允許對圖片進行「裁切」、「縮小」、「放大」。\n3. 無論是大標題小標題或內文、圖片，請都不要與其他文字或圖片有重疊，也不要有貼到畫面過於邊緣的地方(但若圖片是打算沒有空白縫隙的貼緊邊緣，則沒有此限制)。\n4. 保證網路搜尋或自行生成的圖片絕對都要與當前簡報頁面的內容直接高度相關，嚴禁使用抽象隱喻、幾何符號或高深意象圖，必須選用一眼就能直觀看懂、與簡報內文精準對應的具體實物或情境圖片。\n5. 保證網路搜尋或生成的圖片絕對都要符合當前選擇的整體簡報風格，嚴禁出現與整體簡報風格相比顯得突兀或視覺風格斷層的圖片。\n6. 簡報的每一頁都必須同時包含「圖片」與「文字」（圖文並茂），且每一頁的視覺佈局與結構必須變化多元，嚴禁連續多頁重複使用完全相同的範本或視覺排版結構。`;

function switchPromptScenarioInDesc(key) {
    const tabs = ['standard', 'same_style_new_content', 'diff_style_new_content'];
    tabs.forEach(t => {
        const btn = document.getElementById(`desc-tab-${t}`);
        if (btn) {
            if (t === key) {
                btn.className = "scenario-tab px-3 py-1.5 text-xs font-bold rounded-lg bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 shadow-sm transition cursor-pointer";
            } else {
                btn.className = "scenario-tab px-3 py-1.5 text-xs font-bold rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition cursor-pointer";
            }
        }
    });

    const pres = document.querySelectorAll('pre, .font-mono');
    pres.forEach(pre => {
        if (pre.innerText.includes('簡報製作任務') || pre.innerText.includes('deck_content.json') || pre.innerText.includes('Typographic Deck')) {
            pre.innerText = masterScenariosMapInDesc[key] + masterCommonTailInDesc;
        }
    });
}


// Robust Global Event Delegation for Prompt Switcher and Copy Button
document.addEventListener('click', function(e) {
    // 1. Handle Tab Switcher Clicks
    const tabBtn = e.target.closest('.prompt-tab-btn');
    if (tabBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const scenario = tabBtn.getAttribute('data-scenario');
        if (!scenario || !window.promptScenarioIntros[scenario]) return;

        window.currentCardScenarioKey = scenario;

        // Update button styles
        document.querySelectorAll('.prompt-tab-btn').forEach(btn => {
            if (btn.getAttribute('data-scenario') === scenario) {
                btn.style.background = '#0f172a';
                btn.style.color = '#ffffff';
                btn.style.border = 'none';
            } else {
                btn.style.background = '#f1f5f9';
                btn.style.color = '#334155';
                btn.style.border = '1px solid #cbd5e1';
            }
        });

        // Update body text
        const bodyEl = document.getElementById('master-prompt-card-body');
        if (bodyEl) {
            let htmlContent = `<p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a; padding-right:16px;">${window.promptScenarioIntros[scenario]}</p>`;
            window.promptCommonBody.forEach(line => {
                htmlContent += `<p style="margin:0 0 12px 0; text-align:left; line-height:1.75; font-size:13.5px; color:#0f172a; padding-right:16px;">${line}</p>`;
            });
            bodyEl.innerHTML = htmlContent;
        }
        return;
    }

    // 2. Handle Copy Button Click
    const copyBtn = e.target.closest('.prompt-copy-btn-action, #master-prompt-copy-btn');
    if (copyBtn) {
        e.preventDefault();
        e.stopPropagation();

        const activeKey = window.currentCardScenarioKey || 'standard';
        const fullText = window.promptScenarioIntros[activeKey] + '\n\n' + window.promptCommonBody.join('\n\n');

        function showSuccessUI() {
            const iconEl = document.getElementById('copy-btn-icon') || copyBtn;
            iconEl.innerHTML = '✅';
            copyBtn.style.background = '#10b981';
            copyBtn.style.color = '#ffffff';
            setTimeout(() => {
                iconEl.innerHTML = '📋';
                copyBtn.style.background = '#ffffff';
                copyBtn.style.color = '#0f172a';
            }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(fullText).then(showSuccessUI).catch(err => {
                fallbackCopyText(fullText);
                showSuccessUI();
            });
        } else {
            fallbackCopyText(fullText);
            showSuccessUI();
        }
        return;
    }
}, true);

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(textArea);
}

// ============================================================
// PROMPT SCENARIO SWITCHER - GLOBAL WINDOW FUNCTIONS
// (Called via inline onclick in isMasterPromptCard HTML block)
// ============================================================

window.promptScenarioIntros = {
    standard: '我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料，採取並嚴格遵守("(......簡報風格)")的規則和風格，製作 16:9 /(或)A4 Slidev， HTML /(或)可編輯的 ppt 簡報。',
    same_style_new_content: '我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料，依照我們標準的 0-Token 簡報流水線 Phase 1，幫我產出 deck_content.json。請繼續使用「(現有風格，如 Kinfolk)」風格，並幫我安排好 Hero、Split、Quote Card、Timeline、Bento 這 5 種 Layout 屬性。產出後請直接執行 build_deck.py 生成簡報！',
    diff_style_new_content: '我要在這個對話進行「(......簡報製作任務)」。請以("(......檔案路徑)")的內容為材料製作成 16:9 HTML 簡報。這次視覺風格請採用「(新風格，如 Typographic Deck)」規範！請先產出 deck_content.json 與對應的 deck_theme.css，然後跑 Phase 3 的 build_deck.py 自動裝配成 HTML 簡報！'
};

window.promptCommonBody = [
    '請先不要直接執行簡報的製作，而是先寫出「簡報規劃的計畫書」，計畫書中要寫出：總共會有幾頁、每一頁的「大標題」內容、「小標題」內容、大致的內文要寫什麼、需不需要使用 ai 圖片生成，或是可以去網路上搜尋下載圖片。',
    '【6個紅線 (嚴格遵守)】',
    '1. 簡報請完整呈現「(某某檔案)」的完整內容。撰寫內容時請不要克制，頁數不用省、內文也可以寫多一點。並且不要有曲解、誇大其辭、用詞太過激昂的情況。',
    '2. 圖片請不要調整原有的圖片比例，只允許對圖片進行「裁切」、「縮小」、「放大」。',
    '3. 無論是大標題小標題或內文、圖片，請都不要與其他文字或圖片有重疊，也不要有貼到畫面過於邊緣的地方(但若圖片是打算沒有空白縫隙的貼緊邊緣，則沒有此限制)。',
    '4. 保證網路搜尋或自行生成的圖片絕對都要與當前簡報頁面的內容直接高度相關，嚴禁使用抽象隱喻、幾何符號或高深意象圖，必須選用一眼就能直觀看懂、與簡報內文精準對應的具體實物或情境圖片。',
    '5. 保證網路搜尋或生成的圖片絕對都要符合當前選擇的整體簡報風格，嚴禁出現與整體簡報風格相比顯得突兀或視覺風格斷層的圖片。',
    '6. 簡報的每一頁都必須同時包含「圖片」與「文字」（圖文並茂），且每一頁的視覺佈局與結構必須變化多元，嚴禁連續多頁重複使用完全相同的範本或視覺排版結構。'
];

window.activeScenarioKey = 'standard';

window.doSwitchScenario = function(key, evt) {
    if (evt) { evt.preventDefault(); evt.stopPropagation(); }
    window.activeScenarioKey = key;

    ['standard', 'same_style_new_content', 'diff_style_new_content'].forEach(function(t) {
        var btn = document.getElementById('btn-tab-' + t);
        if (btn) {
            if (t === key) {
                btn.style.background = '#0f172a';
                btn.style.color = '#ffffff';
                btn.style.border = 'none';
            } else {
                btn.style.background = '#f1f5f9';
                btn.style.color = '#334155';
                btn.style.border = '1px solid #cbd5e1';
            }
        }
    });

    var bodyEl = document.getElementById('master-prompt-card-body');
    if (bodyEl) {
        var html = '<p style="margin:0 0 12px 0;line-height:1.75;font-size:13.5px;color:#0f172a;">' + window.promptScenarioIntros[key] + '</p>';
        window.promptCommonBody.forEach(function(line) {
            html += '<p style="margin:0 0 12px 0;line-height:1.75;font-size:13.5px;color:#0f172a;">' + line + '</p>';
        });
        bodyEl.innerHTML = html;
    }
};

window.doCopyPrompt = function(evt) {
    if (evt) { evt.preventDefault(); evt.stopPropagation(); }
    var key = window.activeScenarioKey || 'standard';
    var fullText = window.promptScenarioIntros[key] + '\n\n' + window.promptCommonBody.join('\n\n');

    function flash() {
        var btn = document.getElementById('master-prompt-copy-btn-classic');
        if (btn) {
            btn.innerHTML = '✅';
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
            setTimeout(function() {
                btn.innerHTML = '📋';
                btn.style.background = '#ffffff';
                btn.style.borderColor = '#cbd5e1';
            }, 2000);
        }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullText).then(flash).catch(function() {
            fallbackCopyText(fullText); flash();
        });
    } else {
        fallbackCopyText(fullText); flash();
    }
};
