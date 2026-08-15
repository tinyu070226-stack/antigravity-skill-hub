import json, sys, os

def get_visual_width(text):
    if not text: return 0
    return sum(1.8 if ord(c) > 127 else 1.0 for c in str(text))

LAYOUT_LABELS = {
    "hero":       "VISUAL KEYNOTE",
    "split":      "ANALYSIS & INSIGHT",
    "quote_card": "DESIGN RESEARCH",
    "timeline":   "CHRONOLOGY",
    "bento_grid": "DATA MATRIX",
}

def generate_deck(content_json_path, theme_css_path, output_html_path):
    if not os.path.exists(content_json_path):
        print(f"Error: Content JSON not found: {content_json_path}")
        return False

    with open(content_json_path, 'r', encoding='utf-8') as f:
        deck_data = json.load(f)

    theme_css = ""
    if os.path.exists(theme_css_path):
        with open(theme_css_path, 'r', encoding='utf-8') as f:
            theme_css = f.read()

    slides_html = ""
    slides = deck_data.get("slides", [])

    for idx, slide in enumerate(slides, 1):
        title       = str(slide.get("title", f"Slide {idx}"))
        subtitle    = str(slide.get("subtitle", ""))
        body        = slide.get("body", "")
        image_url   = str(slide.get("image_url", ""))
        image_alt   = str(slide.get("image_alt", ""))
        layout_type = str(slide.get("layout", "split"))
        quote_text  = str(slide.get("quote_text", ""))

        tw = get_visual_width(title)
        title_style = 'style="font-size:2.0rem;line-height:1.2;"' if tw > 38 else ''

        img_html = (f'<div class="slide-image-wrapper"><img src="{image_url}" alt="{image_alt}" class="slide-img"/></div>'
                    if image_url else '')

        # Decorative elements
        num_str  = f"{idx:02d}"
        deco_label = LAYOUT_LABELS.get(layout_type, "PRESENTATION")
        deco = f"""
        <div class="deco-bg-number">{num_str}</div>
        <div class="deco-corner-tl"></div>
        <div class="deco-corner-br"></div>
        <div class="deco-label-top">{deco_label}</div>
        <div class="deco-label-bottom">2050 PRODUCT CONTEXT DESIGN &nbsp;·&nbsp; {idx:02d} / {len(slides):02d}</div>
        """

        def render_body(b):
            if isinstance(b, list):
                items = "".join(f"<li>{item}</li>" for item in b)
                return f'<ul class="slide-list">{items}</ul>'
            return f'<p class="slide-para">{b}</p>'

        # ── HERO ──────────────────────────────────────────────────
        if layout_type == "hero":
            slides_html += f"""
            <section class="slide slide-layout-hero" id="slide-{idx}">
                {deco}
                <div class="hero-bg-overlay" style="background-image:url('{image_url}');"></div>
                <div class="hero-content">
                    <span class="slide-num">{num_str} // KEYNOTE</span>
                    <h1 class="hero-title">{title}</h1>
                    <h3 class="hero-subtitle">{subtitle}</h3>
                    <p class="hero-body">{body if isinstance(body,str) else ' '.join(body)}</p>
                </div>
            </section>"""

        # ── QUOTE CARD ────────────────────────────────────────────
        elif layout_type == "quote_card":
            slides_html += f"""
            <section class="slide slide-layout-quote_card" id="slide-{idx}">
                {deco}
                {img_html}
                <div class="slide-content quote-card-content">
                    <span class="slide-num">{num_str} // RESEARCH</span>
                    <h2 class="slide-title" {title_style}>{title}</h2>
                    <h3 class="slide-subtitle">{subtitle}</h3>
                    <div class="editorial-quote-box">
                        <span class="quote-mark">"</span>
                        <p class="quote-text">{quote_text if quote_text else title}</p>
                    </div>
                    <div class="slide-body-container" style="margin-top:0.7rem;">
                        {render_body(body)}
                    </div>
                </div>
            </section>"""

        # ── TIMELINE ──────────────────────────────────────────────
        elif layout_type == "timeline":
            if isinstance(body, list):
                items_html = "".join(f"""
                    <div class="timeline-step">
                        <div class="step-num">STEP {si:02d}</div>
                        <div class="step-text">{item}</div>
                    </div>""" for si, item in enumerate(body, 1))
            else:
                items_html = f'<div class="timeline-step"><div class="step-text">{body}</div></div>'

            slides_html += f"""
            <section class="slide slide-layout-timeline" id="slide-{idx}">
                {deco}
                <div class="slide-content timeline-full-content">
                    <span class="slide-num">{num_str} // CHRONOLOGY</span>
                    <h2 class="slide-title" {title_style}>{title}</h2>
                    <h3 class="slide-subtitle">{subtitle}</h3>
                    <div class="timeline-container">{items_html}</div>
                </div>
            </section>"""

        # ── BENTO GRID ────────────────────────────────────────────
        elif layout_type == "bento_grid":
            if isinstance(body, list):
                cards_html = "".join(f"""
                    <div class="bento-card">
                        <div class="bento-card-header">{ci:02d}</div>
                        <div class="bento-card-body">{item}</div>
                    </div>""" for ci, item in enumerate(body, 1))
            else:
                cards_html = f'<div class="bento-card">{body}</div>'

            slides_html += f"""
            <section class="slide slide-layout-bento_grid" id="slide-{idx}">
                {deco}
                <div class="slide-content">
                    <span class="slide-num">{num_str} // DATA MATRIX</span>
                    <h2 class="slide-title" {title_style}>{title}</h2>
                    <h3 class="slide-subtitle">{subtitle}</h3>
                    <div class="bento-grid-container">{cards_html}</div>
                </div>
                {img_html}
            </section>"""

        # ── SPLIT (default) ───────────────────────────────────────
        else:
            slides_html += f"""
            <section class="slide slide-layout-split" id="slide-{idx}">
                {deco}
                <div class="slide-content">
                    <div class="slide-header">
                        <span class="slide-num">{num_str} // INSIGHT</span>
                        <h2 class="slide-title" {title_style}>{title}</h2>
                        {f'<h3 class="slide-subtitle">{subtitle}</h3>' if subtitle else ''}
                    </div>
                    <div class="slide-body-container">
                        {render_body(body)}
                    </div>
                </div>
                {img_html}
            </section>"""

    # ── FULL HTML ──────────────────────────────────────────────────
    full_html = f"""<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{deck_data.get("deck_title","Presentation")}</title>
<style>
@page {{ size: 16in 9in; margin:0; }}
* {{ box-sizing:border-box; margin:0; padding:0;
     -webkit-print-color-adjust:exact !important;
     print-color-adjust:exact !important; }}
body {{
  font-family:-apple-system,'SF Pro Display','Inter',BlinkMacSystemFont,'Segoe UI',sans-serif;
  background:#000; color:#F5F5F7;
  -webkit-font-smoothing:antialiased;
  width:100vw; overflow-x:hidden;
}}
.slide {{
  width:16in; height:9in;
  position:relative;
  page-break-after:always; break-after:page;
  page-break-inside:avoid;
  overflow:hidden;
  display:flex;
  padding:0.65in 0.95in;
  gap:0.65in;
  background:#000;
  border-bottom:1px solid #1d1d1f;
}}
.slide-content {{
  flex:1; display:flex; flex-direction:column;
  justify-content:flex-start;
  max-height:100%; overflow:hidden; z-index:2;
}}
.slide-image-wrapper {{
  flex:1; max-height:100%;
  display:flex; align-items:center; justify-content:center;
  border-radius:18px; overflow:hidden;
  border:1px solid #2d2d2f;
  box-shadow:0 30px 60px -10px rgba(0,0,0,.7),0 10px 20px -5px rgba(0,0,0,.5);
  z-index:2;
}}
.slide-img {{ width:100%; height:100%; object-fit:cover; filter:brightness(.9) saturate(1.1); }}

/* ═══ DECORATIVE LAYER ═══ */
.deco-bg-number {{
  position:absolute;
  right:-0.5in;
  bottom:-0.7in;
  font-size:13rem;
  font-weight:900;
  letter-spacing:-0.05em;
  color:rgba(255,255,255,0.028);
  z-index:1;
  pointer-events:none;
  line-height:1;
  user-select:none;
}}
.deco-corner-tl {{
  position:absolute;
  top:0.28in;
  left:0.28in;
  width:22px; height:22px;
  border-top:1.5px solid rgba(41,151,255,0.35);
  border-left:1.5px solid rgba(41,151,255,0.35);
  z-index:3;
  pointer-events:none;
}}
.deco-corner-br {{
  position:absolute;
  bottom:0.28in;
  right:0.28in;
  width:22px; height:22px;
  border-bottom:1.5px solid rgba(41,151,255,0.35);
  border-right:1.5px solid rgba(41,151,255,0.35);
  z-index:3;
  pointer-events:none;
}}
.deco-label-top {{
  position:absolute;
  top:0.22in;
  left:50%;
  transform:translateX(-50%);
  font-size:0.38rem;
  font-weight:700;
  letter-spacing:0.22em;
  color:rgba(255,255,255,0.12);
  text-transform:uppercase;
  z-index:3;
  pointer-events:none;
  white-space:nowrap;
}}
.deco-label-bottom {{
  position:absolute;
  bottom:0.22in;
  left:50%;
  transform:translateX(-50%);
  font-size:0.38rem;
  font-weight:500;
  letter-spacing:0.18em;
  color:rgba(255,255,255,0.1);
  text-transform:uppercase;
  z-index:3;
  pointer-events:none;
  white-space:nowrap;
}}

/* ═══ TYPOGRAPHY ═══ */
.slide-num {{
  font-size:0.48rem;
  font-weight:700;
  letter-spacing:0.2em;
  color:#6e6e73;
  text-transform:uppercase;
  margin-bottom:0.6rem;
  display:block;
}}
.slide-title {{
  font-size:2.4rem;
  font-weight:700;
  line-height:1.08;
  letter-spacing:-0.03em;
  color:#F5F5F7;
  margin-bottom:0.4rem;
  max-height:3.2rem;
  overflow:hidden;
}}
.slide-subtitle {{
  font-size:0.78rem;
  font-weight:400;
  color:#2997FF;
  letter-spacing:-0.01em;
  margin-bottom:0.9rem;
  line-height:1.4;
}}
.slide-header {{ margin-bottom:0.6rem; }}
.slide-body-container {{ flex:1; overflow:hidden; }}

/* ═══ BODY LIST ═══ */
.slide-list {{
  list-style:none; padding:0; margin:0;
  display:flex; flex-direction:column; gap:0.42rem;
}}
.slide-list li {{
  font-size:0.92rem;
  font-weight:400;
  line-height:1.62;
  color:#c7c7cc;
  padding-left:1.2em;
  position:relative;
}}
.slide-list li::before {{
  content:'';
  position:absolute; left:0; top:0.6em;
  width:4px; height:4px;
  border-radius:50%;
  background:#2997FF;
}}
.slide-para {{
  font-size:0.94rem; color:#c7c7cc; line-height:1.62;
}}

/* ═══ HERO ═══ */
.slide-layout-hero {{
  flex-direction:column !important;
  align-items:flex-start !important;
  justify-content:flex-end !important;
  padding:0.55in 0.95in 0.75in !important;
}}
.hero-bg-overlay {{
  position:absolute; inset:0;
  background-size:cover; background-position:center;
  z-index:0;
  filter:brightness(.32) saturate(1.15);
}}
.hero-bg-overlay::after {{
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(0,0,0,.94) 0%, rgba(0,0,0,.3) 55%, rgba(0,0,0,.08) 100%);
}}
.hero-content {{ position:relative; z-index:2; max-width:72%; }}
.hero-title {{
  font-size:3.5rem !important; font-weight:800 !important;
  letter-spacing:-0.04em !important; line-height:1.05 !important;
  color:#fff !important; text-shadow:0 2px 24px rgba(0,0,0,.5);
  margin-bottom:0.55rem;
}}
.hero-subtitle {{
  font-size:1.05rem !important; font-weight:400 !important;
  color:rgba(255,255,255,.72) !important; margin-bottom:0.6rem;
}}
.hero-body {{ font-size:0.72rem; color:rgba(255,255,255,.45); letter-spacing:.03em; }}

/* ═══ QUOTE CARD ═══ */
.slide-layout-quote_card {{ background:#050508 !important; }}
.quote-card-content {{ justify-content:center; }}
.editorial-quote-box {{
  background:linear-gradient(135deg,#1a1a2e 0%,#0d1117 100%);
  border:1px solid rgba(41,151,255,.3);
  border-left:3px solid #2997FF;
  border-radius:12px;
  padding:0.8rem 1.1rem;
  margin:0.5rem 0;
}}
.quote-mark {{
  font-size:2.2rem; color:#2997FF; line-height:1;
  display:block; margin-bottom:-0.4rem;
  font-family:Georgia,serif; opacity:.85;
}}
.quote-text {{
  font-size:0.9rem; font-style:italic;
  line-height:1.7; color:#c7c7cc; font-weight:400;
}}

/* ═══ TIMELINE ═══ */
.slide-layout-timeline {{ background:#040406 !important; }}
.timeline-full-content {{ justify-content:center; }}
.timeline-container {{
  display:flex; flex-direction:column; gap:0.5rem;
  margin-top:0.7rem;
  position:relative; padding-left:2.0rem;
}}
.timeline-container::before {{
  content:'';
  position:absolute; left:0.6rem; top:.4rem; bottom:.4rem;
  width:1.5px;
  background:linear-gradient(to bottom,#2997FF,rgba(41,151,255,.2));
}}
.timeline-step {{
  display:flex; flex-direction:column; gap:.1rem; position:relative;
}}
.timeline-step::before {{
  content:'';
  position:absolute; left:-1.5rem; top:.5em;
  width:8px; height:8px; border-radius:50%;
  background:#2997FF;
  box-shadow:0 0 0 3px rgba(41,151,255,.2);
}}
.step-num {{
  font-size:0.52rem; font-weight:700;
  letter-spacing:.15em; color:#2997FF; text-transform:uppercase;
}}
.step-text {{ font-size:0.88rem; color:#c7c7cc; line-height:1.58; }}

/* ═══ BENTO GRID ═══ */
.slide-layout-bento_grid {{ background:#040406 !important; }}
.bento-grid-container {{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-template-rows:repeat(2,1fr);
  gap:0.42rem;
  margin-top:0.6rem;
  flex:1;
}}
.bento-card {{
  background:#0f1014;
  border:1px solid #2d2d2f;
  border-radius:14px;
  padding:0.65rem 0.75rem;
  display:flex; flex-direction:column; gap:.3rem;
  position:relative; overflow:hidden;
}}
.bento-card::before {{
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,rgba(41,151,255,.35),transparent);
}}
.bento-card-header {{
  font-size:0.52rem; font-weight:700;
  letter-spacing:.15em; color:#2997FF; text-transform:uppercase;
}}
.bento-card-body {{
  font-size:0.76rem; color:#a1a1a6; line-height:1.58; font-weight:400;
}}

@media print {{
  body {{ background:#000 !important; }}
  .slide {{ background:#000 !important; }}
}}
{theme_css}
</style>
</head>
<body>
{slides_html}
</body>
</html>"""

    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print(f"SUCCESS: {len(slides)} slides generated → {output_html_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        generate_deck(sys.argv[1], sys.argv[2], sys.argv[3])
