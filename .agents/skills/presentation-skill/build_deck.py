import json
import sys
import os

def generate_deck(content_json_path, theme_css_path, output_html_path):
    """
    Zero-Token Deck Assembly Engine
    Merges content.json and theme.css into pixel-perfect 16:9 HTML slides with Print CSS standard.
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
        title = slide.get("title", f"Slide {idx}")
        subtitle = slide.get("subtitle", "")
        body = slide.get("body", "")
        image_url = slide.get("image_url", "")
        image_alt = slide.get("image_alt", "")
        layout_type = slide.get("layout", "standard") # standard, hero, split, grid

        image_html = ""
        if image_url:
            image_html = f'<div class="slide-image-wrapper"><img src="{image_url}" alt="{image_alt}" class="slide-img" /></div>'

        body_html = ""
        if isinstance(body, list):
            body_items = "".join([f'<li>{item}</li>' for item in body])
            body_html = f'<ul class="slide-list">{body_items}</ul>'
        elif body:
            body_html = f'<p class="slide-body">{body}</p>'

        slides_html += f"""
        <section class="slide slide-layout-{layout_type}" id="slide-{idx}">
            <div class="slide-content">
                <div class="slide-header">
                    <span class="slide-num">0{idx}</span>
                    <h2 class="slide-title">{title}</h2>
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
        
        /* 16:9 Presentation Slides Styling */
        .slide {{
            width: 16in;
            height: 9in;
            position: relative;
            page-break-after: always;
            break-after: page;
            page-break-inside: avoid;
            overflow: hidden;
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

    print(f"Successfully generated 16:9 HTML presentation deck at: {output_html_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        generate_deck(sys.argv[1], sys.argv[2], sys.argv[3])
    else:
        print("Usage: python build_deck.py <content_json_path> <theme_css_path> <output_html_path>")
