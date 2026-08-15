import json
import sys
import os

def get_visual_width(text):
    if not text:
        return 0
    return sum(1.8 if ord(c) > 127 else 1.0 for c in str(text))

def generate_deck(content_json_path, theme_css_path, output_html_path):
    """
    Zero-Token Deck Assembly Engine v3.0 (with 5 Distinct Layout Templates)
    Layouts: hero, split, quote_card, timeline, bento_grid
    """
    if not os.path.exists(content_json_path):
        print(f"Error: Content JSON file not found: {content_json_path}")
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
        title = str(slide.get("title", f"Slide {idx}"))
        subtitle = str(slide.get("subtitle", ""))
        body = slide.get("body", "")
        image_url = str(slide.get("image_url", ""))
        image_alt = str(slide.get("image_alt", ""))
        layout_type = str(slide.get("layout", "split"))
        quote_text = str(slide.get("quote_text", ""))

        title_visual_width = get_visual_width(title)
        title_style = ""
        if title_visual_width > 38:
            title_style = 'style="font-size: 2.0rem; line-height: 1.2;"'

        image_html = f'<div class="slide-image-wrapper"><img src="{image_url}" alt="{image_alt}" class="slide-img" /></div>' if image_url else ""

        # --- LAYOUT VARIATION RENDERING ENGINE ---
        if layout_type == "hero":
            slides_html += f"""
            <section class="slide slide-layout-hero" id="slide-{idx}">
                <div class="hero-bg-overlay" style="background-image: url('{image_url}');"></div>
                <div class="hero-content">
                    <span class="slide-num">0{idx} // KINFOLK ESSAY</span>
                    <h1 class="hero-title">{title}</h1>
                    <h3 class="hero-subtitle">{subtitle}</h3>
                    <p class="hero-body">{body if isinstance(body, str) else ' '.join(body)}</p>
                </div>
            </section>
            """
        elif layout_type == "quote_card":
            slides_html += f"""
            <section class="slide slide-layout-quote_card" id="slide-{idx}">
                {image_html}
                <div class="slide-content quote-card-content">
                    <span class="slide-num">0{idx} // THINKER PORTRAIT</span>
                    <h2 class="slide-title" {title_style}>{title}</h2>
                    <h3 class="slide-subtitle">{subtitle}</h3>
                    <div class="editorial-quote-box">
                        <span class="quote-mark">“</span>
                        <p class="quote-text">{quote_text if quote_text else title}</p>
                    </div>
                    <div class="slide-body-container" style="margin-top: 1rem;">
                        {''.join([f'<li>{item}</li>' for item in body]) if isinstance(body, list) else f'<p>{body}</p>'}
                    </div>
                </div>
            </section>
            """
        elif layout_type == "timeline":
            items_html = ""
            if isinstance(body, list):
                for step_i, item in enumerate(body, 1):
                    items_html += f"""
                    <div class="timeline-step">
                        <div class="step-num">STEP 0{step_i}</div>
                        <div class="step-text">{item}</div>
                    </div>
                    """
            else:
                items_html = f'<div class="timeline-step"><div class="step-text">{body}</div></div>'

            slides_html += f"""
            <section class="slide slide-layout-timeline" id="slide-{idx}">
                <div class="slide-content timeline-full-content">
                    <span class="slide-num">0{idx} // CHRONOLOGY & EVOLUTION</span>
                    <h2 class="slide-title" {title_style}>{title}</h2>
                    <h3 class="slide-subtitle">{subtitle}</h3>
                    <div class="timeline-container">
                        {items_html}
                    </div>
                </div>
            </section>
            """
        elif layout_type == "bento_grid":
            cards_html = ""
            if isinstance(body, list):
                for card_i, item in enumerate(body, 1):
                    cards_html += f"""
                    <div class="bento-card">
                        <div class="bento-card-header">0{card_i}</div>
                        <div class="bento-card-body">{item}</div>
                    </div>
                    """
            else:
                cards_html = f'<div class="bento-card">{body}</div>'

            slides_html += f"""
            <section class="slide slide-layout-bento_grid" id="slide-{idx}">
                <div class="slide-content">
                    <span class="slide-num">0{idx} // MULTI-FACTOR MATRIX</span>
                    <h2 class="slide-title" {title_style}>{title}</h2>
                    <h3 class="slide-subtitle">{subtitle}</h3>
                    <div class="bento-grid-container">
                        {cards_html}
                    </div>
                </div>
                {image_html}
            </section>
            """
        else: # Standard Split Layout
            body_items = "".join([f'<li>{item}</li>' for item in body]) if isinstance(body, list) else f'<p>{body}</p>'
            slides_html += f"""
            <section class="slide slide-layout-split" id="slide-{idx}">
                <div class="slide-content">
                    <div class="slide-header">
                        <span class="slide-num">0{idx}</span>
                        <h2 class="slide-title" {title_style}>{title}</h2>
                        {f'<h3 class="slide-subtitle">{subtitle}</h3>' if subtitle else ''}
                    </div>
                    <div class="slide-body-container">
                        <ul class="slide-list">{body_items}</ul>
                    </div>
                </div>
                {image_html}
            </section>
            """

    full_html = f"""<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{deck_data.get("deck_title", "Antigravity Presentation")}</title>
    <style>
        @page {{ size: 16in 9in; margin: 0; }}
        * {{ box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }}
        body {{ font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #0f172a; color: #f8fafc; width: 100vw; overflow-x: hidden; }}
        .slide {{ width: 16in; height: 9in; position: relative; page-break-after: always; break-after: page; page-break-inside: avoid; overflow: hidden; display: flex; padding: 0.9in 1.2in; gap: 0.8in; background: #0f172a; }}
        .slide-content {{ flex: 1; display: flex; flex-direction: column; justify-content: center; max-height: 100%; overflow: hidden; z-index: 2; }}
        .slide-image-wrapper {{ flex: 1; max-height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); }}
        .slide-img {{ width: 100%; height: 100%; object-fit: cover; }}
        
        {theme_css}
        
        @media print {{ body {{ background: none; }} .slide {{ box-shadow: none !important; }} }}
    </style>
</head>
<body>
    {slides_html}
</body>
</html>
"""
    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(full_html)

    print(f"Successfully generated 16:9 HTML presentation deck with 5 Layout Variants at: {output_html_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        generate_deck(sys.argv[1], sys.argv[2], sys.argv[3])
