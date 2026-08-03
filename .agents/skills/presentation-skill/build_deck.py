import json
import sys
import os

def get_visual_width(text):
    """
    CJK Character Width Calculator (0 Token)
    Weights non-ASCII (CJK Chinese/Japanese/Korean) characters as 1.8x width relative to Latin text.
    """
    if not text:
        return 0
    return sum(1.8 if ord(c) > 127 else 1.0 for c in str(text))

def generate_deck(content_json_path, theme_css_path, output_html_path):
    """
    Zero-Token Deck Assembly Engine v2.1 (with CJK Visual Width Weighting & Fallback Warning Log)
    """
    if not os.path.exists(content_json_path):
        print(f"Error: Content JSON file not found: {content_json_path}")
        return False

    warnings = []

    # Schema Validation & Robust JSON Loading
    try:
        with open(content_json_path, 'r', encoding='utf-8') as f:
            deck_data = json.load(f)
    except Exception as e:
        msg = f"Schema Error: Invalid JSON structure: {e}. Falling back to default empty deck schema."
        warnings.append(msg)
        print(f"[Warning] {msg}")
        deck_data = {"deck_title": "Recovered Deck", "slides": []}

    theme_css = ""
    if os.path.exists(theme_css_path):
        with open(theme_css_path, 'r', encoding='utf-8') as f:
            theme_css = f.read()

    slides_html = ""
    slides = deck_data.get("slides", [])

    if not isinstance(slides, list) or len(slides) == 0:
        msg = "Slides array missing or empty. Inserted fallback introduction slide."
        warnings.append(msg)
        slides = [{"title": "Presentation Overview", "body": "No content provided in slides payload."}]

    for idx, slide in enumerate(slides, 1):
        if not isinstance(slide, dict):
            slide = {"title": f"Slide {idx}", "body": str(slide)}

        raw_title = slide.get("title")
        if not raw_title:
            msg = f"Slide {idx} title missing. Applied fallback title."
            warnings.append(msg)
            title = f"Slide {idx}"
        else:
            title = str(raw_title)

        subtitle = str(slide.get("subtitle", ""))
        body = slide.get("body", "")
        image_url = str(slide.get("image_url", ""))
        image_alt = str(slide.get("image_alt", ""))
        layout_type = str(slide.get("layout", "standard"))

        # --- Dynamic CJK Auto-Fit Font Scaling (0 Token CJK Calculator) ---
        title_visual_width = get_visual_width(title)
        title_style = ""
        if title_visual_width > 40:
            title_style = 'style="font-size: 2.0rem; line-height: 1.2;"'
        elif title_visual_width > 26:
            title_style = 'style="font-size: 2.3rem;"'

        body_html = ""
        if isinstance(body, list):
            item_count = len(body)
            list_style = ""
            if item_count > 5:
                list_style = 'style="font-size: 0.95rem; line-height: 1.4;"'
            elif item_count > 3:
                list_style = 'style="font-size: 1.05rem;"'

            body_items = "".join([f'<li {list_style}>{item}</li>' for item in body])
            body_html = f'<ul class="slide-list">{body_items}</ul>'
        elif body:
            body_str = str(body)
            body_visual_width = get_visual_width(body_str)
            body_style = ""
            if body_visual_width > 220:
                body_style = 'style="font-size: 0.95rem; line-height: 1.5;"'
            body_html = f'<p class="slide-body" {body_style}>{body_str}</p>'

        image_html = ""
        if image_url:
            image_html = f'<div class="slide-image-wrapper"><img src="{image_url}" alt="{image_alt}" class="slide-img" /></div>'

        slides_html += f"""
        <section class="slide slide-layout-{layout_type}" id="slide-{idx}">
            <div class="slide-content">
                <div class="slide-header">
                    <span class="slide-num">0{idx}</span>
                    <h2 class="slide-title" {title_style}>{title}</h2>
                    {f'<h3 class="slide-subtitle">{subtitle}</h3>' if subtitle else ''}
                </div>
                <div class="slide-body-container">
                    {body_html}
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
        /* Base Print CSS Standard (16:9 Lock & Zero Margins) */
        @page {{
            size: 16in 9in;
            margin: 0;
        }}
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }}
        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            width: 100vw;
            overflow-x: hidden;
        }}
        
        /* 16:9 Presentation Slides Styling with Hard Boundary Limits */
        .slide {{
            width: 16in;
            height: 9in;
            position: relative;
            page-break-after: always;
            break-after: page;
            page-break-inside: avoid;
            overflow: hidden; /* Hard Overflow Protection */
            display: flex;
            padding: 0.8in 1.2in;
            gap: 0.8in;
            background: #0f172a;
        }}
        
        .slide-content {{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-height: 100%;
            overflow: hidden;
            z-index: 2;
        }}
        
        .slide-num {{
            font-size: 0.9rem;
            font-weight: 700;
            color: #38bdf8;
            letter-spacing: 0.1em;
            margin-bottom: 0.4rem;
            display: block;
        }}
        
        .slide-title {{
            font-size: 2.8rem;
            font-weight: 800;
            line-height: 1.15;
            color: #ffffff;
            margin-bottom: 0.6rem;
            word-wrap: break-word;
        }}
        
        .slide-subtitle {{
            font-size: 1.4rem;
            font-weight: 500;
            color: #94a3b8;
            margin-bottom: 1.2rem;
        }}
        
        .slide-body {{
            font-size: 1.1rem;
            line-height: 1.7;
            color: #cbd5e1;
        }}
        
        .slide-list {{
            list-style: none;
            padding: 0;
        }}
        .slide-list li {{
            font-size: 1.1rem;
            line-height: 1.7;
            color: #cbd5e1;
            margin-bottom: 0.6rem;
            position: relative;
            padding-left: 1.4rem;
        }}
        .slide-list li::before {{
            content: "—";
            position: absolute;
            left: 0;
            color: #38bdf8;
            font-weight: bold;
        }}
        
        .slide-image-wrapper {{
            flex: 1;
            max-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }}
        
        .slide-img {{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }}
        
        /* Custom Theme Overrides */
        {theme_css}
        
        /* Print Chrome Removal */
        @media print {{
            body {{
                background: none;
            }}
            .slide {{
                box-shadow: none !important;
            }}
        }}
    </style>
</head>
<body>
    {slides_html}
</body>
</html>
"""
    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(full_html)

    # Save Warnings Log if any schema fallbacks occurred
    if warnings:
        log_path = os.path.join(os.path.dirname(output_html_path), "deck_assembly_warnings.json")
        with open(log_path, 'w', encoding='utf-8') as f:
            json.dump({"timestamp": os.path.getmtime(output_html_path), "warnings": warnings}, f, ensure_ascii=False, indent=2)
        print(f"[Notice] {len(warnings)} assembly fallbacks logged to: {log_path}")

    print(f"Successfully generated 16:9 HTML presentation deck at: {output_html_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        generate_deck(sys.argv[1], sys.argv[2], sys.argv[3])
    else:
        print("Usage: python build_deck.py <content_json_path> <theme_css_path> <output_html_path>")
