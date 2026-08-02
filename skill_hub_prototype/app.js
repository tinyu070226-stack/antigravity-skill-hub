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
  let currentLang = 'zh';

  try {
    const res = await fetch('skills_data.json');
    skillsData = await res.json();
    handleRoute();
  } catch (err) {
    console.error('Failed to load skills_data.json', err);
  }

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    langBtn.innerHTML = currentLang === 'zh' ? '🌐 繁體中文' : '🌐 English';
    handleRoute();
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  window.copyText = (text, type = '觸發詞') => {
    navigator.clipboard.writeText(text);
    showToast(`已複製${type}: ${text}`);
  };

  window.openDetail = (masterId, pushHistory = true) => {
    if (pushHistory) {
      window.location.hash = masterId;
    }
    renderRoute(masterId);
  };

  function goHome(pushHistory = true) {
    if (pushHistory) {
      window.location.hash = '';
    }
    renderHome();
  }

  function handleRoute() {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['core-synergy-skill', 'design-system-skill', 'ui-motion-skill', 'presentation-skill'].includes(hash)) {
      renderRoute(hash);
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', handleRoute);

  backBtn.addEventListener('click', () => goHome(true));
  logoHome.addEventListener('click', () => goHome(true));

  detailSearch.addEventListener('input', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) renderRoute(hash);
  });

  function renderHome() {
    homeView.style.display = 'block';
    detailView.style.display = 'none';
    backBtn.style.display = 'none';
    detailSearch.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderRoute(masterId) {
    homeView.style.display = 'none';
    detailView.style.display = 'block';
    backBtn.style.display = 'flex';
    detailGrid.innerHTML = '';
    if (detailPrinciples) detailPrinciples.innerHTML = '';
    const query = detailSearch.value.toLowerCase().trim();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const masterInfo = skillsData.master_skills.find(m => m.id === masterId);
    if (!masterInfo) return;

    detailTitle.textContent = currentLang === 'zh' ? (masterInfo.title_zh || masterInfo.title) : (masterInfo.title_en || masterInfo.title);
    detailDesc.textContent = currentLang === 'zh' ? (masterInfo.description_zh || masterInfo.description) : (masterInfo.description_en || masterInfo.description);

    if (masterInfo.principles && masterInfo.principles.length > 0 && detailPrinciples) {
      masterInfo.principles.forEach(p => {
        const pBox = document.createElement('div');
        pBox.style.cssText = 'background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:28px; margin-bottom:28px; box-shadow:0 1px 3px rgba(15,23,42,0.04);';
        
        const pTitle = currentLang === 'zh' ? (p.title_zh || p.title) : (p.title_en || p.title);
        const pDesc = currentLang === 'zh' ? (p.desc_zh || p.desc) : (p.desc_en || p.desc);
        const pImg = currentLang === 'zh' ? (p.img_url_zh || p.img_url) : (p.img_url_en || p.img_url);

        let mediaHtml = '';
        if (pImg) {
          mediaHtml = `<div style="margin-top:16px; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;"><img src="${pImg}" alt="${pTitle}" style="width:100%; height:auto; display:block;" /></div>`;
        }

        pBox.innerHTML = `
          <h3 style="font-size:18px; font-weight:700; color:#0f172a; margin-bottom:10px; letter-spacing:-0.3px;">${pTitle}</h3>
          <p style="font-size:14.5px; color:#475569; line-height:1.65;">${pDesc}</p>
          ${mediaHtml}
        `;
        detailPrinciples.appendChild(pBox);
      });
    }

    if (masterId === 'core-synergy-skill') {
      masterInfo.sub_modules.forEach((sm, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        const icons = ['⚙️', '🍖', '🔄', '🤖'];
        card.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <span style="font-size:22px;">${icons[idx % icons.length]}</span>
            <h3 class="card-title" style="margin:0;">${sm.split(':')[0]}</h3>
          </div>
          <p class="card-desc">${sm.split(':')[1] || ''}</p>
          <div class="trigger-group">
            <span class="trigger-text">@core-synergy-skill</span>
            <button class="copy-btn" onclick="copyText('@core-synergy-skill', '觸發詞')">複製觸發詞</button>
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
      masterInfo.sub_modules.forEach((sm, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        const motionIcons = ['⚡', '🎬', '🧩'];
        card.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <span style="font-size:22px;">${motionIcons[idx % motionIcons.length]}</span>
            <h3 class="card-title" style="margin:0;">${sm.split(':')[0]}</h3>
          </div>
          <p class="card-desc">${sm.split(':')[1] || ''}</p>
          <div class="trigger-group">
            <span class="trigger-text">@ui-motion-skill</span>
            <button class="copy-btn" onclick="copyText('@ui-motion-skill', '觸發詞')">複製觸發詞</button>
          </div>
        `;
        detailGrid.appendChild(card);
      });
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
    const nameStr = (item.name || item.title || '').toLowerCase();
    const trigStr = Array.isArray(item.triggers) ? item.triggers.join(' ').toLowerCase() : (item.triggers || '').toLowerCase();
    const descStr = (item.description || item.desc || '').toLowerCase();
    const hexStr = Array.isArray(item.hex) ? item.hex.join(' ').toLowerCase() : '';
    return nameStr.includes(query) || trigStr.includes(query) || descStr.includes(query) || hexStr.includes(query);
  }

  function createRichStyleMockupCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    const mainTrig = item.triggers.split(',')[0].trim();
    const [c1, c2, c3] = item.hex || ['#ffffff', '#000000', '#0284c7'];

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">🎨 ${item.name}</h3>
        <span style="font-size:10px; background:#e0f2fe; color:#0284c7; padding:2px 6px; border-radius:4px; font-weight:600;">50 Styles</span>
      </div>
      <p class="card-desc">${item.desc}</p>
      
      <div style="${item.css} padding: 18px 20px; border-radius: 12px; margin-bottom: 14px; min-height: 140px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;" onclick="copyText('${item.css}', 'CSS 代碼')" title="點擊複製 CSS 樣式">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="background: ${c3 || c2}; color: ${c1}; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
            ${item.name.split(' ')[0]} SPEC
          </span>
          <span style="width: 8px; height: 8px; border-radius: 50%; background: ${c2}; display: inline-block;"></span>
        </div>

        <div style="margin: 12px 0;">
          <div style="font-size: 16px; font-weight: 800; line-height: 1.25; margin-bottom: 4px; color: inherit;">
            ${item.name.split(' ')[0]} Master Title
          </div>
          <div style="font-size: 11.5px; opacity: 0.85; line-height: 1.4;">
            高保真美學組件範例 · 湊齊全 3 色票主副色系與對應裝飾
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; padding-top: 8px;">
          <span style="font-size: 10.5px; font-weight: 600; opacity: 0.9;">三色全齊展示:</span>
          <div style="display:flex; gap: 6px;">
            <div style="background:${c1}; width:16px; height:16px; border-radius:50%; border:1px solid rgba(0,0,0,0.2);" title="色卡 1: ${c1}"></div>
            <div style="background:${c2}; width:16px; height:16px; border-radius:50%; border:1px solid rgba(0,0,0,0.2);" title="色卡 2: ${c2}"></div>
            <div style="background:${c3 || c2}; width:16px; height:16px; border-radius:50%; border:1px solid rgba(0,0,0,0.2);" title="色卡 3: ${c3 || c2}"></div>
          </div>
        </div>
      </div>

      <div class="trigger-group">
        <span class="trigger-text">${item.triggers}</span>
        <button class="copy-btn" onclick="copyText('${mainTrig}', '觸發詞')">複製觸發詞</button>
      </div>

      <div class="swatches" style="margin-top:10px;">
        ${item.hex.map(h => `<div class="swatch" style="background: ${h};" title="點擊複製 HEX: ${h}" onclick="copyText('${h}', 'HEX 色票')"></div>`).join('')}
      </div>
    `;
    return card;
  }

  function createHallmarkOptionCCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    const cssStyle = item.css || 'background:#f8fafc; color:#0f172a; border:1px solid #e2e8f0;';
    const fontName = item.font || 'Inter';

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">💎 ${item.name}</h3>
        <span style="font-size:10px; background:#ccfbf1; color:#0f766e; padding:2px 6px; border-radius:4px; font-weight:600;">Hallmark 20</span>
      </div>
      <p class="card-desc">${item.desc}</p>
      
      <div style="${cssStyle} padding: 16px; border-radius: 12px; margin-bottom: 14px; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size: 10px; font-weight: 700; opacity: 0.8; text-transform: uppercase;">HALLMARK THEME MOCKUP</span>
          <span style="font-size: 10px; font-family: monospace; opacity: 0.8;">${fontName.split('/')[0]}</span>
        </div>
        
        <div style="margin: 10px 0;">
          <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">
            ${item.name.split(' ')[0]} Signature
          </div>
          <div style="font-size: 11.5px; opacity: 0.85; line-height: 1.4;">
            獨特視覺氣質 UI 範例 · 字體配對 (${fontName})
          </div>
        </div>
      </div>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-bottom:14px;">
        <div style="font-size:11px; font-weight:700; color:#475569; margin-bottom:8px; display:flex; justify-content:space-between;">
          <span>⚡ Hallmark 8-State 反 Slop 互動驗證矩陣:</span>
          <span style="color:#0f766e;">(點擊測試狀態)</span>
        </div>

        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #cbd5e1; background:#ffffff; cursor:pointer;" onclick="showToast('State: Default (預設狀態)')">Default</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #0284c7; background:#e0f2fe; color:#0284c7; cursor:pointer;" onclick="showToast('State: Hover (懸停狀態)')">Hover</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #0369a1; background:#0284c7; color:#fff; cursor:pointer;" onclick="showToast('State: Active (點擊狀態)')">Active</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:2px solid #0f172a; background:#ffffff; cursor:pointer;" onclick="showToast('State: Focus (聚焦狀態)')">Focus</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #e2e8f0; background:#f1f5f9; color:#94a3b8; cursor:pointer;" onclick="showToast('State: Loading (加載中...)')">Loading...</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #059669; background:#dcfce7; color:#15803d; cursor:pointer;" onclick="showToast('State: Success (成功狀態)')">Success</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #dc2626; background:#fee2e2; color:#b91c1c; cursor:pointer;" onclick="showToast('State: Error (錯誤攔截)')">Error</button>
          <button style="padding:4px 6px; font-size:10px; border-radius:4px; border:1px solid #cbd5e1; background:#f1f5f9; color:#cbd5e1; cursor:not-allowed;" disabled>Disabled</button>
        </div>
      </div>

      <div class="trigger-group">
        <span class="trigger-text">hallmark, ${item.name.split(' ')[0]}</span>
        <button class="copy-btn" onclick="copyText('hallmark', '觸發詞')">複製觸發詞</button>
      </div>
    `;
    return card;
  }

  // Presentation Spec Card with 16:9 High-Fidelity Single Slide Deck Mockup
  function createPresentation16x9SlideCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    const mainTrig = item.triggers.split(',')[0].trim();
    const cssStyle = item.css || 'background:#0f172a; color:#38bdf8; border:1px solid #1e293b;';
    const slideTitle = item.slide_title || item.name;
    const slideSub = item.slide_sub || item.desc;
    const slideBadge = item.slide_badge || 'SPEC SLIDE';
    const bgAccent = item.bg_accent || '#0284c7';

    card.innerHTML = `
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 class="card-title" style="margin:0; font-size:15px; font-weight:700;">📊 ${item.name}</h3>
        <span style="font-size:10px; background:#f3e8ff; color:#7c3aed; padding:2px 6px; border-radius:4px; font-weight:600;">10 Specs</span>
      </div>
      <p class="card-desc">${item.desc}</p>
      
      <!-- High-Fidelity 16:9 Live Single Slide Deck Container -->
      <div style="${cssStyle} width:100%; aspect-ratio: 16/9; border-radius: 12px; padding: 18px; margin-bottom: 14px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" onclick="copyText('${mainTrig}', '觸發詞')" title="16:9 高保真簡報單頁範例 (點擊複製觸發詞)">
        <!-- Slide Top Bar: Badge & Slide Page Counter -->
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
          <span style="background:${bgAccent}; color:#fff; font-size:9.5px; font-weight:900; padding:2px 8px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">
            ${slideBadge}
          </span>
          <span style="font-size:10px; font-family:monospace; opacity:0.8;">#01 / 10 SLIDES</span>
        </div>

        <!-- Slide Middle: Large Spec Title & Subtext -->
        <div style="margin: auto 0;">
          <div style="font-size:17px; font-weight:900; line-height:1.2; letter-spacing:-0.4px; margin-bottom:4px; text-transform:uppercase;">
            ${slideTitle}
          </div>
          <div style="font-size:11px; opacity:0.85; line-height:1.35;">
            ${slideSub}
          </div>
        </div>

        <!-- Slide Bottom Row: Modular 3-Column Bullet Grid Preview -->
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px; border-top:1px stroke rgba(255,255,255,0.15); padding-top:6px; font-size:9.5px; opacity:0.9;">
          <div style="background:rgba(255,255,255,0.08); padding:4px; border-radius:4px;">✦ Section A</div>
          <div style="background:rgba(255,255,255,0.08); padding:4px; border-radius:4px;">✦ 10:1 Ratio</div>
          <div style="background:rgba(255,255,255,0.08); padding:4px; border-radius:4px;">✦ Slidev Ready</div>
        </div>
      </div>

      <div style="font-size:11.5px; color:#64748b; margin-bottom:8px;">比例/特徵: <code style="font-family:monospace; background:#f1f5f9; padding:2px 6px; border-radius:4px;">${item.ratio}</code></div>
      <div class="trigger-group">
        <span class="trigger-text">${item.triggers}</span>
        <button class="copy-btn" onclick="copyText('${mainTrig}', '觸發詞')">複製觸發詞</button>
      </div>
    `;
    return card;
  }
});
